const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const vm = require("node:vm");
const { webcrypto } = require("node:crypto");

function storage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) || null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) };
}

async function main() {
  const source = await fs.readFile(new URL("../auth-client.js", `file://${__filename}`), "utf8");
  function client(fetch, config = {}, runtime = {}) {
    const context = vm.createContext({
      window: { OrbitAuthConfig: { mode: "cloud", apiBase: "https://primary.example", fallbackApiBases: ["https://backup.example"], ...config } },
      localStorage: storage(), sessionStorage: storage(), fetch, URL, AbortController, setTimeout, clearTimeout,
      TypeError, TextEncoder, Uint8Array, crypto: webcrypto, ...runtime,
    });
    vm.runInContext(source, context);
    return context;
  }
  const ok = (body) => Response.json(body);
  const seen = [];
  let writeCount = 0;
  const context = client(async (url, options) => {
    seen.push({ url, options });
    if (url.endsWith("/status")) return ok({ ready: true });
    if (options.method === "POST") { writeCount++; throw new TypeError("response lost after commit"); }
    return ok({ accounts: [] });
  });
  context.localStorage.setItem("orbit-cloud-session", "synthetic-session");
  await assert.rejects(context.window.OrbitAuth.createAccount("new.member", "synthetic-password", true), /操作结果尚未确认/);
  assert.equal(writeCount, 1);
  assert.equal(seen.some(({ url }) => url.startsWith("https://backup.example")), false);
  assert.equal(seen[0].options.headers, undefined);
  assert.equal(seen[0].options.credentials, "omit");
  assert.equal(seen[1].options.headers.Authorization, "Bearer synthetic-session");
  await context.window.OrbitAuth.listAccounts();
  assert.equal(seen.filter(({ url }) => url.endsWith("/status")).length, 2);

  for (const status of [401, 403, 429, 503]) {
    let probes = 0;
    let submissions = 0;
    const auth = client(async (url) => {
      if (url.endsWith("/status")) { probes++; return ok({ ready: true }); }
      submissions++;
      return Response.json({ error: `server-${status}`, code: status === 401 ? "UNAUTHENTICATED" : "REQUEST_FAILED" }, { status });
    });
    auth.localStorage.setItem("orbit-cloud-session", "synthetic-session");
    await assert.rejects(auth.window.OrbitAuth.listAccounts(), (error) => error.status === status && error.message === `server-${status}`);
    assert.equal(probes, 1);
    assert.equal(submissions, 1);
    assert.equal(auth.localStorage.getItem("orbit-cloud-session"), status === 401 ? null : "synthetic-session");
  }

  let probes = 0;
  const blocked = client(async (url, options) => {
    assert.ok(url.endsWith("/status"));
    assert.equal(options.headers, undefined);
    probes++;
    throw new TypeError("network blocked");
  });
  await assert.rejects(blocked.window.OrbitAuth.login("admin", "admin", false), /已检查所有可用入口/);
  assert.equal(probes, 2);
  assert.equal(blocked.localStorage.getItem("orbit-cloud-session"), null);

  const timeoutCalls = [];
  const timedOut = client(async (url, options) => {
    timeoutCalls.push(url);
    if (url.startsWith("https://primary.example")) {
      return new Promise((resolve, reject) => options.signal.addEventListener("abort", () => reject(new DOMException("timeout", "AbortError")), { once: true }));
    }
    return ok(url.endsWith("/status") ? { ready: true } : { accounts: [] });
  }, {}, { setTimeout: (callback, ms) => setTimeout(callback, ms === 4000 ? 0 : ms) });
  await timedOut.window.OrbitAuth.listAccounts();
  assert.deepEqual(timeoutCalls, ["https://primary.example/api/status", "https://backup.example/api/status", "https://backup.example/api/accounts"]);

  const invalid = client(() => { throw new Error("must not contact insecure endpoint"); }, { apiBase: "http://untrusted.example", fallbackApiBases: ["https://user:password@untrusted.example", "not-an-origin"] });
  await assert.rejects(invalid.window.OrbitAuth.listAccounts(), /尚未配置/);

  let resolveProbe;
  let concurrentProbes = 0;
  const concurrent = client(async (url) => {
    if (url.endsWith("/status")) { concurrentProbes++; await new Promise((resolve) => { resolveProbe = resolve; }); return ok({ ready: true }); }
    return ok({ accounts: [] });
  });
  const first = concurrent.window.OrbitAuth.listAccounts();
  const second = concurrent.window.OrbitAuth.listAccounts();
  assert.equal(concurrentProbes, 1);
  resolveProbe();
  await Promise.all([first, second]);

  const gateway = (await import("../auth-gateway/public/_worker.js")).default;
  let forwarded = 0;
  const request = new Request("https://gateway.example/api/accounts?target=https://untrusted.example", {
    method: "POST", headers: { Origin: "https://17671052998-art.github.io", Authorization: "Bearer synthetic-session", "Content-Type": "application/json" },
    body: JSON.stringify({ username: "synthetic.member" }),
  });
  const response = await gateway.fetch(request, { AUTH_SERVICE: { async fetch(received) {
    forwarded++;
    assert.equal(received, request);
    assert.equal(received.headers.get("Authorization"), "Bearer synthetic-session");
    assert.equal((await received.json()).username, "synthetic.member");
    return Response.json({ error: "denied" }, { status: 403, headers: { "Access-Control-Allow-Origin": "https://17671052998-art.github.io" } });
  } } });
  assert.equal(forwarded, 1);
  assert.equal(response.status, 403);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://17671052998-art.github.io");
  for (const origin of ["https://17671052998-art.github.io", "https://untrusted.example"]) {
    const failed = await gateway.fetch(new Request("https://gateway.example/api/status", { headers: { Origin: origin } }), { ALLOWED_ORIGINS: "https://17671052998-art.github.io" });
    assert.equal(failed.status, 503);
    assert.equal(failed.headers.get("Cache-Control"), "no-store");
    assert.equal(failed.headers.get("Access-Control-Allow-Origin"), origin.includes("untrusted") ? null : origin);
    assert.equal((await failed.json()).code, "SERVICE_UNAVAILABLE");
  }
  const staticResponse = await gateway.fetch(new Request("https://gateway.example/"), { ASSETS: { fetch: () => new Response("static") } });
  assert.equal(await staticResponse.text(), "static");
  console.log("PASS: shared endpoint discovery, no credentialed probes, no write replay, unchanged server errors, fail-closed networking and internal gateway forwarding.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
