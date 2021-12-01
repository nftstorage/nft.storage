# API

The nft.storage public API.

## Getting Started

### Local env vars

Follow instructions in the root `README.md`.

### Cloudflare Workers CLI

```bash
# when using personal accounts you may need to manually change the `account_id` inside `wrangler.toml`
yarn global add @cloudflare/wrangler
wrangler login
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

...to the `cluster0` _environment_ and add:

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
yarn lt
```

### Cloudflare Workers initial setup:

> This only needs to be run once when setting up from scratch.

#### Development Setup

Open `wrangler.toml` and add an env for yourself (replacing "USER" with your name and "CF_ACCOUNT" with your Cloudflare account):

```toml
[env.USER]
name = "nft-storage-USER"
account_id = "CF_ACCOUNT"
workers_dev = true
route = ""
zone_id = ""
kv_namespaces = []

[env.USER.vars]
ENV = "dev"
DEBUG = "*"
CLUSTER_API_URL = ""
DATABASE_URL = "http://localhost:8000"
```

Additionally, fill in the `CLUSTER_API_URL` with the localtunnel URLs you obtained when setting up the IPFS Cluster.

e.g.

```toml
CLUSTER_API_URL = "https://USER-cluster-api-nft-storage.loca.lt"
```

Now run the following to install dependencies and create KV namespaces on Cloudflare:

```bash
cd packages/api
yarn install
```

Go to `/packages/api/src/constants.js` _uncomment_ the first line and run `wrangler publish --env USER`.

```bash
# dev and preview secrets
wrangler secret put MAGIC_SECRET_KEY --env USER # Get from magic.link account
wrangler secret put SALT --env USER # open `https://csprng.xyz/v1/api` in the browser and use the value of `Data`
wrangler secret put PINATA_JWT --env USER # Get from Pinata
wrangler secret put SENTRY_DSN --env USER # Get from Sentry
wrangler secret put DATABASE_TOKEN --env USER # Get from database postgrest
```

Go to `/packages/api/src/constants.js` _comment_ the first line and run `wrangler publish --env USER`.

#### Production Setup `[env.production]`

```bash
# production secrets
wrangler secret put MAGIC_SECRET_KEY --env production # Get from magic.link account
wrangler secret put SALT --env production # open `https://csprng.xyz/v1/api` in the browser and use the value of `Data`
wrangler secret put PINATA_JWT --env production # Get from Pinata
wrangler secret put SENTRY_DSN --env USER # Get from Sentry
wrangler secret put DATABASE_TOKEN --env production # Get from database account
wrangler secret put CLUSTER_BASIC_AUTH_TOKEN --env production # Get from nft.storage vault in 1password
wrangler secret put CLUSTER_SERVICE --env production # Which cluster should be used. Options 'IpfsCluster' or 'IpfsCluster2'
wrangler secret put S3_REGION --env production # e.g us-east-2 (not required for dev)
wrangler secret put S3_ACCESS_KEY_ID --env production # Get from Amazon S3 (not required for dev)
wrangler secret put S3_SECRET_ACCESS_KEY --env production # Get from Amazon S3 (not required for dev)
wrangler secret put S3_BUCKET_NAME --env production # e.g nft.storage-staging-us-east-2 (not required for dev)
wrangler publish --env production
```

## Usage

### Running Locally

```bash
cd packages/api
yarn install
yarn dev --env USER
```

## Maintenance Mode

The API can be put into maintenance mode to prevent writes or prevent reads _and_ writes.

To change the maintenance mode for the API, issue the following command:

```sh
wrangler secret put MAINTENANCE_MODE --env production
```

When prompted for a value enter one of the following permission combinations:

- `--` = no reading or writing
- `r-` = read only mode
- `rw` = read and write (normal operation)

## S3 Setup

We use [S3](https://aws.amazon.com/s3/) for backup and disaster recovery. For production deployment an account on AWS is required.
