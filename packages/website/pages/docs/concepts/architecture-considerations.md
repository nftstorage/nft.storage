---
title: Architecture considerations
---

# Architecture considerations

When building tools and services that interact with NFT.Storage, there are a few things to keep in mind as you plan your project. This page collects some common patterns for interacting with NFT.Storage, including how to authenticate requests on behalf of your platform's users.

### Authentication and authorization

There are currently two methods of authenticating uploads to NFT.Storage, and which you choose will depend on the blockchain platform you'll be targeting, as well as your goals and overall service architecture.

#### API Keys

The most common way to authenticate is using an **API Key**, which can be generated on your [account management page](https://nft.storage/manage/) on the NFT.Storage website. Once you've generated a key, you can use it to authenticate the [JavaScript client][reference-js-client] or attach the key to an `Authentication` header in requests to the [HTTP API][reference-http].

While API keys are easy to use, they need to be protected and kept secret to avoid giving access to your NFT.Storage account. As a result, we strongly advise against including your API key in web apps or other client applications where the key may be exposed and potentially extracted and misused.

There are currently a few ways to provide access to NFT.Storage from your frontend code without exposing your API keys.

1. If you have a backend service, you can proxy upload requests through an endpoint that attaches your API key to the request after performing your own authentication.
1. Encourage your end users to sign up for a free NFT.Storage account, and prompt them for their API key. You can store the key in the browser's local storage or another durable location for future use and attach it to requests to the NFT.Storage service.
1. If you're minting on the Solana blockchain, see the section about [Solana wallet authentication](#solana-wallet-authentication) to see if it fits your use case.

### Solana wallet authentication

The [metaplex-auth](https://github.com/nftstorage/metaplex-auth) library provides an authentication mechanism for uploading NFT data to NFT.Storage using a signature from a [Solana](https://solana.com/) private key or browser wallet.

While originally designed for [Metaplex](https://www.metaplex.com/), the authentication system will work for any Solana program. Just set the `mintingAgent` option to the name of your platform or tool when using the library.

The auth mechanism works by packaging your upload into a [CAR file](./car-files.md) and calculating the root CID, which is included in a signed token payload. As a result, each upload will require a signature from the user's private key or wallet. If you want to upload several NFTs at once, you may be able reduce user friction by packaging them into one CAR, so that only one signature is required. See the [guide to CAR files](./car-files.md) for more on working with CARs.

Although the library is written in TypeScript, you don't need to use TypeScript or JavaScript to take advantage of the auth mechanism, provided you're willing to write a little bit of code to generate the proper token.

See [the spec document](https://github.com/nftstorage/metaplex-auth/blob/main/SPEC.md) to learn how to construct the self-signed tokens used by the metaplex-auth library. If you plan to do this, please [open an issue](https://github.com/nftstorage/metaplex-auth/issues) to let us know what you're working on, and we can help answer any questions you might have.

### Coming soon: public key authentication for all with UCAN

The Solana wallet-based authentication described above was intentionally designed to be specific to one blockchain, to limit the scope as we explored this problem space and avoid building an overly generic solution.

Meanwhile, we're continuing to work on a flexible public key based authentication mechanism for all users, regardless of the chain they intend to mint on. This work is currently in the design phase, building on the community-driven [User Controlled Authorization Network (UCAN)](https://whitepaper.fission.codes/access-control/ucan) standard and incorporating some things we've learned while building the Solana integration.

You can track the progress of this work by following [the "Signed uploads w/ UCAN" GitHub issue](https://github.com/nftstorage/nft.storage/issues/851). If you have feedback on the design, please comment on that issue and let us know. 

[reference-js-client]: https://nftstorage.github.io/nft.storage/client
[reference-http]: https://nft.storage/api-docs/