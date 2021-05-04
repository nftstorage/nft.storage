# [nft.storage](https://nft.storage) <!-- omit in toc -->

Free decentralized storage and bandwidth for NFTs on IPFS and Filecoin BETA.

<a href="https://nft.storage"><img src="https://raw.githubusercontent.com/ipfs-shipyard/nft.storage/main/screenshot.png" alt="nft.storage screenshot" /></a>

# Table of Contents <!-- omit in toc -->

- [Client Libraries](#client-libraries)
- [HTTP API](#http-api)
- [Development](#development)
  - [`site` Setup](#site-setup)
    - [Local env vars](#local-env-vars)
    - [Cloudflare Workers CLI](#cloudflare-workers-cli)
    - [Magic.link account](#magiclink-account)
    - [IPFS Cluster](#ipfs-cluster)
    - [Cloudflare Workers initial setup:](#cloudflare-workers-initial-setup)
      - [Development Setup](#development-setup)
      - [Production Setup `[env.production]`](#production-setup-envproduction)
  - [`site` Usage](#site-usage)
    - [Local development](#local-development)
    - [Deploy](#deploy)
  - [`website` Setup](#website-setup)
  - [`website` Usage](#website-usage)
    - [Local development](#local-development-1)
  - [Contributing](#contributing)
  - [License](#license)

# Client Libraries

The JS client library is the official and supported client to nft.storage. Other libraries listed have been generated from the [OpenAPI schema](https://nft.storage/schema.yml) and are experimental, unsupported and may not work at all!

- [JavaScript](https://github.com/ipfs-shipyard/nft.storage/tree/main/client)
- [Go](https://github.com/nftstorage/go-client) (Generated from OpenAPI schema)
- [Java](https://github.com/nftstorage/java-client) (Generated from OpenAPI schema)
- [PHP](https://github.com/nftstorage/php-client) (Generated from OpenAPI schema)
- [Python](https://github.com/nftstorage/python-client) (Generated from OpenAPI schema)
- [Ruby](https://github.com/nftstorage/ruby-client) (Generated from OpenAPI schema)
- [Rust](https://github.com/nftstorage/rust-client) (Generated from OpenAPI schema)

# HTTP API

Check out the [HTTP API documentation](https://nft.storage/api-docs).

# Development

```bash
# install all dependencies in the mono-repo
yarn

# setup git hooks
npx simple-git-hooks
```

## `site` Setup

### Local env vars

Inside the `site` folder create a file called `.env.local` with the following content.

```ini
SENTRY_TOKEN=<sentry user auth token>
SENTRY_UPLOAD=false # toggle for sentry source/sourcemaps upload (capture will still work)
```

Production vars should set in Github Actions secrets.

### Cloudflare Workers CLI

```bash
yarn global add @cloudflare/wrangler
wrangler login
# when using personal accounts you may need to manually change the `account_id` inside `wrangler.toml`
```

### Magic.link account

Go to [magic.link](https://magic.link) and create an account. Create two applications one for dev and another for production. In the "settings" of each application you will find the secrets needed to complete the initial setup.

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
vars = { ENV = "dev", DEBUG = "*", CLUSTER_API_URL = "", CLUSTER_IPFS_PROXY_API_URL = "" }
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
wrangler kv:namespace create NFTS --preview --env USER
# same as above
wrangler kv:namespace create NFTS_IDX --preview --env USER
# same as above
wrangler kv:namespace create DEALS --preview --env USER
# same as above
wrangler kv:namespace create METRICS --preview --env USER
# same as above
wrangler kv:namespace create PINS --preview --env USER
# same as above
```

Go to `/site/src/constants.js` _uncomment_ the first line and run `wrangler publish --env USER`.

```bash
# dev and preview secrets
wrangler secret put MAGIC_SECRET_KEY --env USER # Get from magic.link account
wrangler secret put SALT --env USER # open `https://csprng.xyz/v1/api` in the browser and use the value of `Data`
wrangler secret put PINATA_JWT --env USER # Get from Pinata
wrangler secret put SENTRY_DSN --env USER # Get from Sentry
```

Go to `/site/src/constants.js` _comment_ the first line and run `wrangler publish --env USER`.

#### Production Setup `[env.production]`

```bash
# production KVs
wrangler kv:namespace create USERS --env production
# Follow the instructions from the cli output
wrangler kv:namespace create NFTS --env production
# Follow the instructions from the cli output
wrangler kv:namespace create NFTS_IDX --env production
# Follow the instructions from the cli output
wrangler kv:namespace create DEALS --env production
# Follow the instructions from the cli output
wrangler kv:namespace create METRICS --env production
# Follow the instructions from the cli output
wrangler kv:namespace create PINS --env production
# Follow the instructions from the cli output
wrangler secret put MAGIC_SECRET_KEY --env production # Get from magic.link account
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

Deployment should be done with github actions but in the case you need to manually test something you can run `yarn deploy` inside the `site` folder.

## `website` Setup

Inside the `website` folder create a file called `.env.local` with the following content.

```ini
NEXT_PUBLIC_ENV=dev
NEXT_PUBLIC_API=http://127.0.0.1:8787
NEXT_PUBLIC_MAGIC=<magic test mode publishable key>
NEXT_PUBLIC_SENTRY_DSN=<sentry dsn>
SENTRY_URL=https://sentry.io/
SENTRY_ORG=<sentry org name>
SENTRY_PROJECT=<sentry project name>
SENTRY_AUTH_TOKEN=<sentry auth token>
```

Production vars should set in Cloudflare Pages settings.

## `website` Usage

### Local development

```bash
cd site
yarn install
yarn dev
```

## Contributing

Feel free to join in. All welcome. [Open an issue](https://github.com/ipfs-shipyard/nft.storage/issues)!

## License

Dual-licensed under [MIT](https://github.com/ipfs-shipyard/nft.storage/blob/main/LICENSE-MIT) + [Apache 2.0](https://github.com/ipfs-shipyard/nft.storage/blob/main/LICENSE-APACHE)
