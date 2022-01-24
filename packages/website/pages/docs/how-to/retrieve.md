---
title: Retrieve NFT data from IPFS
---

# Retrieve NFT data from IPFS

import Callout from 'nextra-theme-docs/callout';

In this guide, you'll learn several methods for retrieving NFT data that's been stored with NFT.Storage.

All data stored using NFT.Storage is made available for retrieval via [IPFS](https://ipfs.io), the InterPlanetary File System. IPFS is a distributed, peer-to-peer network for storing and sharing content-addressed data. 

This guide will show a few approaches to fetching data from IPFS, broadly split up into [advice for end users and NFT collectors](#for-individuals-and-nft-collectors) and [recommendations for platforms and marketplaces](#for-platforms-and-marketplaces).

## For individuals and NFT collectors

If you've collected an NFT that uses IPFS, this guide can help you understand [how IPFS addresses work](#understanding-ipfs-addresses) and how to view your data [using HTTP gateways](#using-ipfs-http-gateways) or [native IPFS tools](#running-ipfs-on-your-computer).

You can also find out how to [make archival copies](#making-archival-copies-of-your-nft-data) of your NFT data using IPFS tools.

### Understanding IPFS addresses

IPFS uses a technique called [content addressing][ipfs-docs-concepts-cid] to uniquely identify each piece of data with a short string of characters called a Content ID (CID).

A CID usually looks something like this:

```
bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy
```

If your NFTs use [IPFS best practices][ipfs-docs-nft-best-practices], the link from the blockchain to your IPFS data will be in the form of a URI that looks like this:

```
ipfs://bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy
```

This is just a CID with an `ipfs://` prefix added to make it easy to identify as an IPFS CID and not some other kind of random-looking data.

Some IPFS addresses also have a **path** component following the CID, like this:

```
ipfs://bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy/amazing.gif
```

Here the `/amazing.gif` path points to an image file that's "inside" the IPFS directory with the CID `bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy`. 

URLs with the `ipfs://` prefix can be used directly with a browser that supports IPFS like [Brave](https://brave.com). Once you've [configured IPFS support][brave-ipfs], you can just paste an `ipfs://` URL into your address bar and see content in your browser.


For other options, see the sections below on [using HTTP gateways](#using-ipfs-http-gateways) and [running IPFS locally](#running-ipfs-on-your-computer).

<Callout emoji="💡">
See [IPFS addresses on the Web][ipfs-docs-web-addresses] in the IPFS docs for more details on the different ways to link to IPFS data.
</Callout>

### Using IPFS HTTP gateways

Above we saw some examples of [IPFS addresses](#understanding-ipfs-addresses) that use the `ipfs://` URL prefix.

You might also see HTTP links to IPFS content that look like this:

```
https://bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy.ipfs.dweb.link
```

or possibly in this form, with the CID in the path instead of the domain name:

```
https://dweb.link/ipfs/bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy
```

These are gateway URLs, which link to IPFS data using an HTTP gateway provider. Gateways provide a bridge between the peer-to-peer IPFS protocol and the HTTP protocol supported by all web browsers.

You can turn any `ipfs://` URL into a gateway URL by [choosing a gateway][public-gateway-checker] and replacing the `ipfs://` prefix with `https://<gateway-host>/ipfs/`. For example, to use the gateway at `dweb.link`, you could create the URL https://dweb.link/ipfs/bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy/amazing.gif. Clicking that link should take you to an image served by the gateway host.

### Running IPFS on your computer

If you want to interact with the IPFS peer-to-peer network directly, you can [install IPFS][ipfs-docs-install] on your computer.

{ /* TODO: add IPFS Desktop examples once we sort out the dag-cbor story
     see: https://github.com/ipfs/ipfs-desktop/issues/1962
  */ }


### Making archival copies of your NFT data

You can safeguard the data associated with your NFTs by downloading your collection to your own devices. This puts the data into your control and ensures that you're not dependent on any third party (including NFT.Storage!) for the longevity of your NFTs.

One of the great things about IPFS is that it allows anyone to provide a copy of a given piece of data, no matter who they are or where they're located. Because IPFS identifies files using a unique, verifiable [Content Identifier (CID)][ipfs-docs-concepts-cid], IPFS links aren't tied to a single server or domain name. This means that even if every copy of your NFT data were to disappear from the IPFS network, _you_ can take matters into your own hands and provide your local copy to the network, fixing all existing links to the data.

By contrast, a broken HTTP link is broken forever, unless the owner of the original domain name decides to fix it. Even if you had a perfect backup of the off-chain NFT data, you wouldn't be able to fix the link between the on-chain NFT record and the off-chain data without controlling the original domain name.

{
  /*
  TODO: how to download a car using
  - IPFS cli: `ipfs dag export`
  - HTTP req to public gateway: `curl https://dweb.link/api/v0/dag/export?arg=<cid> --output filename.car`
  */
}

## For platforms and marketplaces

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

[ipfs-docs-concepts-cid]: https://docs.ipfs.io/concepts/content-addressing
[ipfs-docs-install]: https://docs.ipfs.io/install/
[ipfs-docs-nft-best-practices]: https://docs.ipfs.io/how-to/best-practices-for-nft-data/
[ipfs-docs-web-addresses]: https://docs.ipfs.io/how-to/address-ipfs-on-web/
[concepts-decentralized-storage]: ../concepts/decentralized-storage.md
[brave-ipfs]: https://brave.com/ipfs-support/
[public-gateway-checker]: https://ipfs.github.io/public-gateway-checker/
