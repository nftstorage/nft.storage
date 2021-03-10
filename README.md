# nft.storage <!-- omit in toc -->

Unlimited storage of NFT data on IPFS, backed by Filecoin and provided free to [NFTHack](https://nfthack.ethglobal.co/) participants during the hackathon.

# Table of Contents <!-- omit in toc -->
- [`site` Setup](#site-setup)
  - [Cloudflare Workers CLI](#cloudflare-workers-cli)
  - [Auth0 account](#auth0-account)
  - [Cloudflare Workers initial setup:](#cloudflare-workers-initial-setup)
    - [Development Setup](#development-setup)
    - [Production Setup `[env.production]`](#production-setup-envproduction)
- [`site` Usage](#site-usage)
  - [Local development](#local-development)
  - [Deploy](#deploy)
   


## `site` Setup 
### Cloudflare Workers CLI
```bash
npm install -g @cloudflare/wrangler
wrangler login
# when using personal accounts you may need to manually change the `account_id` inside `wrangler.toml` 
```

### Auth0 account
Go to auth0.com create an account and create two "REGULAR WEB APPLICATION" applications one for dev and another for production. In the settings of each application you will find the secrets needed to complete the initial setup.

### Cloudflare Workers initial setup:
> This only needs to be ran once when setting up from scratch.  
   

#### Development Setup   

Open `wrangler.toml` and delete everything inside the root `kv_namespaces` array so `wrangler` doesn't get confused.

```bash
cd site
yarn install
# dev and preview KVs
wrangler kv:namespace create USERS --preview
# cli output something like: `{ binding = "USERS", preview_id = "7e441603d1bc4d5a87f6cecb959018e4" }`
# but you need to put `{ binding = "USERS", preview_id = "7e441603d1bc4d5a87f6cecb959018e4", id = "7e441603d1bc4d5a87f6cecb959018e4" }` inside the `kv_namespaces`.
wrangler kv:namespace create SESSION --preview
# same as above
wrangler kv:namespace create CSRF --preview
# same as above
```
Go to `/site/src/constants.js` *uncomment* the first line and run `wrangler publish`.

```bash
# dev and preview secrets
wrangler secret put AUTH0_DOMAIN # Get from auth0 account
wrangler secret put AUTH0_CLIENT_ID # Get from auth0 account
wrangler secret put AUTH0_CLIENT_SECRET # Get from auth0 account
wrangler secret put SALT # open `https://csprng.xyz/v1/api` in the browser and use the value of `Data`
```
Go to `/site/src/constants.js` *comment* the first line and run `wrangler publish`.

#### Production Setup `[env.production]`
```bash
# production KVs
wrangler kv:namespace create USERS --env production
# Follow the instructions from the cli output
wrangler kv:namespace create SESSION --env production
# Follow the instructions from the cli output
wrangler kv:namespace create CSRF --env production
# Follow the instructions from the cli output
wrangler secret put AUTH0_DOMAIN --env production # Get from auth0 account
wrangler secret put AUTH0_CLIENT_ID --env production # Get from auth0 account
wrangler secret put AUTH0_CLIENT_SECRET --env production # Get from auth0 account
wrangler secret put SALT --env production # open `https://csprng.xyz/v1/api` in the browser and use the value of `Data`
wrangler publish --env production
```

## `site` Usage

### Local development
```bash
cd site
yarn install
yarn start
```

### Deploy
`yarn deploy`
