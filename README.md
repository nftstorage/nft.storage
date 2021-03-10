# nft.storage

Unlimited storage of NFT data on IPFS, backed by Filecoin and provided free to [NFTHack](https://nfthack.ethglobal.co/) participants during the hackathon.


## Setup 
Cloudflare Workers CLI
```bash
npm install -g @cloudflare/wrangler
wrangler login
```

Cloudflare Workers initial setup:
> These only need to be ran if you need to setup workers account from scratch.
### KV namespaces

```bash
# dev and preview KVs
wrangler kv:namespace create USERS --preview
wrangler kv:namespace create SESSION --preview
wrangler kv:namespace create CSRF --preview

# production KVs
wrangler kv:namespace create USERS --env production
wrangler kv:namespace create SESSION --env production
wrangler kv:namespace create CSRF --env production
```

### Secrets
Get random strings from `https://csprng.xyz/v1/api`

```bash
# dev and preview secrets
wrangler secret put AUTH0_DOMAIN
wrangler secret put AUTH0_CLIENT_ID
wrangler secret put AUTH0_CLIENT_SECRET
wrangler secret put SALT

# production secrets
wrangler secret put AUTH0_DOMAIN --env production
wrangler secret put AUTH0_CLIENT_ID --env production
wrangler secret put AUTH0_CLIENT_SECRET --env production
wrangler secret put SALT --env production
```

## Site

### Local development
```bash
cd site
yarn install
yarn start
```

### Publish
`yarn publish`
