---
title: Mint NFTs on Solana with Metaplex
---

import Callout from 'nextra-theme-docs/callout';


The [Solana](https://solana.com) blockchain is a high-performance, permissionless blockchain that has rapidly grown and found an enthusiastic community in the NFT space.

With NFT.Storage, you can upload all the off-chain data for your Solana NFTs, including images, videos, animations, and metadata, leveraging the power of [decentralized storage][concepts-decentralized-storage] to preserve your NFT data and make it available on the web.

<!-- TODO: include this once https://github.com/metaplex-foundation/metaplex/pull/1757 is merged:

You can even upload data for Solana NFTs without an NFT.Storage account! By using a signature from your Solana wallet, you (or your users, if you're building a platform) can make free uploads to NFT.Storage without an NFT.Storage API key.
-->

At the most fundamental level, an NFT on Solana is defined by the Solana Program Library's [Token program](https://spl.solana.com/token), which enables the creation of both fungible and non-fungible tokens on Solana. While it's possible to [create NFTs through the Token program directly](https://spl.solana.com/token#example-create-a-non-fungible-token), tokens created in this way have no associated metadata or intrinsic "meaning", and are essentially just unique identifiers that can be owned by a Solana account.

To build feature-rich NFTs, the Solana community has developed standards on top of the basic NFT functionality provided by the Token program which allow "decorating" a token with metadata describing the token and its properties.

This guide will focus on [Metaplex](https://metaplex.com), which is currently the most popular and fully featured NFT standard on Solana, enabling thousands of NFT projects. If you're using a different Solana program to mint your NFTs, the principles here will still apply, but you may need to use different tools and metadata conventions.

## Metaplex NFT overview

Metaplex NFTs consist of a few pieces that work together to provide the complete "NFT experience".

First, an SPL token account is created using the SPL Token program with a supply of one (with zero decimals or "fractional tokens"), making the token non-fungible. This new account is referred to as the "token mint" and is controlled by the token creator's Solana account.

<Callout emoji="ℹ️">
As of version 1.1 of the [Metaplex Token Standard][metaplex-token-standard], Metaplex also supports "semi-fungible" tokens that can have a supply greater than one. These are called "Fungible Assets" in the Metaplex docs. We won't be covering them in this guide, but it's good to know they're there!
</Callout>

The newly created token account is then registered with the Metaplex [Token Metadata contract](http://docs.metaplex.com/architecture/deep_dive/overview), which stores some information about the token "on-chain" in a Solana account. The information stored on chain includes the name of the token, a short symbol, some information about the token creators and royalty splits, and a URI that points to a JSON document with more metadata.

The URI for the extended metadata is important, as the extended metadata contains all the information about the images and other media files associated with the NFT, as well as things like a description and whatever custom properties you might need.

## Preparing your metadata

The [Metaplex Token Standard][metaplex-token-standard] defines the standard metadata fields for Metaplex NFTs. This includes both the on-chain and off-chain components.

The on-chain metadata contains the public keys of the Solana accounts that are authorized to mint and update the NFT, as well as some infromation about whether the NFT has been sold, what collection it belongs to, and other pieces of "state" relating to the NFT.

The on-chain metadata also includes a `uri` field that links to a JSON document with details about the NFT, along with a few fields from the JSON metadata that are preserved on-chain, such as the `name` and `symbol`.

For this guide, we're mostly going to focus on the JSON document with the off-chain metadata. The parts relating to keys and ownership will be covered in the [Candy machine configuration](#candy-machine-configuration) section below.

This is the basic metadata format for a very simple Metaplex NFT:

```json
{
    "name": "NFT.Storage Example #0",
    "symbol": "NFTDOT",
    "description": "A text description of this NFT",
    "image": "0.png",
    "attributes": [
        {"trait_type": "edification", "value": "100"}
    ],
    "properties": {
        "creators": [
          {"address": "N4f6zftYsuu4yT7icsjLwh4i6pB1zvvKbseHj2NmSQw", "share": 100}
        ],
        "files": [
          {"uri": "0.png", "type": "image/png"}
        ]
    }
}
```

The `name`, `symbol`, and `description` fields are standard descriptive properties that allow you to attach a human-readable name and text description to the NFT, along with a short token symbol.

The `image` field specifies the filename of the main image for the NFT. Right now it points to a local file, `0.png`, which needs to be in the same directory as this JSON file. Once the image is uploaded to NFT.Storage, `0.png` will be replaced with a link to the uploaded file before the metadata is stored.

The `attributes` array allows you to tag your NFT with various "traits", the meaning of which is entirely up to you. For example, if you're writing a game, your NFT weapons might have a "damage" `trait_type` whose `value` corresponds to the attack power of the weapon. Some art NFTs may benefit "rarity" trait to indicate how relatively unique a given NFT is compared to its collection-mates.

Finally, the `properties` field is a home for any custom metadata you want to include, but it also contains two important sub-fields, `properties.creators` and `properties.files`. 

The `properties.creators` field lists the Solana wallet addresses of each of the NFT creators. Each entry in the `properties.creators` array has a `share` that indicates how much of the sale price will go to each creator. The total of all `share` entries must sum to 100, so if there's a single creator, its share should always be 100.

The `properties.files` array contains metadata about any files associated with the NFT. Most importantly, each entry in the array contains a `type` field with the MIME content type of the file.

All NFTs that include an `image` will have at least one entry in `properties.files` with a `uri` that is equal to the value of the `image` field. As with the `image` field, this example shows a local file path, but this will be replaced with the URL for the uploaded image once it has been stored with NFT.Storage.

Please note that this example does not show all possible metadata fields. Consult the [metadata standard][metaplex-metadata-standard] for the complete specification.

## Using candy machine cli

A Candy Machine is a Solana program that ...

### Pre-requisites

TODO: list pre-reqs:

- [ ] solana keypair (for devnet)
- [ ] airdrop devnet SOL to new wallet
- [ ] software needed:
  - [ ] solana cli tools
  - [ ] git
  - [ ] node
  - [ ] ts-node


### Candy machine configuration

- [ ] How to install (link to official docs)
- [ ] How to set `nft-storage` config option
- [ ] How to optionally set `nftStorageKey` and why
  - why: so you can see the uploads in your account, etc
  - what happens if not: quick explainer about wallet sig auth

### Uploading NFTs with Candy Machine

- [ ] show upload cli command and expected output
- [ ] show how to see new token in block explorer
- [ ] show how to see token metadata uri and verify metadata

### After uploading: next steps

- [ ] What to do after uploading
  - give example of running candy-machine mint command
  - mention candy machine UI
  - link to official metaplex minting docs

## Other options

- "can't someone else do it?"
    - [ ] link to Magic Eden
- "i want even more nerdy details / I'm a Solana wizard"
    - [ ] link to metaplex-auth lib, explain that you can use it with any Solana program / signing key


[concepts-decentralized-storage]: ../concepts/decentralized-storage/
[metaplex-docs-token-standard]: https://docs.metaplex.com/token-metadata/Versions/v1.0.0/nft-standard

[metaplex-token-standard]: https://docs.metaplex.com/token-metadata/specification
