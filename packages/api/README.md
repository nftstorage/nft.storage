# API

The nft.storage public API.

## Usage

See [DEVELOPMENT.md](../../DEVELOPMENT.md) in the project root, and follow step 1 and 2 from the [Getting started section](../../DEVELOPMENT.md#getting-started).

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

### Dev CLI scripts

The `packages/api/scripts` directory contains a small `cli.js` utility script for building the API workers and managing the local development database. These scripts are invoked automatically when running `yarn dev` but may also be useful to run manually when debugging, etc.

Running `node scripts/cli.js services` gives you some knobs for controlling the state of the local services:

- `services start` starts the docker-compose setup
- `services stop` stops all running containers
- `services stop --clean` as above, but also removes all docker containers, volumes, and other artifacts

Each of the above can have a `--project` flag added, which sets the name of the [docker-compose project](https://docs.docker.com/compose/#multiple-isolated-environments-on-a-single-host). This can be useful if you want to create a custom environment that won't be automatically reset.

The `db-sql` subcommand populates the database schema, using the `.sql` files in `packages/api/db` as a source of truth.

For local development, you probably want `cli.js db-sql --reset --cargo --testing`, which will reset everything to a clean state.

The `--cargo` flag adds support for querying foreign tables provided by the [dagcargo](https://github.com/nftstorage/dagcargo) database. In production this will set up a [foreign data wrapper](https://wiki.postgresql.org/wiki/Foreign_data_wrappers) to a live database using credentials from the environment. For local development, you should set the `--testing` flag as well, which seeds the db with test data instead of importing from a live host.

The `minio` subcommand allows simple management of Minio buckets.

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
wrangler secret put SENTRY_DSN --env USER # Get from Sentry
wrangler secret put DATABASE_TOKEN --env production # Get from database account
wrangler secret put CLUSTER_BASIC_AUTH_TOKEN --env production # Get from nft.storage vault in 1password
wrangler secret put CLUSTER_SERVICE --env production # Which cluster should be used. Options 'IpfsCluster' / 'IpfsCluster2' / 'IpfsCluster3'
wrangler secret put MAILCHIMP_API_KEY --env production # Get from mailchimp
wrangler secret put LOGTAIL_TOKEN --env production # Get from Logtail
wrangler secret put METAPLEX_AUTH_TOKEN --env production # User ID meteplex endpoint should use (not required for dev)
wrangler secret put S3_REGION --env production # e.g us-east-2 (not required for dev)
wrangler secret put S3_ACCESS_KEY_ID --env production # Get from Amazon S3 (not required for dev)
wrangler secret put S3_SECRET_ACCESS_KEY --env production # Get from Amazon S3 (not required for dev)
wrangler secret put S3_BUCKET_NAME --env production # e.g nft.storage-staging-us-east-2 (not required for dev)
wrangler secret put PRIVATE_KEY --env production # Get from 1password
wrangler secret put MAINTENANCE_MODE --env production # default value is "rw"

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

## DB Types

The postgres rest api can generate automatic type defs based on the table and column
names. To use this, make sure you've spun down your nft dev environment and run
`yarn db-types` from packages/api root directory. This will auto generate the
`packages/api/utils/db-types.d.ts` file.

Common errors would be "cannot read version of schema", this typically indicates that another service running on localhost:3000 which is the default port and url for the postgres rest api.

## S3 Setup

We use [S3](https://aws.amazon.com/s3/) for backup and disaster recovery. For production deployment an account on AWS is required.
