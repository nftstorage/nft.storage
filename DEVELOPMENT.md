# nft.storage Developer's Guide

This doc should contain everything you need to know to get a working development environment up and running. If it doesn't and you know what's missing, please open a PR or issue to update the guide!

## Pre-requisites

You'll need at least the following:

- Node.js v16+
- [yarn](https://yarnpkg.com/)
- Docker
- A personal account at [Magic Link](https://magic.link).
  - You'll also need to create a new Magic Link "app" and take note of the secret and publishable keys.

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
3. Run locally by starting the following processes.
   1. API server (`yarn dev:api`).
   2. Web server (`yarn dev:website`).

The site should now be available at http://localhost:4000

_NOTE_ Github login does not work locally because the oauth settings don't whitelist localhost:4000.

## Local environment configuration

In the root folder, copy the `.env.tpl` template file to a new file named `.env`.

Edit the `.env` file and change the value of the `MAGIC_SECRET_KEY` variable to the secret key for your Magic Link app.

In `packages/website`, create a file called `.env.local` with the following content, filling in the value of your Magic Link publishable API key:

```
NEXT_PUBLIC_MAGIC=<your-magic-link-publishable-key>
```

## Production Environment Variables

See below for the full list of environment variables that need to be set in production. If you're manually deploying or running cron jobs locally, you may need to add these to your env file.

The vars below are used by the API and/or GitHub cron actions and should be set in GitHub Actions secrets.

| Variable name               | Description                                            | Sensible default (if any)                |
| --------------------------- | ------------------------------------------------------ | ---------------------------------------- |
| CF_TOKEN                    | CloudFlare API token                                   |                                          |
| CF_ACCOUNT_ID               | CloudFlare account id                                  |                                          |
| CLUSTER1_API_URL            | API URL for cluster node 1                             | https://nft.storage.ipfscluster.io/api/  |
| CLUSTER1_BASIC_AUTH_TOKEN   | Auth token for cluster node 1                          |                                          |
| CLUSTER2_API_URL            | API URL for cluster node 2                             | https://nft2.storage.ipfscluster.io/api/ |
| CLUSTER2_BASIC_AUTH_TOKEN   | Auth token for cluster node 2                          |                                          |
| CLUSTER3_API_URL            | API URL for cluster node 3                             | https://nft3.storage.ipfscluster.io/api/ |
| CLUSTER3_BASIC_AUTH_TOKEN   | Auth token for cluster node 3                          |                                          |
| PROD_DATABASE_URL           | Endpoint for production Postgrest API                  | https://db.nft.storage                   |
| PROD_DATABASE_TOKEN         | Auth token for production Postgrest API                |                                          |
| STAGING_DATABASE_URL        | Endpoint for staging Postgrest API                     | https://db-staging.nft.storage           |
| STAGING_DATABASE_TOKEN      | Auth token for staging Postgrest API                   |                                          |
| PROD_DATABASE_CONNECTION    | Connection string for prodction db (used by cron jobs) |                                          |
| STAGING_DATABASE_CONNECTION | Connection string for staging db (used by cron jobs)   |                                          |
| DAG_CARGO_HOST              | Endpoint for dag cargo API                             |                                          |
| DAG_CARGO_DATABASE          | dag cargo database name                                |                                          |
| DAG_CARGO_USER              | dag cargo db username                                  |                                          |
| DAG_CARGO_PASSWORD          | dag cargo db password                                  |                                          |
| PRIAVTE_KEY                 | UCAN private key, run `npx ucan-storage keypair`       |                                          |

The frontend also needs some environment variables for staging and production deployments, which should be set as CloudFlare Pages secrets.

| Variable name          | Description                                                  | Sensible default (if any) |
| ---------------------- | ------------------------------------------------------------ | ------------------------- |
| NEXT_PUBLIC_ENV        | Name of runtime environment, (e.g. dev, staging, production) | production                |
| NEXT_PUBLIC_API        | Endpoint for nft.storage API                                 | https://api.nft.storage   |
| NEXT_PUBLIC_MAGIC      | Publishable Magic Link API key for current env               |                           |
| NEXT_PUBLIC_SENTRY_DSN | Sentry [Data Source Name][sentry-docs-dsn]                   |                           |
| SENTRY_URL             | Sentry base URL                                              | https://sentry.io         |
| SENTRY_ORG             | Sentry org name                                              |                           |
| SENTRY_PROJECT         | Sentry project name                                          |                           |
| SENTRY_AUTH_TOKEN      | Sentry auth token                                            |                           |

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

[sentry-docs-dsn]: https://docs.sentry.io/product/sentry-basics/dsn-explainer/
