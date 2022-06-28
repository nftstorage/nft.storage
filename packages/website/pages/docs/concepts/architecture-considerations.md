---
title: Architecture considerations
---


# Architecture considerations

When building tools and services that interact with NFT.Storage, there are a few things to keep in mind as you plan your project. This page collects some common patterns for interacting with NFT.Storage, including how to authenticate requests on behalf of your platform's users.

## Authentication and authorization

There are currently two methods of authenticating uploads to NFT.Storage, and which you choose will depend on the blockchain platform you'll be targeting, as well as your goals and overall service architecture.

### API Keys

The most common way to authenticate is using an **API Key**, which can be generated on your [account management page](https://nft.storage/manage/) on the NFT.Storage website. Once you've generated a key, you can use it to authenticate the [JavaScript client][reference-nftstorage-class] or attach the key to an `Authentication` header in requests to the [HTTP API][reference-http].

While API keys are easy to use, they need to be protected and kept secret to avoid giving access to your NFT.Storage account. As a result, we strongly advise against including your API key in web apps or other client applications where the key may be exposed and potentially extracted and misused.

There are currently a few ways to provide access to NFT.Storage from your frontend code without exposing your API keys.

1. If you have a backend service, you can proxy upload requests through an endpoint that attaches your API key to the request after performing your own authentication.
1. Encourage your end users to sign up for a free NFT.Storage account, and prompt them for their API key. You can store the key in the browser's local storage or another durable location for future use and attach it to requests to the NFT.Storage service.
1. If you're minting on the Solana blockchain, see the section about Solana wallet authentication to see if it fits your use case.

### Solana wallet authentication

The [metaplex-auth](https://github.com/nftstorage/metaplex-auth) library provides an authentication mechanism for uploading NFT data to NFT.Storage using a signature from a [Solana](https://solana.com/) private key or browser wallet.

While originally designed for [Metaplex](https://www.metaplex.com/), the authentication system will work for any Solana program. Just set the `mintingAgent` option to the name of your platform or tool when using the library.

The auth mechanism works by packaging your upload into a [CAR file](../car-files/) and calculating the root CID, which is included in a signed token payload. As a result, each upload will require a signature from the user's private key or wallet. If you want to upload several NFTs at once, you may be able reduce user friction by packaging them into one CAR, so that only one signature is required. See the [guide to CAR files](../car-files/) for more on working with CARs.

Although the library is written in TypeScript, you don't need to use TypeScript or JavaScript to take advantage of the auth mechanism, provided you're willing to write a little bit of code to generate the proper token.

See [the spec document](https://github.com/nftstorage/metaplex-auth/blob/main/SPEC.md) to learn how to construct the self-signed tokens used by the metaplex-auth library. If you plan to do this, please [open an issue](https://github.com/nftstorage/metaplex-auth/issues) to let us know what you're working on, and we can help answer any questions you might have.

### Coming soon: public key authentication for all with UCAN

The Solana wallet-based authentication described above was intentionally designed to be specific to one blockchain, to limit the scope as we explored this problem space and avoid building an overly generic solution.

Meanwhile, we're continuing to work on a flexible public key based authentication mechanism for all users, regardless of the chain they intend to mint on. This work is currently in the design phase, building on the community-driven [User Controlled Authorization Network (UCAN)](https://whitepaper.fission.codes/access-control/ucan) standard and incorporating some things we've learned while building the Solana integration.

You can track the progress of this work by following [the "Signed uploads w/ UCAN" GitHub issue](https://github.com/nftstorage/nft.storage/issues/851). If you have feedback on the design, please comment on that issue and let us know. 

## Retrieving data for end users

For NFT platforms that need to retrieve NFT data on behalf of others, there are a few things you can do to ensure a quality user experience.

When displaying an NFT that uses IPFS to link to off-chain data, you have several options for retrieval.

### HTTP gateways

IPFS is built around a peer-to-peer content sharing protocol that allows any computer to provide content to anyone that requests it. This provides [many benefits][concepts-decentralized-storage], but not all computing environments can fully support the peer-to-peer networking paradigm.

While some browsers like [Brave](https://brave.com) offer [native IPFS support][brave-ipfs], other browsers are restricted to HTTP and its related protocols, which makes engaging directly with the peer-to-peer protocol more difficult.

As a platform operator, you can support all browsers by using an IPFS gateway to serve NFTs to your users via HTTP. Because NFT.Storage and other services following [best practices for NFT data on IPFS][ipfs-docs-nft-best-practices] use `ipfs://` URLs instead of `https://`, your web application should support re-writing IPFS URLs to target the gateway of your choice.

See the section on [HTTP gateway URLs](https://docs.ipfs.io/how-to/best-practices-for-nft-data/#http-gateway-url) in the [best practices documentation][ipfs-docs-nft-best-practices] to learn about the structure of gateway URLs and how to create them from an `ipfs://` URL.

#### Gateways and centralization

It's important to note that gateways are a [point of centralization](https://docs.ipfs.io/concepts/ipfs-gateway/#centralization) that is under the control of the gateway operator. This is one reason why we strongly recommend storing gateway-agnostic `ipfs://` URLs in NFT metadata and especially in on-chain records, so that links aren't "tied" to a single provider.

As a platform operator, you can direct users to any IPFS gateway, including [public gateways][public-gateway-checker] run by [Protocol Labs](https://protocol.ai) and other organizations in the IPFS ecosystem.

Because public gateways are a shared resource, you may prefer to [run your own dedicated gateway](https://blog.stacktical.com/ipfs/gateway/dapp/2019/09/21/ipfs-server-google-cloud-platform.html) to provide a more consistent user experience. Thanks to the flexibility of content addressing, you can direct your platforms users to your own gateway in your application layer. Anyone not using your platform will still be able to fetch the data from any public gateway, but your users will get improved latency and reliability.

Another potential optimization is to store redundant copies of your NFT data on a traditional storage service and deliver them via HTTP. This side-steps the IPFS retrieval entirely and may be more performant in some cases, but you'll need to do some bookkeeping to keep track of the HTTP locations of each piece of data. When pursuing this option, we strongly recommend exposing the original `ipfs://` URLs to your users, so that they have multiple options for retrieval and aren't dependent on your custom HTTP service.


[reference-nftstorage-class]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html
[reference-http]: https://nft.storage/api-docs/
[brave-ipfs]: https://brave.com/ipfs-support/
[public-gateway-checker]: https://ipfs.github.io/public-gateway-checker/
