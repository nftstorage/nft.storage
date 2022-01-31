# Website

Frontend build for the nft.storage website.

## Usage

Make sure you already did step 1 and 2 from these [instructions](/#getting-started).

### Local environment configuration

Inside the `/packages/website` folder create a file called `.env.local` with the following content.

```ini
NEXT_PUBLIC_ENV=dev
NEXT_PUBLIC_API=http://127.0.0.1:8787
NEXT_PUBLIC_MAGIC=<magic publishable key> # needs to be real so create a personal magic.link account or use the staging publishable key

# Vars below this line are optional or can have fake values
NEXT_PUBLIC_SENTRY_DSN=<sentry dsn>
SENTRY_URL=https://sentry.io/
SENTRY_ORG=<sentry org name>
SENTRY_PROJECT=<sentry project name>
SENTRY_AUTH_TOKEN=<sentry auth token>
```

Production vars should set in Cloudflare Pages settings.

### Running Locally

```bash
cd packages/website
yarn dev
```
