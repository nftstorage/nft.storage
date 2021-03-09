# Install Workers CLI
`npm install -g @cloudflare/wrangler`

# Site

### Local development
```bash
cd site
yarn install
yarn start
```

### Publish
`yarn publish`

## KV namespaces

- `wrangler kv:namespace create SESSION`
- `wrangler kv:namespace create SESSION --env production`
- `wrangler kv:namespace create CSRF`
- `wrangler kv:namespace create CSRF --end production`

## Secrets
```
wrangler secret put AUTH0_DOMAIN
wrangler secret put AUTH0_CLIENT_ID
wrangler secret put AUTH0_CLIENT_SECRET
wrangler secret put SALT

wrangler secret put AUTH0_DOMAIN --env production
wrangler secret put AUTH0_CLIENT_ID --env production
wrangler secret put AUTH0_CLIENT_SECRET --env production
wrangler secret put SALT --env production
```

# API - wip

### Local development
```bash
cd api
yarn install
yarn start
```

### Publish
`yarn publish`