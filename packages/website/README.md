# Website

Frontend build for the nft.storage website.

## Getting Started

Inside the `/packages/website` folder create a file called `.env.local` with the following content.

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

## Usage

### Running Locally

```bash
cd packages/website
yarn install
yarn dev
```
