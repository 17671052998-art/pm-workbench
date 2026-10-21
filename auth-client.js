(() => {
  const config = window.OrbitAuthConfig || {};
  const enabled = config.mode !== "local";
  const tokenKey = "orbit-cloud-session";
  const hex = (value) => Array.from(new Uint8Array(value), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const clearSession = () => { localStorage.removeItem(tokenKey); sessionStorage.removeItem(tokenKey); };
  const getToken = () => localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
  const bases = [];
  for (const value of [config.apiBase, ...(Array.isArray(config.fallbackApiBases) ? config.fallbackApiBases : [])]) {
    try {
      const parsed = new URL(value);
      if (!parsed.username && !parsed.password && (parsed.protocol === "https:" || (parsed.protocol === "http:" && ["localhost", "127.0.0.1"].includes(parsed.hostname)))) {
        if (!bases.includes(parsed.origin)) bases.push(parsed.origin);
      }
    } catch { /* Invalid cloud configuration must fail closed, never use local accounts. */ }
  }
  let selectedBase;
  let discovery;
  const connectionError = (checkedAll = false) => new Error(`无法连接云端账号服务，${checkedAll ? "已检查所有可用入口" : "连接已中断，重试时将重新检测可用入口"}。请稍后重试或联系管理员，不会改用本机账号验证。`);

  async function reachable(base) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    try {
      const response = await fetch(`${base}/api/status`, { signal: controller.signal, credentials: "omit", cache: "no-store" });
      return response.ok && (await response.json()).ready === true;
    } catch { return false; }
    finally { clearTimeout(timer); }
  }

  async function selectBase() {
    if (!bases.length) throw new Error("云端账号服务尚未配置，请联系管理员。");
    if (selectedBase) return selectedBase;
    if (!discovery) {
      discovery = (async () => {
        // Probe without credentials; never replay a submitted write on another host.
        for (const base of bases) {
          if (await reachable(base)) { selectedBase = base; return base; }
        }
        throw connectionError(true);
      })().finally(() => { discovery = null; });
    }
    return discovery;
  }

  async function request(path, options = {}) {
    const base = await selectBase();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const headers = { ...(options.body === undefined ? {} : { "Content-Type": "application/json" }), ...options.headers };
      const token = getToken();
      if (token) headers.Authorization = `Bearer ${token}`;
      const response = await fetch(`${base}/api${path}`, { ...options, headers, signal: controller.signal, credentials: "omit", cache: "no-store" });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(body.error || "账号服务暂时不可用，请稍后重试。");
        error.status = response.status;
        error.code = body.code;
        if (body.code === "UNAUTHENTICATED" && token === getToken()) clearSession();
        throw error;
      }
      return body;
    } catch (error) {
      if (error instanceof TypeError || error.name === "AbortError") {
        if (selectedBase === base) selectedBase = null;
        const message = connectionError();
        if (["POST", "PATCH", "DELETE"].includes(options.method) && path.startsWith("/accounts")) message.message += "本次操作结果尚未确认，请先刷新账号列表核对，再决定是否重试。";
        throw message;
      }
      throw error;
    } finally { clearTimeout(timer); }
  }

  async function credentials(password, challenge) {
    const salt = challenge?.salt || hex(crypto.getRandomValues(new Uint8Array(16)));
    const iterations = challenge?.iterations || 600000;
    if (!/^[a-f0-9]{32}$/.test(salt) || ![120000, 600000].includes(iterations)) throw new Error("账号服务返回了无效的密码验证参数。");
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
    const proof = hex(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: Uint8Array.from(salt.match(/../g), (byte) => parseInt(byte, 16)), iterations, hash: "SHA-256" }, key, 256));
    return { salt, iterations, proof };
  }

  function saveSession(result, remember) {
    clearSession();
    (remember ? localStorage : sessionStorage).setItem(tokenKey, result.token);
    return result.user;
  }

  window.OrbitAuth = {
    enabled,
    async login(username, password, remember) {
      const challenge = await request("/challenge", { method: "POST", body: JSON.stringify({ username }) });
      const { proof } = await credentials(password, challenge);
      const result = await request("/login", { method: "POST", body: JSON.stringify({ username, proof, remember }) });
      return saveSession(result, remember);
    },
    async restore() {
      if (!getToken()) return null;
      try { return (await request("/session")).user; }
      catch (error) { if (error.code === "UNAUTHENTICATED") return null; throw error; }
    },
    async logout() {
      try { if (getToken()) await request("/logout", { method: "POST", body: "{}" }); }
      finally { clearSession(); }
    },
    async setup(password, setupToken) {
      const result = await request("/setup", { method: "POST", headers: { "X-Setup-Token": setupToken }, body: JSON.stringify(await credentials(password)) });
      return saveSession(result, false);
    },
    async listAccounts() { return (await request("/accounts")).accounts; },
    async createAccount(username, password, active) {
      return request("/accounts", { method: "POST", body: JSON.stringify({ username, enabled: active, ...await credentials(password) }) });
    },
    async updateAccount(id, active) { return request(`/accounts/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ enabled: active }) }); },
    async deleteAccount(id) { return request(`/accounts/${encodeURIComponent(id)}`, { method: "DELETE" }); },
    async importAccounts(accounts) {
      let imported = 0;
      let skipped = 0;
      for (let start = 0; start < accounts.length; start += 100) {
        const chunk = accounts.slice(start, start + 100).map((account) => ({ username: account.username, salt: account.salt, proof: account.passwordHash, iterations: 120000, enabled: account.enabled }));
        const result = await request("/accounts/import", { method: "POST", body: JSON.stringify({ accounts: chunk }) });
        imported += result.imported;
        skipped += result.skipped;
      }
      return { imported, skipped };
    },
  };
})();
