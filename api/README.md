# API Server

### Setup

You will need to setup workers CLI tool by runnig:

```
yarn global add @cloudflare/wrangler
```

Current implementation stores IPFS content into https://pinata.cloud which requires pinata API token and you'll need to provide one by runnig:

```
wrangler secret put PINATA_TOKEN
```

Cloudfare workers requires account id. You can find yours by running:

```
wrangler whoami
```

You will need value under `Account ID` when interacting with `wrangler`.


### Local development

To develop you'll need to set `CF_ACCOUNT_ID` environment variable to a cloudfare account id (you can find your account id via command `wrangler whoami`).

> ```
> export CF_ACCOUNT_ID=${account_id}
> ``


```bash
yarn install
yarn start
```

### Publish

```
yarn publish
```

