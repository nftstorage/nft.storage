# API

The nft.storage public API.

## Usage

Make sure you already did step 1 and 2 from these [root instructions](/#getting-started).

### Running Locally

Install docker and make sure that you have at least 8GB of RAM allocated.

```bash
cd packages/api
yarn dev
```

The database is pre populated with a single mock user. You can start making requests with this auth key:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY1MDA3QTczOWFiN0FDNWM1MzcxNjEyNDliODEyNTBFNDllMjg1M0MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTc1NDczNjYzOCwibmFtZSI6Im1haW4ifQ.wKwJIRXXHsgwVp8mOQp6r3_F4Lz5lnoAkgVP8wqwA_Y
```

### Clean/Reset docker

In the case you need to clean up docker after failed tests or debugging session you can just run the command below.

```bash
yarn clean
```

## Manual deploy to Cloudflare

```bash
yarn global add @cloudflare/wrangler
wrangler login
```

### Production Setup `[env.production]`

Go to `/packages/api/src/constants.js` _uncomment_ the first line and run `wrangler publish --env production`.

```bash
# production secrets
wrangler secret put MAGIC_SECRET_KEY --env production # Get from magic.link account
wrangler secret put SALT --env production # open `https://csprng.xyz/v1/api` in the browser and use the value of `Data`
wrangler secret put PINATA_JWT --env production # Get from Pinata
wrangler secret put SENTRY_DSN --env USER # Get from Sentry
wrangler secret put DATABASE_TOKEN --env production # Get from database account
wrangler secret put CLUSTER_BASIC_AUTH_TOKEN --env production # Get from nft.storage vault in 1password
wrangler secret put CLUSTER_SERVICE --env production # Which cluster should be used. Options 'IpfsCluster' / 'IpfsCluster2' / 'IpfsCluster3'
wrangler secret put MAILCHIMP_API_KEY --env production # Get from mailchimp
wrangler secret put LOGTAIL_TOKEN --env production # Get from Logtail
wrangler secret put PSA_ALLOW --env production # CSV user ID list, get from 1password vault
wrangler secret put METAPLEX_AUTH_TOKEN --env production # User ID meteplex endpoint should use (not required for dev)
wrangler secret put S3_REGION --env production # e.g us-east-2 (not required for dev)
wrangler secret put S3_ACCESS_KEY_ID --env production # Get from Amazon S3 (not required for dev)
wrangler secret put S3_SECRET_ACCESS_KEY --env production # Get from Amazon S3 (not required for dev)
wrangler secret put S3_BUCKET_NAME --env production # e.g nft.storage-staging-us-east-2 (not required for dev)
wrangler publish --env production
```

Go to `/packages/api/src/constants.js` _comment_ the first line and run `wrangler publish --env production`.

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
