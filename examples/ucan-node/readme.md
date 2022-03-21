# Basic upload using UCAN token

This example demonstrates how to use UCAN token to upload NFTs to nft.storage.

## How to use

### Get nft.storage API Key

Log into [nft.storage](https://nft.storage/login/) and create a new key.

### Generate a new keypair

```bash
npx ucan-storage keypair

# DID:           did:key:z6MkncJp3KFDXbQBkUvWh1KAvNT17BgVn2z5H6rgu5FGEr4n
# Public Key:    eS7Zw1paYB5S7+kHpD7xjSNBFHG21xoY6joKmoTXu3c=
# Private Key:   6f2RHSbE0ovpjLLn0vWI82ZgzxuRDR5sA36mH9+j3DA=
```

### Run the example

```bash
API_KEY=key_from_nft_storage PRIVATE_KEY=private_key_from_ucan_storage_cli node index.js
```

## Fork it locally

Run `create-nft-storage` to bootstrap the example:

```bash
npx create-nft-storage ucan-node
# or
yarn create nft-storage ucan-node

```

## Fork it in Codesandbox

[![Edit nftstorage/nft.storage: ucan-node](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/nftstorage/nft.storage/tree/feat%2Fcreate-example-ucan/examples/ucan-node?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark)
