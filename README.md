<h1 align="center">
  <a href="https://nft.storage"><img width="75%" src="https://user-images.githubusercontent.com/11778450/227269341-b2d804a7-1829-426c-9caa-ec519f98dc9c.png" alt="NFT.Storage logo" /></a>
</h1>

<h3 align="center">Free decentralized storage and bandwidth for NFTs on IPFS and Filecoin.</h3>

<p align="center">
  <a href="https://discord.com/channels/806902334369824788/831502708082081822"><img src="https://img.shields.io/badge/chat-discord?style=for-the-badge&logo=discord&label=discord&logoColor=ffffff&color=7389D8" /></a>
  <a href="https://twitter.com/nft_storage"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/nft_storage?color=00aced&label=twitter&logo=twitter&style=for-the-badge"></a>
</p>

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
