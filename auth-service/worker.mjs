const NEW_ITERATIONS = 600000;
const encoder = new TextEncoder();
const usernamePattern = /^[a-z0-9._-]{3,30}$/;
const hex = (value) => Array.from(new Uint8Array(value), (byte) => byte.toString(16).padStart(2, "0")).join("");
const randomHex = (length) => hex(crypto.getRandomValues(new Uint8Array(length)));
const normalizeUsername = (value) => typeof value === "string" ? value.trim().toLowerCase() : "";

class HttpError extends Error {
  constructor(status, message, code = "REQUEST_FAILED") {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function digest(value) {
  return hex(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

async function pepperKey(secret) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

function proofPayload(username, credentials) {
  return encoder.encode(["orbit-password-v1", username, credentials.salt, credentials.iterations, credentials.proof].join("\0"));
}

async function sealProof(key, username, credentials) {
  return hex(await crypto.subtle.sign("HMAC", key, proofPayload(username, credentials)));
}

async function verifyProof(key, user, proof) {
  const signature = Uint8Array.from(user.password_verifier.match(/../g), (byte) => parseInt(byte, 16));
  return crypto.subtle.verify("HMAC", key, signature, proofPayload(user.username, {
    salt: user.password_salt, iterations: user.password_iterations, proof,
  }));
}

function validateCredentials(body, legacy = false) {
  if (!/^[a-f0-9]{32}$/.test(body.salt || "") || !/^[a-f0-9]{64}$/.test(body.proof || "") ||
      !(legacy ? [120000, NEW_ITERATIONS] : [NEW_ITERATIONS]).includes(body.iterations)) {
    throw new HttpError(400, "密码验证数据无效，请重新输入。", "INVALID_CREDENTIALS");
  }
  return { salt: body.salt, proof: body.proof, iterations: body.iterations };
}

async function readJSON(request) {
  if (!request.headers.get("Content-Type")?.startsWith("application/json")) throw new HttpError(415, "请使用 JSON 请求。");
  if (Number(request.headers.get("Content-Length") || 0) > 128 * 1024) throw new HttpError(413, "请求内容过大。");
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "请求内容为空。");
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 128 * 1024) {
      await reader.cancel();
      throw new HttpError(413, "请求内容过大。");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try {
    const data = JSON.parse(new TextDecoder().decode(bytes));
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error();
    return data;
  } catch { throw new HttpError(400, "请求内容格式不正确。"); }
}

function publicUser(user) {
  return { id: user.id, username: user.username, role: user.role, enabled: Boolean(user.enabled), createdAt: user.created_at, lastLogin: user.last_login };
}

async function rateLimit(db, key, max, seconds) {
  const now = Math.floor(Date.now() / 1000);
  const record = await db.prepare(`INSERT INTO auth_limits (key, attempts, expires_at) VALUES (?, 1, ?)
    ON CONFLICT(key) DO UPDATE SET attempts = CASE WHEN expires_at <= ? THEN 1 ELSE attempts + 1 END,
    expires_at = CASE WHEN expires_at <= ? THEN excluded.expires_at ELSE expires_at END RETURNING attempts`)
    .bind(key, now + seconds, now, now).first();
  if (record.attempts > max) throw new HttpError(429, "尝试过于频繁，请稍后再试。", "RATE_LIMITED");
}

async function sessionUser(request, db, admin = false) {
  const token = request.headers.get("Authorization")?.match(/^Bearer ([a-f0-9]{64})$/)?.[1];
  if (!token) throw new HttpError(401, "登录已过期，请重新登录。", "UNAUTHENTICATED");
  const user = await db.prepare(`SELECT users.* FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE token_hash = ? AND expires_at > ? AND enabled = 1 AND deleted_at IS NULL`)
    .bind(await digest(token), Math.floor(Date.now() / 1000)).first();
  if (!user) throw new HttpError(401, "登录已过期或账号已停用，请重新登录。", "UNAUTHENTICATED");
  if (admin && user.role !== "admin") throw new HttpError(403, "仅管理员可以执行此操作。", "FORBIDDEN");
  return user;
}

async function createSession(db, user, remember) {
  const token = randomHex(32);
  const expiresAt = Math.floor(Date.now() / 1000) + (remember ? 7 * 86400 : 8 * 3600);
  const lastLogin = new Date().toISOString();
  const results = await db.batch([
    db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) SELECT ?, id, ? FROM users WHERE id = ? AND enabled = 1 AND deleted_at IS NULL").bind(await digest(token), expiresAt, user.id),
    db.prepare("UPDATE users SET last_login = ? WHERE id = ?").bind(lastLogin, user.id),
    db.prepare("DELETE FROM sessions WHERE expires_at <= ?").bind(Math.floor(Date.now() / 1000)),
    db.prepare("DELETE FROM auth_limits WHERE expires_at <= ?").bind(Math.floor(Date.now() / 1000)),
  ]);
  if (!results[0].meta.changes) throw new HttpError(401, "账号已停用，请重新登录。", "UNAUTHENTICATED");
  return { token, expiresAt, user: publicUser({ ...user, last_login: lastLogin }) };
}

async function insertUser(db, key, username, credentials, enabled, role = "member", ignoreExisting = false) {
  const user = { id: crypto.randomUUID(), username, role, enabled: enabled ? 1 : 0, created_at: new Date().toISOString() };
  const statement = db.prepare(`INSERT ${ignoreExisting ? "OR IGNORE " : ""}INTO users
    (id, username, role, enabled, password_salt, password_iterations, password_verifier, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(user.id, username, role, user.enabled, credentials.salt, credentials.iterations, await sealProof(key, username, credentials), user.created_at);
  try {
    const result = await statement.run();
    return result.meta.changes ? user : null;
  } catch (error) {
    if (/UNIQUE constraint/i.test(error.message)) throw new HttpError(409, "该账号已存在，请更换账号名称。", "DUPLICATE_USERNAME");
    throw error;
  }
}

async function route(request, env) {
  const url = new URL(request.url);
  if (!env.DB || !env.PASSWORD_PEPPER || env.PASSWORD_PEPPER.length < 32) throw new HttpError(503, "账号服务尚未配置完成，请联系管理员。", "NOT_CONFIGURED");
  const db = env.DB.withSession ? env.DB.withSession("first-primary") : env.DB;
  const key = await pepperKey(env.PASSWORD_PEPPER);
  const method = request.method;
  const path = url.pathname.replace(/\/$/, "");
  if (path === "/api/status" && method === "GET") {
    const admin = await db.prepare("SELECT id FROM users WHERE role = 'admin' AND deleted_at IS NULL LIMIT 1").first();
    return { ready: true, initialized: Boolean(admin) };
  }
  const ip = await digest(request.headers.get("CF-Connecting-IP") || "unknown");
  if (["/api/challenge", "/api/login", "/api/setup"].includes(path)) {
    await rateLimit(db, `ip:${ip}`, 90, 900);
  }
  if (path === "/api/setup" && method === "POST") {
    const secret = request.headers.get("X-Setup-Token");
    if (!env.SETUP_TOKEN || !secret || await digest(secret) !== await digest(env.SETUP_TOKEN)) throw new HttpError(403, "管理员初始化链接无效。", "FORBIDDEN");
    const body = await readJSON(request);
    const credentials = validateCredentials(body);
    const user = await insertUser(db, key, "admin", credentials, true, "admin");
    return createSession(db, user, false);
  }
  if (path === "/api/challenge" && method === "POST") {
    const body = await readJSON(request);
    const username = normalizeUsername(body.username);
    if (!usernamePattern.test(username)) throw new HttpError(400, "账号或密码错误，请重新输入。", "INVALID_LOGIN");
    const user = await db.prepare("SELECT password_salt, password_iterations FROM users WHERE username = ? AND deleted_at IS NULL").bind(username).first();
    // A stable dummy salt avoids revealing absent accounts through a changing challenge.
    const salt = user?.password_salt || hex(await crypto.subtle.sign("HMAC", key, encoder.encode(`salt:${username}`))).slice(0, 32);
    return { salt, iterations: user?.password_iterations || NEW_ITERATIONS };
  }
  if (path === "/api/login" && method === "POST") {
    const body = await readJSON(request);
    const username = normalizeUsername(body.username);
    if (!usernamePattern.test(username) || !/^[a-f0-9]{64}$/.test(body.proof || "")) throw new HttpError(400, "账号或密码错误，请重新输入。", "INVALID_LOGIN");
    await rateLimit(db, `user:${await digest(username)}`, 10, 900);
    const user = await db.prepare("SELECT * FROM users WHERE username = ? AND deleted_at IS NULL").bind(username).first();
    if (!user || !await verifyProof(key, user, body.proof)) throw new HttpError(401, "账号或密码错误，请重新输入。", "INVALID_LOGIN");
    if (!user.enabled) throw new HttpError(403, "该账号已停用，请联系管理员。", "ACCOUNT_DISABLED");
    const session = await createSession(db, user, body.remember === true);
    await db.prepare("DELETE FROM auth_limits WHERE key = ?").bind(`user:${await digest(username)}`).run();
    return session;
  }
  if (path === "/api/session" && method === "GET") return { user: publicUser(await sessionUser(request, db)) };
  if (path === "/api/logout" && method === "POST") {
    const token = request.headers.get("Authorization")?.match(/^Bearer ([a-f0-9]{64})$/)?.[1];
    if (token) await db.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await digest(token)).run();
    return { ok: true };
  }
  await sessionUser(request, db, true);
  if (path === "/api/accounts" && method === "GET") {
    const result = await db.prepare("SELECT id, username, role, enabled, created_at, last_login FROM users WHERE role = 'member' AND deleted_at IS NULL ORDER BY created_at DESC").all();
    return { accounts: result.results.map(publicUser) };
  }
  if (path === "/api/accounts" && method === "POST") {
    const body = await readJSON(request);
    const username = normalizeUsername(body.username);
    if (!usernamePattern.test(username) || username === "admin") throw new HttpError(400, "账号需为 3-30 位字母、数字、点、下划线或短横线，且不能使用 admin。");
    if (typeof body.enabled !== "boolean") throw new HttpError(400, "请指定账号启用状态。");
    const user = await insertUser(db, key, username, validateCredentials(body), body.enabled);
    return { account: publicUser(user) };
  }
  if (path === "/api/accounts/import" && method === "POST") {
    const { accounts } = await readJSON(request);
    if (!Array.isArray(accounts) || !accounts.length || accounts.length > 100) throw new HttpError(400, "每次可迁移 1-100 个旧账号。");
    const usernames = new Set();
    const records = accounts.map((account) => {
      const username = normalizeUsername(account.username);
      if (!usernamePattern.test(username) || username === "admin" || usernames.has(username) || typeof account.enabled !== "boolean") throw new HttpError(400, "旧账号格式不正确或存在重复账号。");
      usernames.add(username);
      return { ...account, username, credentials: validateCredentials(account, true) };
    });
    const statements = [];
    for (const account of records) {
      statements.push(db.prepare(`INSERT OR IGNORE INTO users
        (id, username, role, enabled, password_salt, password_iterations, password_verifier, created_at) VALUES (?, ?, 'member', ?, ?, ?, ?, ?)`)
        .bind(crypto.randomUUID(), account.username, account.enabled ? 1 : 0, account.credentials.salt, account.credentials.iterations,
          await sealProof(key, account.username, account.credentials), new Date().toISOString()));
    }
    const results = await db.batch(statements);
    const imported = results.reduce((sum, result) => sum + result.meta.changes, 0);
    return { imported, skipped: records.length - imported };
  }
  const match = path.match(/^\/api\/accounts\/([a-f0-9-]{36})$/);
  if (match && ["PATCH", "DELETE"].includes(method)) {
    const account = await db.prepare("SELECT id, role FROM users WHERE id = ? AND deleted_at IS NULL").bind(match[1]).first();
    if (!account) throw new HttpError(404, "账号不存在，请刷新列表。");
    if (account.role === "admin") throw new HttpError(403, "不能停用或删除系统管理员。");
    if (method === "PATCH") {
      const body = await readJSON(request);
      if (typeof body.enabled !== "boolean") throw new HttpError(400, "请指定账号启用状态。");
      await db.batch([
        db.prepare("UPDATE users SET enabled = ? WHERE id = ?").bind(body.enabled ? 1 : 0, account.id),
        db.prepare("DELETE FROM sessions WHERE user_id = ?").bind(account.id),
      ]);
    } else {
      await db.batch([
        db.prepare("UPDATE users SET deleted_at = ?, enabled = 0 WHERE id = ?").bind(new Date().toISOString(), account.id),
        db.prepare("DELETE FROM sessions WHERE user_id = ?").bind(account.id),
      ]);
    }
    return { ok: true };
  }
  throw new HttpError(404, "接口不存在。");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(url.hostname)) {
      url.protocol = "https:";
      return new Response(null, { status: 308, headers: { Location: url.href, "Cache-Control": "no-store" } });
    }
    const origin = request.headers.get("Origin");
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((value) => value.trim()).filter(Boolean);
    const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "Vary": "Origin", "X-Content-Type-Options": "nosniff", "Strict-Transport-Security": "max-age=31536000", "Referrer-Policy": "no-referrer" };
    if (origin && !allowed.includes(origin)) return new Response(JSON.stringify({ error: "不允许此网站访问账号服务。", code: "ORIGIN_DENIED" }), { status: 403, headers });
    if (origin) headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, DELETE, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Setup-Token";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    try {
      return new Response(JSON.stringify(await route(request, env)), { headers });
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 503;
      return new Response(JSON.stringify({ error: error instanceof HttpError ? error.message : "账号服务暂时不可用，请稍后重试。", code: error instanceof HttpError ? error.code : "SERVICE_UNAVAILABLE" }), { status, headers });
    }
  },
};
