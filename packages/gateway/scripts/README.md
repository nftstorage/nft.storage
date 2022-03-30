# Gateway CLI

# `denylist add`

Add a CID (or CID + path) to the local deny list. Note: we currently DO NOT support denying by CID + path in the API.

Usage:

```sh
node scripts/cli.js denylist add <cid> --status 410 --reason bad
```

Note that `--status` and `--reason` are optional. The default HTTP status is `410` with no reason.

# `denylist sync`

Reads `wrangler.toml` to pick out the correct KV to write to based on the passed `--env` value.

Requires a Cloudflare API token (as an environment variable) in order to write entries.

Usage:

```sh
CF_API_TOKEN=<token> node scripts/cli.js denylist sync --env production
```

It reads from the local `denylist.json` as well as the [badbits denylist](https://badbits.dwebops.pub/denylist.json). Sources can be updated in `denylist.js`.
