# Usage

Create a `.env.local` file with the following

```text
CF_TOKEN=<cloudflare token>
CF_ACCOUNT_ID=<cloudflare account id>
NFT_STORAGE_TOKEN=<nft.storage token>
CLUSTER_TOKEN=<ipfs cluster token>
```

Put the LevelDB folder inside this folder with the name `nft-meta` and run the cli

```bash
node cli.js
```
