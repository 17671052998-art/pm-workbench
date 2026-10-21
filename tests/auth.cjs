const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const { pbkdf2Sync, randomBytes } = require("node:crypto");
const { chromium } = require("playwright");

function d1Adapter(sqlite) {
  return {
    withSession() { return this; },
    prepare(sql) {
      let values = [];
      return {
        bind(...args) { values = args; return this; },
        async first() { return sqlite.prepare(sql).get(...values) || null; },
        async all() { return { results: sqlite.prepare(sql).all(...values) }; },
        async run() { return { meta: { changes: sqlite.prepare(sql).run(...values).changes } }; },
      };
    },
    async batch(statements) {
      sqlite.exec("BEGIN");
      try {
        const results = [];
        for (const statement of statements) results.push(await statement.run());
        sqlite.exec("COMMIT");
        return results;
      } catch (error) { sqlite.exec("ROLLBACK"); throw error; }
    },
  };
}

function credentials(password, iterations = 600000) {
  const salt = randomBytes(16).toString("hex");
  return { salt, iterations, proof: pbkdf2Sync(password, Buffer.from(salt, "hex"), iterations, 32, "sha256").toString("hex") };
}

async function main() {
  const worker = (await import("../auth-service/worker.mjs")).default;
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(await fs.readFile(path.join(__dirname, "../auth-service/migrations/0001_accounts.sql"), "utf8"));
  const env = { DB: d1Adapter(sqlite), PASSWORD_PEPPER: randomBytes(32).toString("hex"), SETUP_TOKEN: randomBytes(32).toString("hex"), ALLOWED_ORIGINS: "https://17671052998-art.github.io" };
  const call = (route, method = "GET", body, token, headers = {}) => worker.fetch(new Request(`https://auth.example/api${route}`, {
    method, headers: { "Content-Type": "application/json", "CF-Connecting-IP": "192.0.2.3", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...headers },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  }), env);
  let browser;
  let server;
  try {
    assert.equal((await worker.fetch(new Request("http://auth.example/api/status"), env)).status, 308);
    assert.equal((await call("/status")).status, 200);
    assert.equal((await call("/accounts")).status, 401);
    assert.equal((await call("/setup", "POST", credentials("only-synthetic-setup"))).status, 403);
    const adminCredentials = credentials("synthetic-admin-password");
    const setup = await call("/setup", "POST", adminCredentials, null, { "X-Setup-Token": env.SETUP_TOKEN });
    assert.equal(setup.status, 200);
    const admin = await setup.json();
    assert.equal(admin.user.username, "admin");
    assert.equal(sqlite.prepare("SELECT token_hash FROM sessions").get().token_hash === admin.token, false);
    assert.equal((await call("/setup", "POST", adminCredentials, null, { "X-Setup-Token": env.SETUP_TOKEN })).status, 409);
    assert.equal((await call("/status")).headers.get("Cache-Control"), "no-store");
    const denied = await call("/status", "GET", undefined, null, { Origin: "https://untrusted.example" });
    assert.equal(denied.status, 403);
    assert.equal(denied.headers.get("Access-Control-Allow-Origin"), null);
    assert.equal((await call("/status", "OPTIONS", undefined, null, { Origin: "https://17671052998-art.github.io" })).status, 204);
    const memberCredentials = credentials("member-password");
    const created = await call("/accounts", "POST", { username: " Unit.Member ", enabled: true, role: "admin", ...memberCredentials }, admin.token);
    assert.equal(created.status, 200);
    const member = (await created.json()).account;
    assert.equal(member.username, "unit.member");
    assert.equal(member.role, "member");
    assert.equal((await call("/accounts", "POST", { username: member.username, enabled: true, ...memberCredentials }, admin.token)).status, 409);
    const login = await call("/login", "POST", { username: member.username, proof: memberCredentials.proof, remember: false });
    const memberSession = await login.json();
    assert.equal(login.status, 200);
    assert.equal((await call("/accounts", "GET", undefined, memberSession.token)).status, 403);
    assert.equal((await call(`/accounts/${member.id}`, "PATCH", { enabled: false }, admin.token)).status, 200);
    assert.equal((await call("/session", "GET", undefined, memberSession.token)).status, 401);
    assert.equal((await call("/login", "POST", { username: member.username, proof: memberCredentials.proof })).status, 403);
    await call(`/accounts/${member.id}`, "PATCH", { enabled: true }, admin.token);
    const listed = await (await call("/accounts", "GET", undefined, admin.token)).text();
    assert.equal(listed.includes("password_"), false);
    assert.equal(listed.includes(memberCredentials.proof), false);
    assert.equal(sqlite.prepare("SELECT password_verifier FROM users WHERE username = ?").get(member.username).password_verifier === memberCredentials.proof, false);
    assert.equal((await call(`/accounts/${admin.user.id}`, "DELETE", undefined, admin.token)).status, 403);
    for (let attempt = 0; attempt < 10; attempt++) assert.equal((await call("/login", "POST", { username: "absent.user", proof: "0".repeat(64) })).status, 401);
    assert.equal((await call("/login", "POST", { username: "absent.user", proof: "0".repeat(64) })).status, 429);
    console.log("PASS: protected account API, one-time admin setup, no credential exposure, CORS, server roles, session revocation and login rate limits.");

    const project = path.resolve(__dirname, "..");
    let origin;
    server = http.createServer(async (request, response) => {
      try {
        const url = new URL(request.url, origin);
        if (url.pathname.startsWith("/api/")) {
          const chunks = [];
          for await (const chunk of request) chunks.push(chunk);
          const headers = { ...request.headers, "CF-Connecting-IP": "192.0.2.11" };
          const result = await worker.fetch(new Request(url, { method: request.method, headers, ...(chunks.length ? { body: Buffer.concat(chunks) } : {}) }), env);
          response.writeHead(result.status, Object.fromEntries(result.headers));
          response.end(Buffer.from(await result.arrayBuffer()));
          return;
        }
        if (url.pathname === "/pm-workbench/auth-config.js") {
          response.writeHead(200, { "Content-Type": "application/javascript" });
          response.end(`window.OrbitAuthConfig = ${JSON.stringify({ mode: "cloud", apiBase: origin })}`);
          return;
        }
        if (!url.pathname.startsWith("/pm-workbench/")) throw new Error();
        const filename = path.resolve(project, url.pathname.slice("/pm-workbench/".length) || "index.html");
        if (!filename.startsWith(project + path.sep)) throw new Error();
        const bytes = await fs.readFile(filename);
        response.writeHead(200, { "Content-Type": ({ ".html": "text/html", ".js": "application/javascript", ".css": "text/css" })[path.extname(filename)] || "application/octet-stream" });
        response.end(bytes);
      } catch { response.writeHead(404); response.end(); }
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
    env.ALLOWED_ORIGINS += `,${origin}`;
    browser = await chromium.launch({ channel: "chrome", headless: true });
    const adminBrowser = await browser.newContext();
    const memberBrowser = await browser.newContext();
    const adminPage = await adminBrowser.newPage();
    const memberPage = await memberBrowser.newPage();
    const errors = [];
    for (const page of [adminPage, memberPage]) {
      page.on("pageerror", (error) => errors.push(error.message));
      await page.route("https://fonts.**/*", (route) => route.abort());
    }
    const open = async (page) => {
      await page.goto(`${origin}/pm-workbench/`);
      await page.waitForFunction(() => !document.querySelector('#loginForm button[type="submit"]').disabled);
    };
    const signIn = async (page, username, password, success = true) => {
      await page.waitForFunction(() => window.OrbitAuth?.enabled && !document.querySelector('#loginForm button[type="submit"]').disabled);
      await page.locator("#loginUsername").fill(username);
      await page.locator("#loginPassword").fill(password);
      await page.locator('#loginForm button[type="submit"]').click();
      if (success) await page.locator("#appShell").waitFor({ state: "visible" });
      else await page.waitForFunction(() => !document.querySelector('#loginForm button[type="submit"]').disabled);
    };
    await open(adminPage);
    await signIn(adminPage, "admin", "synthetic-admin-password");
    let releaseList;
    const listGate = new Promise((resolve) => { releaseList = resolve; });
    const delayedList = async (route) => {
      if (route.request().method() === "GET") await listGate;
      await route.continue();
    };
    await adminPage.route(`${origin}/api/accounts`, delayedList);
    await adminPage.locator("#adminSettingsNav").click();
    await adminPage.locator("#accountUsername").fill("draft.user");
    await adminPage.locator("#accountPassword").fill("draft-password");
    await adminPage.locator("#accountUsername").evaluate((input) => { input.dataset.formRetained = "yes"; });
    releaseList();
    await adminPage.locator('[data-account-row]').waitFor();
    assert.equal(await adminPage.locator("#accountUsername").inputValue(), "draft.user");
    assert.equal(await adminPage.locator("#accountPassword").inputValue(), "draft-password");
    assert.equal(await adminPage.locator("#accountUsername").getAttribute("data-form-retained"), "yes");
    await adminPage.unroute(`${origin}/api/accounts`, delayedList);
    assert.equal(await adminPage.locator("#accountUsername").getAttribute("autocomplete"), "off");
    assert.equal(await adminPage.locator("#accountPassword").getAttribute("autocomplete"), "new-password");
    let createRequests = 0;
    adminPage.on("request", (request) => { if (request.method() === "POST" && request.url() === `${origin}/api/accounts`) createRequests++; });
    await adminPage.locator("#accountUsername").fill("admin");
    await adminPage.locator('#accountCreateForm button[type="submit"]').click();
    assert.match(await adminPage.locator("#accountFormError").textContent(), /admin 是已存在的系统管理员/);
    assert.equal(await adminPage.locator("#accountUsername").getAttribute("aria-invalid"), "true");
    assert.equal(createRequests, 0);
    await adminPage.locator("#accountUsername").fill("Team.User");
    await adminPage.locator("#accountPassword").fill("shared123");
    await adminPage.locator('#accountCreateForm button[type="submit"]').click();
    await adminPage.locator("#accountCreateForm").evaluate((form) => form.requestSubmit());
    await adminPage.getByText("team.user", { exact: true }).waitFor();
    assert.equal(createRequests, 1);
    assert.match(await adminPage.locator("#accountFormSuccess").textContent(), /team.user.*已保存到云端/);
    assert.equal(await adminPage.locator("#accountFormSuccess").isVisible(), true);
    assert.equal(await adminPage.locator("#accountUsername").inputValue(), "");
    assert.equal(await adminPage.locator("#accountPassword").inputValue(), "");
    await adminPage.locator("#accountUsername").fill("unit.member");
    await adminPage.locator("#accountPassword").fill("member-password");
    await adminPage.locator('#accountCreateForm button[type="submit"]').click();
    assert.match(await adminPage.locator("#accountFormError").textContent(), /已存在，无需重复创建/);
    assert.equal(createRequests, 1);

    const failedCreate = async (route) => {
      if (route.request().method() === "POST") await route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ error: "写入服务暂时不可用，请重试。" }) });
      else await route.continue();
    };
    await adminPage.route(`${origin}/api/accounts`, failedCreate);
    await adminPage.locator("#accountUsername").fill("retry.user");
    await adminPage.locator("#accountPassword").fill("retry-password");
    await adminPage.locator('#accountCreateForm button[type="submit"]').click();
    await adminPage.waitForFunction(() => document.querySelector("#accountFormError").textContent.includes("写入服务"));
    assert.equal(await adminPage.locator("#accountUsername").inputValue(), "retry.user");
    assert.equal(await adminPage.locator("#accountPassword").inputValue(), "retry-password");
    assert.equal(sqlite.prepare("SELECT id FROM users WHERE username = 'retry.user'").get(), undefined);
    await adminPage.unroute(`${origin}/api/accounts`, failedCreate);
    let failListOnce = true;
    const failedRefresh = async (route) => {
      if (route.request().method() === "GET" && failListOnce) { failListOnce = false; await route.abort(); }
      else await route.continue();
    };
    await adminPage.route(`${origin}/api/accounts`, failedRefresh);
    await adminPage.locator('#accountCreateForm button[type="submit"]').click();
    await adminPage.locator("#accountRetry").waitFor();
    assert.match(await adminPage.locator("#accountFormSuccess").textContent(), /retry.user.*已保存到云端.*列表刷新失败.*无需重复创建/);
    assert.ok(sqlite.prepare("SELECT id FROM users WHERE username = 'retry.user'").get());
    await adminPage.locator("#accountUsername").fill("next.draft");
    await adminPage.locator("#accountPassword").fill("next-password");
    await adminPage.locator("#accountRetry").click();
    await adminPage.getByText("retry.user", { exact: true }).waitFor();
    assert.equal(await adminPage.locator("#accountUsername").inputValue(), "next.draft");
    assert.equal(await adminPage.locator("#accountPassword").inputValue(), "next-password");
    await adminPage.unroute(`${origin}/api/accounts`, failedRefresh);
    console.log("PASS: account form survives async refresh, new-password autofill hints, reserved/duplicate usernames, single-submit protection, persistent save feedback and retry without losing input.");
    await open(memberPage);
    assert.equal(await memberPage.evaluate(() => localStorage.getItem("orbit-managed-accounts")), null);
    await signIn(memberPage, " TEAM.USER ", "shared123");
    assert.equal(await memberPage.locator("#profileName").textContent(), "team.user");
    assert.equal(await memberPage.locator("#adminSettingsNav").isVisible(), false);
    await memberPage.reload();
    await memberPage.locator("#appShell").waitFor({ state: "visible" });
    await adminPage.locator('[data-account-row]').filter({ hasText: "team.user" }).getByRole("button", { name: "停用", exact: true }).click();
    await adminPage.locator('[data-account-row]').filter({ hasText: "team.user" }).getByRole("button", { name: "启用", exact: true }).waitFor();
    await memberPage.reload();
    await memberPage.locator("#loginView").waitFor({ state: "visible" });
    await signIn(memberPage, "team.user", "shared123", false);
    assert.match(await memberPage.locator("#loginError").textContent(), /已停用/);
    const legacy = credentials("legacy123", 120000);
    await adminPage.evaluate((value) => localStorage.setItem("orbit-managed-accounts", JSON.stringify([value])), {
      id: "legacy-id", username: "legacy.user", enabled: true, salt: legacy.salt, passwordHash: legacy.proof,
    });
    await adminPage.locator("#accountRefresh").click();
    await adminPage.locator("#accountMigrate").waitFor();
    adminPage.once("dialog", (dialog) => dialog.accept());
    await adminPage.locator("#accountMigrate").click();
    await adminPage.getByText("legacy.user", { exact: true }).waitFor();
    assert.equal(await adminPage.evaluate(() => localStorage.getItem("orbit-managed-accounts")), null);
    await signIn(memberPage, "legacy.user", "legacy123");
    assert.equal(await memberPage.locator("#profileName").textContent(), "legacy.user");
    await memberPage.locator("#logoutButton").click();
    await signIn(memberPage, "legacy.user", "wrong-password", false);
    assert.match(await memberPage.locator("#loginError").textContent(), /账号或密码错误/);
    await memberPage.evaluate(() => localStorage.setItem("orbit-authenticated", "admin"));
    await memberPage.route(`${origin}/api/**`, (route) => route.abort());
    await memberPage.reload();
    await memberPage.locator("#loginView").waitFor({ state: "visible" });
    await signIn(memberPage, "admin", "admin", false);
    assert.match(await memberPage.locator("#loginError").textContent(), /无法连接云端/);
    assert.equal(await memberPage.locator("#appShell").isVisible(), false);
    await memberPage.unroute(`${origin}/api/**`);
    await memberPage.route(`${origin}/pm-workbench/auth-config.js*`, (route) => route.fulfill({ contentType: "application/javascript", body: "/* configuration failed to load */" }));
    await memberPage.reload();
    await signIn(memberPage, "admin", "admin", false);
    assert.match(await memberPage.locator("#loginError").textContent(), /尚未配置/);
    assert.equal(await memberPage.locator("#appShell").isVisible(), false);
    assert.deepEqual(errors, []);
    await adminPage.screenshot({ path: "/tmp/pm-workbench-cloud-accounts.png", fullPage: true });
    console.log("PASS: separate browser contexts share accounts, restore server sessions, enforce remote disabling, migrate original passwords and never fall back to local admin.");
  } finally {
    if (browser) await browser.close();
    if (server) await new Promise((resolve) => server.close(resolve));
    sqlite.close();
  }
}

module.exports = { d1Adapter };
if (require.main === module) main().catch((error) => { console.error(error); process.exitCode = 1; });
