---
title: Mint NFTs on Solana with Metaplex
---

The [Solana](https://solana.com) blockchain is a high-performance, permissionless blockchain that has rapidly grown and found an enthusiastic community in the NFT space.

With NFT.Storage, you can upload all the off-chain data for your Solana NFTs, including images, videos, animations, and metadata, leveraging the power of [decentralized storage][concepts-decentralized-storage] to preserve your NFT data and make it available on the web.

You can even upload data for Solana NFTs without an NFT.Storage account! By using a signature from your Solana wallet, you (or your users, if you're building a platform) can make free uploads to NFT.Storage without an NFT.Storage API key.

This guide will focus on [Metaplex](https://metaplex.com), which is currently the most popular and fully featured NFT standard on Solana, enabling thousands of NFT projects. If you're using a different Solana program to mint your NFTs, the principles here will still apply, but you may need to use different tools and metadata conventions.

## Preparing your metadata

Metaplex NFTs consist 

- [ ] Link to metadata standard docs
- [ ] Walk through prepping folder of assets + metadata

## Using candy machine cli

- [ ] Pre-reqs (solana keypair, etc)
- [ ] How to install (link to official docs)
- [ ] How to set `nft-storage` config option
- [ ] How to optionally set `nftStorageKey` and why
  - why: so you can see the uploads in your account, etc
  - what happens if not: quick explainer about wallet sig auth
- [ ] What to do after uploading
  - give example of running candy-machine mint command
  - link to official metaplex minting docs

## Other options

- "can't someone else do it?"
    - [ ] link to Magic Eden
- "i want even more nerdy details / I'm a Solana wizard"
    - [ ] link to metaplex-auth lib, explain that you can use it with any Solana program / signing key


[concepts-decentralized-storage]: ../concepts/decentralized-storage/
[metaplex-docs-token-standard]: https://docs.metaplex.com/token-metadata/Versions/v1.0.0/nft-standard

