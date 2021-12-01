---
title: Storing the World’s Most Valuable Virtual Assets with NFT.Storage
description: The metaverse is here. Where is it all being stored?
author: David Choi
thumbnail: https://filecoin.io/uploads/fil-blog-nft-storage-notext-1_hu0f986e6d3668f304753a6341d061b59b_77385_2000x0_resize_q90_linear_2.png
date: Nov 30, 2021
tags:
  - nft
  - ipfs
  - news
  - updates
---

The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought.

The wonderful thing about NFTs is that we’re just getting started. Though the word “metaverse” might feel overused or neutralized by corporate appropriation, it holds a very real vision for the future. As our world becomes more and more digital, we will find increasing value in our digital assets being as “real” as those in our physical world. NFTs provide the best — indeed, the only — solution to virtual ownership that provides both security and self-sovereignty.

When you peel back the metaverse, however, the question becomes: where does the virtual economy of the future exist? How do you ensure the digital assets you’re buying actually are what you think they are? Where do they get stored so they can’t disappear?

Say hello to NFT.Storage.

## The Storage Solution for the World’s NFTs

[NFT.Storage](https://nft.storage/) is a service for decentralized storage built specifically for NFTs and NFT metadata. NFT.Storage allows developers and NFT applications to protect their virtual assets and related metadata through content addressing and decentralized storage, powered by IPFS and Filecoin respectively.

And did we mention? It’s free!

> “NFTs are part of humanity’s cultural legacy - and designing their data for long-term accessibility is crucial. Content addressing and distributed storage networks ensure that [digital artwork](https://www.wsj.com/articles/beeple-nft-fetches-record-breaking-69-million-in-christies-sale-11615477732?mod=article_inline), [basketball cards](https://dappradar.com/blog/50-million-in-sales-makes-nba-top-shot-largest-nft-market), and [virtual real estate](https://decrypt.co/57092/biggest-ever-nft-sale-made-as-single-axie-land-goes-for-1-5-million) are guaranteed to stay secure and available long-term. NFT.Storage makes it completely frictionless to mint NFTs following best practices through resilient persistence on IPFS and Filecoin.”
>
> -- [Mikeal Rogers](https://twitter.com/mikeal), Engineering Manager at Protocol Labs.

Right now, the vast majority of NFTs and related metadata are static images. The PFP projects and 1-of-1s that have kicked off the global fervor for NFTs (and will continue to play critical roles) will be joined by immensely complex NFTs. AR/VR, multimedia assets, and gaming will all require unique and logic-heavy NFT frameworks, with metadata larger and vastly more complex than what’s typically captured in today’s NFTs. This all portends the need for a storage network that scales with these emerging requirements from the NFT space. And Filecoin is built to support those needs.

## NFT.Storage: a Proven Solution

NFT.Storage isn’t a new service for Web3 developers. NFT.Storage launched in April, 2021. Since launch, the tool has grown into a core building block for NFT developers, providing the easiest method to ensure content persistence for virtual assets. Some highlight since launch:

- Over 10,000 users
- Over 14.5M uploads of NFT data (including entire NFTs, metadata, and other assets) for 20+ TiB data
- These numbers are driven by anyone from individual artists to large marketplaces, with NFT.Storage as the chosen decentralized storage provider for leading NFT companies like OpenSea, MakersPlace, Holaplex, MagicEden, Galaxy, Jigstack, and more

## How it Works

With NFT.Storage, developers can use a few lines of code to ensure their NFTs — or the NFTs minted and launched on their platforms — are addressed through IPFS and stored on Filecoin. The result is a vibrant, decentralized, open, and secure NFT ecosystem in which NFTs are ensured to have:

1. **Content Addressing**: Once users upload data on NFT.Storage, they receive an IPFS hash of the content, known as a [CID](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids). CIDs are unique fingerprints of the data, universal addresses that can be used to reference the content regardless of how and where it is stored. Since CIDs are generated from the content itself, using CID-based URIs to reference NFT data (e.g., metadata URL in NFT transaction, image and asset URLs in metadata) prevents problems like fragile links and [“rug pulls”](https://cointelegraph.com/news/opensea-collector-pulls-the-rug-on-nfts-to-highlight-arbitrary-value).
2. **Provable Storage**: NFT.Storage uses Filecoin for long-term decentralized data storage - brokering storage and retrieval deals to preserve NFT data long-term. Filecoin provides a permanence layer using cryptographic proofs to ensure the durability and persistence of the NFT data over time.
3. **Resilient Retrieval**: This data stored via IPFS and Filecoin can be fetched directly in the browser via any public IPFS gateway or using your own IPFS node. It’s easy to verify the data you’ve retrieved corresponds to the CID, so any retrieval option is a good one - trust is taken out of the equation!

## Starting with NFT.Storage

Check out NFT.Storage to learn more and use it for your NFT project: [https://nft.storage](https://nft.storage/). If you’re looking for more resources on NFTs, check out:

- [NFT School](https://nftschool.dev/)
- [NFT.Storage Video Tutorial](https://www.youtube.com/watch?v=aNaj9xNF8OU)
- [Best Practices for Storing NFT Data Using IPFS](https://docs.ipfs.io/how-to/best-practices-for-nft-data/#types-of-ipfs-links-and-when-to-use-them)
- [Minting an NFT with IPFS](https://ipfs.us4.list-manage.com/track/click?u=25473244c7d18b897f5a1ff6b&id=bcae62b60f&e=7fccf7a909)
- [Storing NFTs on IPFS](https://blog.ipfs.io/2021-04-05-storing-nfts-on-ipfs/)

## Storage for the Internet of Tomorrow

What we call today the “NFT ecosystem” will one day simply be known as the Internet. All the world’s physical IP and digital content is marching steadily into tokenization, as NFTs continue to provide the best way for virtual content to be created, shared, monetized, and secured. What NFT.Storage is building is a framework for the secure and persistent storage of the world’s Internet, starting today with NFTs, and tomorrow with whatever endless possibilities the builders of Web3 can dream.

Join us at [NFT.Storage](http://nft.storage).
