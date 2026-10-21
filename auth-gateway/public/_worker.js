export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    try {
      return await env.AUTH_SERVICE.fetch(request);
    } catch {
      const headers = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=31536000",
        "Vary": "Origin",
      });
      const origin = request.headers.get("Origin");
      if (origin && (env.ALLOWED_ORIGINS || "").split(",").map((value) => value.trim()).includes(origin)) headers.set("Access-Control-Allow-Origin", origin);
      return new Response(JSON.stringify({ error: "账号服务暂时不可用，请稍后重试。", code: "SERVICE_UNAVAILABLE" }), { status: 503, headers });
    }
  },
};
