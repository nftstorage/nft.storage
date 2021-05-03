# nft.storage migrations

MVP migrations for KV data.

Create a `.env` and add:

```sh
CF_ACCOUNT=YOUR_ACCOUNT_ID
CF_TOKEN=YOUR_TOKEN
# Environment to run the migration on
ENV=dev # or "staging" or "production" (blank for "dev")
```

The token should have _edit_ access to KV stores.
