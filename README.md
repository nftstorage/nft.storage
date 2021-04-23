# [nft.storage](https://nft.storage) <!-- omit in toc -->

Free decentralized storage and bandwidth for NFTs on IPFS and Filecoin BETA.

<a href="https://nft.storage"><img src="https://raw.githubusercontent.com/ipfs-shipyard/nft.storage/main/screenshot.png" alt="nft.storage screenshot" /></a>

# Table of Contents <!-- omit in toc -->

- [JS client library](#js-client-library)
- [HTTP API](#http-api)
- [`site` Setup](#site-setup)
  - [Cloudflare Workers CLI](#cloudflare-workers-cli)
  - [Auth0 account](#auth0-account)
  - [Cloudflare Workers initial setup:](#cloudflare-workers-initial-setup)
    - [Development Setup](#development-setup)
    - [Production Setup `[env.production]`](#production-setup-envproduction)
- [`site` Usage](#site-usage)
  - [Local development](#local-development)
  - [Deploy](#deploy)

## JS client library

Check out the [JS client library documentation](https://github.com/ipfs-shipyard/nft.storage/tree/main/client).

## HTTP API

[Documentation for the HTTP API](https://nft.storage/api-docs).

## `site` Setup

### Cloudflare Workers CLI

```bash
yarn global add @cloudflare/wrangler
wrangler login
# when using personal accounts you may need to manually change the `account_id` inside `wrangler.toml`
```

### Auth0 account

Go to [auth0.com](https://auth0.com) and create an account. Create two "REGULAR WEB APPLICATION" applications one for dev and another for production. In the "settings" of each application you will find the secrets needed to complete the initial setup.

Go to "settings" for your dev application and add the following URLs:

- "Allowed Callback URLs": `http://127.0.0.1:8787/auth`
- "Allowed Web Origins": `http://127.0.0.1:8787`

Do the same for your production application, with the appropriate URLs.

### IPFS Cluster

The nft.storage site talks to IPFS Cluster. You need to run a cluster locally and make it accessible from the internet for development.

Follow the quickstart guide to get an IPFS Cluster up and running: https://cluster.ipfs.io/documentation/quickstart/

Expose the IPFS Proxy by opening the `docker-compose.yml` file and add:

```yaml
CLUSTER_IPFSPROXY_NODEMULTIADDRESS: /dns4/ipfs0/tcp/5001
CLUSTER_IPFSPROXY_LISTENMULTIADDRESS: /ip4/0.0.0.0/tcp/9095
```

...to the `custer0` _environment_ and add:

```yaml
- '127.0.0.1:9095:9095'
```

...to the `cluster0` _ports_. Then restart for the changes to take effect.

Install [localtunnel](https://localtunnel.me/) and expose the IPFS Cluster HTTP API and IPFS Proxy API (replacing "USER" with your name):

```
npm install -g localtunnel
lt --port 9094 --subdomain USER-cluster-api-nft-storage
lt --port 9095 --subdomain USER-ipfs-proxy-api-nft-storage
```

These two URLs should be used for `CLUSTER_API_URL` and `CLUSTER_IPFS_PROXY_API_URL` in the `wrangler.toml` (see below).

There is an npm script you can use to quickly establish these tunnels during development:

```sh
npm run lt
```

### Cloudflare Workers initial setup:

> This only needs to be run once when setting up from scratch.

#### Development Setup

Open `wrangler.toml` and add an env for yourself (replacing "USER" with your name and "CF_ACCOUNT" with your Cloudflare account):

```toml
[env.USER]
type = "webpack"
name = "nft-storage-USER"
account_id = "CF_ACCOUNT"
workers_dev = true
route = ""
zone_id = ""
vars = { AUTH0_CALLBACK_URL = "http://127.0.0.1:8787/auth", DEBUG = true, CLUSTER_API_URL = "", CLUSTER_IPFS_PROXY_API_URL = "" }
kv_namespaces = []
```

Additionally, fill in the `CLUSTER_API_URL` and `CLUSTER_IPFS_PROXY_API_URL` with the localtunnel URLs you obtained when setting up the IPFS Cluster.

```bash
cd site
yarn install
# dev and preview KVs
wrangler kv:namespace create USERS --preview --env USER
# cli output something like: `{ binding = "USERS", preview_id = "7e441603d1bc4d5a87f6cecb959018e4" }`
# but you need to put `{ binding = "USERS", preview_id = "7e441603d1bc4d5a87f6cecb959018e4", id = "7e441603d1bc4d5a87f6cecb959018e4" }` inside the `kv_namespaces`.
wrangler kv:namespace create SESSION --preview --env USER
# same as above
wrangler kv:namespace create CSRF --preview --env USER
# same as above
wrangler kv:namespace create NFTS --preview --env USER
# same as above
wrangler kv:namespace create DEALS --preview --env USER
# same as above
wrangler kv:namespace create METRICS --preview --env USER
# same as above
```

Go to `/site/src/constants.js` _uncomment_ the first line and run `wrangler publish --env USER`.

```bash
# dev and preview secrets
wrangler secret put AUTH0_DOMAIN --env USER # Get from auth0 account
wrangler secret put AUTH0_CLIENT_ID --env USER # Get from auth0 account
wrangler secret put AUTH0_CLIENT_SECRET --env USER # Get from auth0 account
wrangler secret put SALT --env USER # open `https://csprng.xyz/v1/api` in the browser and use the value of `Data`
wrangler secret put PINATA_JWT --env USER # Get from Pinata
```

Go to `/site/src/constants.js` _comment_ the first line and run `wrangler publish --env USER`.

#### Production Setup `[env.production]`

```bash
# production KVs
wrangler kv:namespace create USERS --env production
# Follow the instructions from the cli output
wrangler kv:namespace create SESSION --env production
# Follow the instructions from the cli output
wrangler kv:namespace create CSRF --env production
# Follow the instructions from the cli output
wrangler kv:namespace create NFTS --env production
# Follow the instructions from the cli output
wrangler kv:namespace create DEALS --env production
# Follow the instructions from the cli output
wrangler kv:namespace create METRICS --env production
# Follow the instructions from the cli output
wrangler secret put AUTH0_DOMAIN --env production # Get from auth0 account
wrangler secret put AUTH0_CLIENT_ID --env production # Get from auth0 account
wrangler secret put AUTH0_CLIENT_SECRET --env production # Get from auth0 account
wrangler secret put SALT --env production # open `https://csprng.xyz/v1/api` in the browser and use the value of `Data`
wrangler secret put PINATA_JWT --env production # Get from Pinata
wrangler secret put CLUSTER_BASIC_AUTH_TOKEN --env production # Get from nft.storage vault in 1password
wrangler secret put CLUSTER_IPFS_PROXY_BASIC_AUTH_TOKEN --env production # Get from nft.storage vault in 1password
wrangler publish --env production
```

## `site` Usage

### Local development

```bash
cd site
yarn install
yarn dev
```

### Deploy

```bash
yarn deploy
```

## Contributing

Feel free to join in. All welcome. [Open an issue](https://github.com/ipfs-shipyard/nft.storage/issues)!

## License

Dual-licensed under [MIT](https://github.com/ipfs-shipyard/nft.storage/blob/main/LICENSE-MIT) + [Apache 2.0](https://github.com/ipfs-shipyard/nft.storage/blob/main/LICENSE-APACHE)
