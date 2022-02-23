<h1 align="center">
  <a href="https://nft.storage"><img width="75%" src="https://nft.storage/images/logo-nft.storage.svg" alt="NFT.Storage logo" /></a>
</h1>

<h3 align="center">Free decentralized storage and bandwidth for NFTs on IPFS and Filecoin.</h3>

<p align="center">
  <a href="https://discord.com/channels/806902334369824788/831502708082081822"><img src="https://img.shields.io/badge/chat-discord?style=for-the-badge&logo=discord&label=discord&logoColor=ffffff&color=7389D8" /></a>
  <a href="https://twitter.com/nft_storage"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/nft_storage?color=00aced&label=twitter&logo=twitter&style=for-the-badge"></a>
</p>

# Table of Contents <!-- omit in toc -->

- [Client Libraries](#client-libraries)
- [HTTP API](#http-api)
- [Developer Tools](#developer-tools)
- [Development](#development)
  - [Getting Started](#getting-started)
  - [Local environment configuration](#local-environment-configuration)
  - [Release](#release)
    - [What's a Release PR?](#whats-a-release-pr)
    - [How should I write my commits?](#how-should-i-write-my-commits)
- [Contributing](#contributing)
- [License](#license)

# Client Libraries

The JS client library is the official and supported client to nft.storage. Other libraries listed have been generated from the [OpenAPI schema](https://nft.storage/schema.yml) and are experimental, unsupported and may not work at all!

- [JavaScript](https://github.com/nftstorage/nft.storage/tree/main/packages/client)
- [Go](https://github.com/nftstorage/go-client) (Generated from OpenAPI schema)
- [Java](https://github.com/nftstorage/java-client) (Generated from OpenAPI schema)
- [PHP](https://github.com/nftstorage/php-client) (Generated from OpenAPI schema)
- [Python](https://github.com/nftstorage/python-client) (Generated from OpenAPI schema)
- [Ruby](https://github.com/nftstorage/ruby-client) (Generated from OpenAPI schema)
- [Rust](https://github.com/nftstorage/rust-client) (Generated from OpenAPI schema)
- [Unity (C#)](https://github.com/filipepolizel/unity-nft-storage)

# HTTP API

Check out the [HTTP API documentation](https://nft.storage/api-docs).

# Developer Tools

We've created some scripts to help developers with bulk imports, status checks, file listings and more:

https://github.com/nftstorage/nft.storage-tools

# Development

Instructions for developers working on the nft.storage API and website.

_psst: want to do some frontend work done without an environment? check out [this guide](packages/website/README.md#no-environment-guide)_

## Getting Started

We use `yarn` in this project and commit the `yarn.lock` file.

1. Install dependencies.
   ```bash
   # install all dependencies in the mono-repo
   yarn
   # setup git hooks
   npx simple-git-hooks
   ```
2. Setup your local environment with a `.env` file. See [intructions](#local-environment-configuration).
3. Follow the getting started guides in [`/packages/api`](/packages/api#usage) and [`/packages/website`](/packages/website#usage).
4. Run locally by starting the following processes.
   1. API server (`yarn dev` in `/packages/api`).
   2. Web server (`yarn dev` in `/packages/website`).

The site should now be available at http://localhost:4000

## Local environment configuration

In the root folder create a `.env` file with the following:

```ini

# Wrangler overrides
DEBUG=true

# API Secrets
# the salt is literally secret, not a random string, just 'secret'
SALT=secret
MAILCHIMP_API_KEY=secret
METAPLEX_AUTH_TOKEN=secret
# needs to be real so create a personal magic.link account or use the staging key
MAGIC_SECRET_KEY=secret
LOGTAIL_TOKEN=secret

## API Sentry
SENTRY_DSN=https://000000@0000000.ingest.sentry.io/00000
SENTRY_TOKEN=secret
SENTRY_UPLOAD=false

## API PostgREST
DATABASE_URL=http://localhost:3000
DATABASE_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoic2VydmljZV9yb2xlIn0.necIJaiP7X2T2QjGeV-FhpkizcNTX8HjDDBAxpgQTEI

# Postgres Database
DATABASE_CONNECTION=postgresql://postgres:postgres@localhost:5432/postgres

# Vars below this line are optional or can have fake values
# You only need to have real values if you are manually deploying or running cron jobs locally

# Cloudflare
CF_TOKEN=<token>
CF_ACCOUNT_ID=<account-id>

# IPFS Cluster
CLUSTER1_API_URL = https://nft.storage.ipfscluster.io/api/
CLUSTER1_BASIC_AUTH_TOKEN=<token>

CLUSTER2_API_URL = https://nft2.storage.ipfscluster.io/api/
CLUSTER2_BASIC_AUTH_TOKEN=<token>

CLUSTER3_API_URL = https://nft3.storage.ipfscluster.io/api/
CLUSTER3_BASIC_AUTH_TOKEN=<token>

# Postgrest
PROD_DATABASE_URL=https://db.nft.storage
PROD_DATABASE_TOKEN=<token>

STAGING_DATABASE_URL=https://db-staging.nft.storage
STAGING_DATABASE_TOKEN=<token>

# Postgres Database
PROD_DATABASE_CONNECTION=<connection-string>

STAGING_DATABASE_CONNECTION=<connection-string>

# Pinata
PINATA_JWT=<token>

# dag cargo
DAG_CARGO_HOST=<ip>
DAG_CARGO_DATABASE=<db-name>
DAG_CARGO_USER=<db-user>
DAG_CARGO_PASSWORD=<db-password>



# Pinning services api, requires a PSA allow list for authoritzation
# this is the user id in the database
PSA_ALLOW=1
```

Production vars should be set in Github Actions secrets.

## Release

[Release Please](https://github.com/googleapis/release-please) automates CHANGELOG generation, the creation of GitHub releases,
and version bumps for our packages. Release Please does so by parsing your
git history, looking for [Conventional Commit messages](https://www.conventionalcommits.org/),
and creating release PRs.

### What's a Release PR?

Rather than continuously releasing what's landed to our default branch, release-please maintains Release PRs:

These Release PRs are kept up-to-date as additional work is merged. When we're ready to tag a release, we simply merge the release PR.

When the release PR is merged the release job is triggered to create a new tag, a new github release and run other package specific jobs. Only merge ONE release PR at a time and wait for CI to finish before merging another.

Release PRs are created individually for each package in the mono repo.

### How should I write my commits?

Release Please assumes you are using [Conventional Commit messages](https://www.conventionalcommits.org/).

The most important prefixes you should have in mind are:

- `fix:` which represents bug fixes, and correlates to a [SemVer](https://semver.org/)
  patch.
- `feat:` which represents a new feature, and correlates to a SemVer minor.
- `feat!:`, or `fix!:`, `refactor!:`, etc., which represent a breaking change
  (indicated by the `!`) and will result in a SemVer major.

# Contributing

Feel free to join in. All welcome. [Open an issue](https://github.com/nftstorage/nft.storage/issues)!

# License

Dual-licensed under [MIT](https://github.com/nftstorage/nft.storage/blob/main/LICENSE-MIT) + [Apache 2.0](https://github.com/nftstorage/nft.storage/blob/main/LICENSE-APACHE)
