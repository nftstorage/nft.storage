# [nft.storage](https://nft.storage) <!-- omit in toc -->

Free decentralized storage and bandwidth for NFTs on IPFS and Filecoin.

<a href="https://nft.storage"><img src="https://raw.githubusercontent.com/nftstorage/nft.storage/main/screenshot.png" alt="nft.storage screenshot" /></a>

# Table of Contents <!-- omit in toc -->

- [Client Libraries](#client-libraries)
- [HTTP API](#http-api)
- [Developer Tools](#developer-tools)
- [Development](#development)
  - [Getting Started](#getting-started)
  - [Local environment configuration](#local-environment-configuration)
  - [Running Locally](#running-locally)
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
1. Follow the getting started guides in [`/packages/api`](/packages/api#getting-started) and [`/packages/website`](/packages/website#getting-started).
1. Run locally by following the instructions below.

## Local environment configuration

In the root folder create a `.env` file with the following:

```ini
# Cloudflare
CF_TOKEN=<token>
CF_ACCOUNT_ID=<account-id>

# IPFS Cluster
CLUSTER1_API_URL = https://nft.storage.ipfscluster.io/api/
CLUSTER1_BASIC_AUTH_TOKEN=<token>

CLUSTER2_API_URL = https://nft2.storage.ipfscluster.io/api/
CLUSTER2_BASIC_AUTH_TOKEN=<token>

# Postgrest API
DATABASE_URL=http://localhost:3000
# Create a token, for role "postgres", using secret value PGRST_JWT_SECRET from 'packages/api/db/docker/docker-compose.yml'
# https://postgrest.org/en/v8.0/tutorials/tut1.html#step-3-sign-a-token
DATABASE_TOKEN=<token>

PROD_DATABASE_URL=https://db.nft.storage
PROD_DATABASE_TOKEN=<token>

STAGING_DATABASE_URL=https://db-staging.nft.storage
STAGING_DATABASE_TOKEN=<token>

# Postgres Database
DATABASE_CONNECTION=postgresql://postgres:postgres@localhost:5432/postgres

PROD_DATABASE_CONNECTION=<connection-string>

STAGING_DATABASE_CONNECTION=<connection-string>

# Pinata
PINATA_JWT=<token>

# Sentry.io
SENTRY_DSN=<dsn>
SENTRY_TOKEN=<token>
# Note: tokens can be created here https://sentry.io/settings/account/api/auth-tokens/ and need the following scopes `event:admin` `event:read` `member:read` `org:read` `project:read` `project:releases` `team:read`.
SENTRY_UPLOAD=false # toggle for sentry source/sourcemaps upload (capture will still work)

# dag cargo
DAG_CARGO_HOST=<ip>
DAG_CARGO_DATABASE=<db-name>
DAG_CARGO_USER=<db-user>
DAG_CARGO_PASSWORD=<db-password>

```

Production vars should be set in Github Actions secrets.

## Running Locally

To run nft.storage locally, start the following processes:

1. Local IPFS Cluster (`docker-compose up` in your cluster home dir).
1. Localtunnel to expose cluster (`yarn lt` in `/packages/api`).
1. API server (`yarn dev --env USER` in `/packages/api`).
1. Web server (`yarn dev` in `/packages/website`).

The site should now be available at http://localhost:4000

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
