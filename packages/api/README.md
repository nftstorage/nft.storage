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
wrangler secret put PICKUP_BASIC_AUTH_TOKEN --env production # Get from nft.storage vault in 1password
wrangler secret put MAILCHIMP_API_KEY --env production # Get from mailchimp
wrangler secret put LOGTAIL_TOKEN --env production # Get from Logtail
wrangler secret put METAPLEX_AUTH_TOKEN --env production # User ID meteplex endpoint should use (not required for dev)
wrangler secret put S3_REGION --env production # e.g us-east-2 (not required for dev)
wrangler secret put S3_ACCESS_KEY_ID --env production # Get from Amazon S3 (not required for dev)
wrangler secret put S3_SECRET_ACCESS_KEY --env production # Get from Amazon S3 (not required for dev)
wrangler secret put S3_BUCKET_NAME --env production # e.g nft.storage-staging-us-east-2 (not required for dev)
wrangler secret put PRIVATE_KEY --env production # Get from 1password
wrangler secret put MAINTENANCE_MODE --env production # default value is "rw"
wrangler secret put LINKDEX_URL --env production # URL for linkdex-api that can read the prod s3 bucket

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

## Linkdex

Our linkdex service determines if a user has uploaded a "Complete" DAG where it was split over multiple patial CARs. During CAR uplaod we query it with the S3 key _after_ writing the CAR to the bucket.

The `env.LINKDEX_URL` points to the service to use. It should be for a linkdex-api deployment that has read access to the same s3 bucket as is used for uploads.

It iterates all the blocks in all the CARs for that users uploads only, and where every link is a CID for a block contained in the CARs, we say the DAG is "Complete". If not, it's "Patial". If we haven't checked or any of the blocks are undecodable with the set of codecs we have currently, then it's "Unknown".

see: https://github.com/web3-storage/linkdex-api

## CARPARK

We write Uploaded CARs to both S3 and R2 in parallel. The R2 Bucket is bound to the worker as `env.CARPARK`. The API docs for an R2Bucket instance are here: https://developers.cloudflare.com/r2/runtime-apis/#bucket-method-definitions

We key our R2 uploads by CAR CID, and record them in the DB under `upload.backup_urls`. The URL prefix for CARs in R2 is set by the `env.CARPARK_URL`. This is currently pointing to a subdomain on web3.storage which we could configure when we need direct http access to the bucket, but does not exist at time of writing.

## Pickup

We use [pickup](https://github.com/web3-storage/pickup) to fetch DAGs from IPFS and save them to a bucket where E-IPFS can index them. It provides a subset of the ipfs-cluster api for `GET /pins` and `POST /pins` that we use as the backend for the [pinning service](https://ipfs.github.io/pinning-services-api-spec/) implementation.

- `PICKUP_URL` defines the service enpoint to use, and is set in the wrangler.toml.
- `PICKUP_BASIC_AUTH_TOKEN` must be set as a secret in the env.

For local dev, we use a local ipfs-cluster container for the same service.

## w3up

Some uploads sent to nft.storage/api will be sent to up.web3.storage (aka 'w3up') for storage, serving on IPFS, and persistence to filecoin.

All uploads sent to w3up will be stored in the same web3.storage space configured by env var `W3_NFTSTORAGE_SPACE`.

### using console.web3.storage to browse uploads to w3up

You can use console.web3.storage to browse uploads in the W3_NFTSTORAGE_SPACE.

The DID used by your console.web3.storage session will need to be authorized to access the space.

The credentials used in staging/production are in the usual vault of secrets under 'w3up credentials'.

Run the cli command `w3up console ucan generate`

```shell
(
  cd packages/api
  node scripts/cli.js w3up console ucan generate
)
```

If you see a prompt like "ID of subject that should be authorized":

- you need to enter the ID of your console.web3.storage session. To get this, visit https://console.web3.storage/space/import. Look for "Send your DID to your friend". After that is a URI starting with `did:`. Copy that and enter it in the prompt.

If you see a prompt like "space recovery key mnemonic":

- look in the secrets vault for the mnemonic phrase labeled "Space Recovery Key". Copy that value into the prompt.

If you see a prompt like "What name do you want to appear in console.web3.storage when this space is
imported?":

- enter whatever name you want that will help you distinguish this space from other spaces listed in console.web3.storage.

If you see a prompt like "output ucan car to file /tmp/nftstorage-w3up-1712101390513.ucan.car?"

- hit enter or type 'Y' to confirm

Now a UCAN delegation has been written to a CAR file at a path like `/tmp/nftstorage-w3up-1712101390513.ucan.car`.

To add this delegation to console.web3.storage:

1. use a web browser to access https://console.web3.storage/space/import
2. Click 'Import UCAN'. This should open a file picker
3. Select the file generated from the last script, e.g. `/tmp/nftstorage-w3up-1712101390513.ucan.car`

You should see 'Added' and a list containing the space with the name you chose when generating the UCAN CAR. Click 'View' to view the contents of the Space.

After importing the space, it will also be listed in the space listing at https://console.web3.storage/.
