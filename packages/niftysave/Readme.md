# Niftysave

Scans ethereum for [ERC-721][] Non-Fungible Tokens and replicates all assets
by saving them on [nft.storage][].

## Overview

### Ingestion

Cron job named `ERC721` runs periodically _(on github CI)_.
It performs following steps until it runs out of time and then exits:

1. Pull batch of tokens by querying [EIP721 Subgraph][].
2. Import pulled batchinto Fauna DB via `importERC721` GraphQL endpoint.

Fauna does most of the heavy lifting here, specifically `importERC721` User Defined Function (UDF) does following:

1. Stores each token owner into an `Owner` collection.
2. Stores each token contract into a `TokenContract` collection.
3. Stores actual token details _(`tokenID`, `tokenURI`, `mintTime`)_ in a `Token` collection.
4. Cross links all of the above _(so that graph can be queried in any direction)_.
5. Stores import result into `ERC721ImportResult` collection and cross-links with all the tokens it imported.
6. Updates the `Cursor` record (which is used next time around by the job to query subgraph from that position).

### Analysis

Cron job named `Token Metadata` runs runs periodically _(on github CI)_. It goes over tokens that were ingested and attempts to analyze token metadata assumed to be linked throug `tokenURI`. It pulls batch of not yet analyzed tokens from db via `findTokenAssets` GraphQL query and performs following steps concurrently across all tokens:

1. Parse `token.tokenURI`, if failed just report an error.
2. Fetch contents of URL (If it is `ipfs://` url or a IPFS gateway URL fetch from `https://ipfs.io/ipfs` otherwise from the actual URL). If failed report an error.
3. Parse contents as metadata JSON, if failed report an error.
4. Pin contents of `token.tokenURI` to IPFS cluster. (By CID if it was IPFS or IPFS Gateway URL otherwise by uploading content).
5. Pull out all the URLs found in metadata.
6. Submit metadata and all the linked assets to DB via `importTokenMetadata` GraphQL mutation.

As a result some tokens will be marked problematic due to errors reported and some will get associated entries in `Metadata` and `Resource` collections.

### Saving

Cron job named `Token Asset` runs periodically _(on github CI)_. It goes over discovered resources that were linked from token metadata and attempts to replicate them in IPFS cluster. It pulls batch of linked resources from db via `findResources` GraphQL query and concurrently save each one via following steps:

1. Parse `resource.uri`, on failure mark resource problematic.
2. If parsed URL is an `ipfs://` or IPFS gateway URL extract IPFS path and pin it on cluster.
3. If parsed URL is not recognized as above attempt to download content from it. If failed mark resource problematic.
4. Upload content to IPFS cluster for pinning.
5. Update `resource` in DB to include `cid` and `ipfsURL`.

[fauna-schema-migrate]: https://github.com/fauna-labs/fauna-schema-migrate
[erc-721]: https://eips.ethereum.org/EIPS/eip-721
[nft.storage]: https://nft.storage/
[eip721-subgraph]: https://thegraph.com/explorer/subgraph/nftstorage/eip721-subgraph
[fauna db]: https://fauna.com/
