# Account Service Gateway

This Cloudflare Pages project exposes only `/api/*` and forwards requests through
the `AUTH_SERVICE` service binding to the existing `orbit-workbench-auth` Worker.
The existing Worker remains responsible for authentication, CORS, rate limits,
sessions and D1 storage. Do not copy its database or password pepper here.

Deploy from this directory using the repository's Wrangler installation:

```sh
../node_modules/.bin/wrangler pages project create orbit-workbench-api --production-branch main --force
../node_modules/.bin/wrangler pages deploy public --project-name orbit-workbench-api --branch main
```

Deploy only `public`, never the repository root. Configure the returned production
Pages origin in `auth-config.js`. Keep the original Worker origin as a fallback
for cached clients and networks where only one endpoint is reachable. Frontend
health checks contain no credentials; failed writes are never automatically
replayed against another endpoint.
