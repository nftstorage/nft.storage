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
wrangler kv:namespace create USERS
wrangler kv:namespace create SESSION
wrangler kv:namespace create SESSION --env production
wrangler kv:namespace create CSRF
wrangler kv:namespace create CSRF --env production
```

### Secrets
Get random strings from `https://csprng.xyz/v1/api`

```bash
# dev 
wrangler secret put AUTH0_DOMAIN
wrangler secret put AUTH0_CLIENT_ID
wrangler secret put AUTH0_CLIENT_SECRET
wrangler secret put SALT

#production
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



## API - wip

### Local development
```bash
cd api
yarn install
yarn start
```

### Publish
`yarn publish`