# Website

Frontend build for the nft.storage website.

## Getting Started

_If you'd like to get started with front end development quickly, and don't mind relying on CI server deploys, you can follow the [no environment guide](#no-environment-guide)_

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

## No Environment Guide

This guide should only be used if your environment isn't set up correctly, and you don't mind the ~10m turnaround time for Github CI.

If you choose to use this method, use your browsers devtools on the deployed code as much as possible, so you don't have to wait for CI to redeploy your code.

1. Create a draft PR in Github
   ![draft-pr](https://ipfs.io/ipfs/bafkreigm3edfjn33k632quahllx32s7wnq4ogqhf5i6vmjwsfis2wpwqwu)

1. Wait for CI to build your code.
   ![ci-build](https://ipfs.io/ipfs/bafkreigp5y4cn5xwkdr4gg5t26ao2r2vgeukxiatmfqfmen6mtb5lq276a)

1. Mess around with your browser's devtools, as usual.
   ![draft-pr](https://ipfs.io/ipfs/bafybeia5feaqq6npvwdd2jcnpfkwz3om4yqfkqbay356gzgeuef43p4jbu)
