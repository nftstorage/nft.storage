<h1 align="center">
  <a href="https://nft.storage"><img width="75%" src="https://user-images.githubusercontent.com/11778450/227269341-b2d804a7-1829-426c-9caa-ec519f98dc9c.png" alt="NFT.Storage logo" /></a>
</h1>

<h3 align="center">Free decentralized storage and bandwidth for NFTs on IPFS and Filecoin.</h3>

<p align="center">
  <a href="https://twitter.com/nft_storage"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/nft_storage?color=00aced&label=twitter&logo=twitter&style=for-the-badge"></a>
</p>

## Product Decommission Notice

### Important Update

Hello from NFT.Storage!

As of June 30, 2024, we have officially decommissioned NFT.Storage Classic uploads. This means that NFT.Storage Classic, including NFTUp, the Classic web app, Classic APIs, Classic SDK, and Pinning API, will no longer accept new uploads/pins.

### What This Means for You

**Service Termination:** NFT.Storage Classic will no longer accept new uploads. However, retrieval of existing data remains operational.

**Data Access:** Don't forget, we're still keeping a copy of your NFT.Storage Classic data available in the NFT.Storage Gateway and in the decentralized Filecoin Network. However, over time, latency and availability may degrade.

**Support:** We’ll be working with the newly formed NFT.Storage community to determine what changes, if any, will impact NFT.Storage Classic data latency and availability in the future. Join the community [Join the community](https://nft.storage/join-us) to have your say. We will keep you informed by email and on Twitter/X.

### Transition to the New Version

For the new version of NFT.Storage, first mint your NFTs, then send us the NFT data—metadata and imagery CIDs, blockchain(s) minted on, contract address, and token IDs. We will preserve these in long-term Filecoin storage. Note that you need to upload the data to IPFS separately. Your NFTs will also be included in the NFT Token Checker, a tool for block explorers, marketplaces, and wallets to show verification that NFT collections, tokens, and CIDs are preserved by NFT.Storage.

### Recommended Hot Storage Alternatives

We’re excited to announce our partnerships with Pinata and Lighthouse for hot storage solutions. As an NFT.Storage user, you support our platform when you choose Pinata and Lighthouse and use our referral links, helping to sustain our valuable public goods. [Learn more here](https://nft.storage/blog/announcing-our-new-partnerships-with-pinata-and-lighthouse).

**Pinata:** Offers flexible plans and powerful, easy-to-use tools for managing your data on IPFS. Use code NFTSTORAGE50 at checkout to enjoy 50% off your first month. [Sign up today](https://pinata.cloud).

**Lighthouse:** An IPFS provider with unique payment options for NFT longevity. They offer affordability and flexibility for all your IPFS needs, including a pay-once and store-forever option. [Sign up today](https://lighthouse.storage).

### Contact Us

For any questions or assistance, contact us [contact us](https://nft.storage/contact-us). Together, we look forward to a promising future for NFT.Storage and the broader NFT ecosystem.

Best regards,  
The NFT.Storage Team



# Table of Contents <!-- omit in toc -->

- [Client Libraries](#client-libraries)
- [HTTP API](#http-api)
- [Developer Tools](#developer-tools)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

# Client Libraries

The JS client library is the official and supported client to nft.storage. Other libraries listed have been generated from the [OpenAPI schema](https://nft.storage/schema.yml) and are experimental, unsupported and may not work at all!

- [JavaScript](https://github.com/nftstorage/nft.storage/tree/main/packages/client)
- [Go](https://github.com/nftstorage/go-client) (Generated from OpenAPI schema)
- [Java](https://github.com/nftstorage/java-client) (Generated from OpenAPI schema)
- [PHP](https://github.com/nftstorage/php-client) (Generated from OpenAPI schema)
- [Python](https://github.com/nftstorage/python-client) (Generated from OpenAPI schema)
- [Ruby](https://github.com/nftstorage/ruby-client) (Generated from OpenAPI schema)
- [Rust](https://github.com/nftstorage/rust-client) (Generated from OpenAPI schema)
- [Unity (C#)](https://github.com/filipepolizel/unity-nft-storage)

# HTTP API

Check out the [HTTP API documentation](https://nft.storage/api-docs).

# Examples

See the [`examples`](./examples) directory in this repository for some example projects you can use to get started.

The [`examples/client`](./examples/client/) directory contains projects using the JS client library in the browser and node.js.

In [`examples/ucan-node`] you can find an example of using [`ucan.storage`](https://github.com/nftstorage/ucan.storage) for delegated authorization using [User Controlled Authorization Networks (UCAN)](https://ucan.xyz/).

# Developer Tools

We've created some scripts to help developers with bulk imports, status checks, file listings and more:

https://github.com/nftstorage/nft.storage-tools

# Development

Instructions for setting up a development environment can be found in [DEVELOPMENT.md](./DEVELOPMENT.md). Please [let us know](https://github.com/nftstorage/nft.storage/issues) if anything is missing.

# Contributing

Feel free to join in. All welcome. [Open an issue](https://github.com/nftstorage/nft.storage/issues)!

If you're opening a pull request, please see the [guidelines in DEVELOPMENT.md](./DEVELOPMENT.md#how-should-i-write-my-commits) on structuring your commit messages so that your PR will be compatible with our [release process](./DEVELOPMENT.md#release).

# License

Dual-licensed under [MIT + Apache 2.0](https://github.com/nftstorage/nft.storage/blob/main/LICENSE.md)
