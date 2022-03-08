# IPFS Gateways

NFT.Storage uses the [InterPlanetary File System (IPFS)](https://ipfs.io) as a key part of its [storage and retrieval infrastructure][concepts-decentralized-storage].

The IPFS network is a peer-to-peer network of computers that share resources to efficiently provide content to anyone that requests it. Computers that join the IPFS network use a protocol called [Bitswap][ipfs-docs-bitswap] to request and supply blocks of data using a hash-based Content Identifier (CID) to uniquely identify each block.

To make IPFS data accessible outside of the peer-to-peer network, [special IPFS nodes called "gateways"][ipfs-docs-gateway] act as bridges between the HTTP protocol that all web browsers understand and the peer-to-peer Bitswap protocol.

As more browsers like [Brave][brave-ipfs] and [Opera][opera-ipfs] adopt native IPFS support, the need for gateways will naturally lessen over time. Today, you can reach the widest audience by using HTTP gateways in your web applications, but it's a great idea to also surface the original `ipfs://` URI for your content, so that IPFS-native browsers can access the content directly through Bitswap.

This guide collects some helpful information about gateways, including how and why to use the [NFT.Storage gateway](#the-nft-storage-gateway) available at `nftstorage.link`.

For more information about fetching content from gateways, see our [guide to data retrieval][howto-retrieve].

## The NFT.Storage gateway

Providing a great retrieval experience on the web is a key part of NFT.Storage's mission, as we work to make [decentralized data storage][concepts-decentralized-storage] the default choice for NFT creators.

To further this goal, we created a new HTTP gateway that uses existing public IPFS infrastructure and cloud-native caching strategies to provide a high-performance, CID-based HTTP retrieval solution that is NFT-focused.

### Architecture

The NFT.Storage gateway is effectively a caching layer that sits in front of several other public IPFS gateways and "races" them against each other to provide the fastest response possible to end-user requests.

This layered architecture has several benefits over using the "downstream" gateways directly. By using CloudFlare Workers to cache requests at the edge, the gateway can serve popular content quickly, while taking load off of the public IPFS gateways and peer-to-peer network.

Requests for content that are not cached are served by making parallel requests to multiple public IPFS gateways and returning the first valid response. This gives you the performance of the fastest downstream gateway, which may vary from time to time due to network conditions and the state of the gateway's own local cache.

Sending multiple requests also reduces the dependence on any single gateway and protects your app from experiencing degraded service if a gateway goes down for maintainence or has connectivity issues.

Since NFT.Storage also knows what content that is stored with the service, the NFT.Storage gateway can be optimized and will be most performant for data stored on NFT.Storage.

### Using the gateway

The NFT.Storage gateway is accessible at the URL `https://nftstorage.link`, and you can use it just by creating URLs with `nftstorage.link` as the host. 

We strongly recommend storing gateway-agnostic `ipfs://` URIs in your on-chain NFT records, so there should be no need to change anything at that layer to adopt the NFT.Storage gateway. In web applications and libraries that fetch and display NFTs, you can rewrite an `ipfs://` URI into a "path style" gateway link by replacing `ipfs://` with `https://nftstorage.link/ipfs/`.

The gateway supports both ["path style"](#path-style-urls) and ["subdomain style"](#subdomain-style-urls) URLs, although you must make sure that your HTTP client follows redirects when using "path style" URLs. For example, when using `curl`, make sure to add the `-L` flag to follow the `Location` header redirect:

```bash
curl -L https://nftstorage.link/ipfs/bafybeid4gwmvbza257a7rx52bheeplwlaogshu4rgse3eaudfkfm7tx2my/hi-gateway.txt
```

The gateway always redirects path-style URLs into subdomain-style URLs, so that web content served through the gateway can be isolated with the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy). In some cases, this may result in the CID being re-encoded to a format that's compatible with subdomain addressing. In particular, "version 0" CIDs beginning with `Qm` will be encoded to CID version 1 (`bafy...`) in the base32 string encoding. Although the encodings are different, the CIDs are still equivalent for the purposes of content identification and verification, and you can convert back into CIDv0 without losing any information.

You can avoid the redirect from path to subdomain URL by creating a [subdomain style URL](#subdomain-style-urls) directly, but you'll need to make sure that you're only using CIDv1, as CIDv0's case-sensitive encoding is incompatible with subdomain URLs. The NFT.Storage APIs always return CIDv1, but if you have other sources of IPFS CIDs you can [convert CIDv0 to v1][ipfs-docs-cid-convert] yourself before constructing the gateway URL.

### Rate limits

IPFS gateways are a public, shared resource, and they are often in high demand. To provide equitable access to all users, the NFT.Storage gateway imposes request limits on high-volume traffic sources.

The NFT.Storage gateway is currently rate limited to 200 requests per minute for a given IP address. In the event of a rate limit, the IP will be blocked for 30 seconds. 

## Types of gateway

The official [IPFS documentation on gateways][ipfs-docs-gateway] is helpful for understanding the types of gateways in the IPFS ecosystem and how they're used.

One of the key things to understand for our purposes is the different [resolution styles][ipfs-docs-gateway-resolution] that can be used to fetch content using gateway URLs.

If you check the [list of public gateways][public-gateway-checker], you'll see that some support "subdomain" style URLs, while others only support path-style URLs. Below is a short refresher on the distinction between the two styles. For more examples, see our [guide to retrieving NFT data from IPFS][howto-retrieve].

### Path style URLs

A "path style" URL puts the IPFS CID into the path portion of the gateway URL, like this:

<span className="overflow-wrap-breakword">
https://nftstorage.link/ipfs/bafkreied5tvfci25k5td56w4zgj3owxypjgvmpwj5n7cvzgp5t4ittatfy
</span>

If the CID points to a directory listing, you can append the name of a file within the directory to fetch the file:

<span className="overflow-wrap-breakword">
https://nftstorage.link/ipfs/bafybeid4gwmvbza257a7rx52bheeplwlaogshu4rgse3eaudfkfm7tx2my/hi-gateway.txt
</span>

### Subdomain style URLs

A "subdomain style" gateway URL puts the CID into the host portion of the URL, as a subdomain of the gateway host, like this:

<span className="overflow-wrap-breakword">
https://bafkreied5tvfci25k5td56w4zgj3owxypjgvmpwj5n7cvzgp5t4ittatfy.ipfs.nftstorage.link
</span>

If the CID points to a directory listing, you can use the path portion of the URL to specify the filename:

<span className="overflow-wrap-breakword">
https://bafybeid4gwmvbza257a7rx52bheeplwlaogshu4rgse3eaudfkfm7tx2my.ipfs.nftstorage.link/hi-gateway.txt
</span>

This is the preferred style for serving web assets over HTTP gateways, because web browsers provide security isolation on a per-domain basis. Using the subdomain style, every CID gets its own "namespace" for things like cookies and local storage, which isolates things from other web content stored on IPFS.


[concepts-decentralized-storage]: /docs/concepts/decentralized-storage/
[brave-ipfs]: https://brave.com/ipfs-support/
[opera-ipfs]: https://blogs.opera.com/tips-and-tricks/2021/02/opera-crypto-files-for-keeps-ipfs-unstoppable-domains/
[ipfs-docs-cid]: https://docs.ipfs.io/concepts/content-addressing
[ipfs-docs-cid-convert]: https://docs.ipfs.io/concepts/content-addressing/#cid-conversion
[ipfs-docs-gateway]: https://docs.ipfs.io/concepts/ipfs-gateway/
[ipfs-docs-gateway-resolution]: https://docs.ipfs.io/concepts/ipfs-gateway/#resolution-style
[ipfs-docs-bitswap]: https://docs.ipfs.io/concepts/bitswap/
[public-gateway-checker]: https://ipfs.github.io/public-gateway-checker/
[howto-retrieve]: /docs/how-to/retrieve
