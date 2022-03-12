---
title: Why NFT.Storage?
---

import Callout from 'nextra-theme-docs/callout';

# Why NFT.Storage?
> [NFT.Storage](http://NFT.Storage) makes it easy to follow NFT best-practices, maximizing the value of NFTs you're minting, and minimizing the overhead of maintaining the NFTs for NFT minters and owners for the long-run

One of the powerful features of NFTs is that they can reference off-chain data, saving you the cost of storing your images, videos, and other large NFT data on-chain. An example of this is with the ERC-1155 standard, which defines places where you should reference data off-chain via URIs:

- Metadata: In the transaction itself, you need to include a URI that points to a JSON file containing the metadata for your NFT
- Image: The standard defines the `image` field in the metadata, whose value is a URL that points to an image associated with your NFT
- Other data: The standard defines the `properties` field in the metadata, which includes another JSON object that allows the user to define custom fields, which often reference URLs that point to other off-chain data (e.g., videos)

The best practice is to use URIs that contain [IPFS content IDs](https://docs.ipfs.io/concepts/content-addressing/) (CIDs), which are a reference to the underlying piece of data itself (i.e., a hash of the data). This makes it unambiguous what data corresponds with what NFT - the CID is a property of the data itself. If two people disagree on a specific NFT and what it is, you can just check which one corresponds to the correct CIDs. Using NFT.Storage's libraries makes it easy for you to locally calculate the CIDs of your NFT data.

Using NFT.Storage also makes it easy to store your data on the public IPFS network. The beauty of IPFS is that it's unopinionated on where data physically sits, since it references data by its CID. As a result, IPFS guarantees that, if at least one copy of the data is being broadcast to the network (whether it's stored on a storage service, on decentralized storage, or on your local computer), you can get a copy back. 

NFT.Storage functions as a great long-term home for NFT data, with data being broadcasted to the IPFS network and stored trustlessly on Filecoin (with a vision to [fully decentralize itself as a service](https://nft.storage/blog/post/2022-01-20-decentralizing-nft-storage/)). And the storage and retrieval infrastructure behind NFT.Storage is designed to, and will increasingly, utilize innovations from both Web2 and web3 to provide the performance that end-users expect.


## Pitfalls with using HTTP URLs

When minting an NFT, you need to be really careful about what kind of URI you use. Using HTTP URLs makes your NFT less valuable, since they reference a specific location on the Web. With an NFT that has HTTP URLs, potential buyers might be thinking:

- What happens if the people running the HTTP servers decide to swap out the data that my NFT is referencing? If I try to show off my NFT to others, art that is different than what I had initially purchased will show up.
- What happens if these HTTP servers go down completely? Even if I still own a copy of the art, I have no way to prove using on-chain data that my NFT was pointing to this specific artwork.

Since NFT ownership might frequently switch hands, the NFT owner and the HTTP server maintainer are often not going to be the same, which can create unclear or unbalanced incentives for keeping NFT data available in perpetuity.

## IPFS and [NFT.Storage](http://NFT.Storage) to the rescue

This is why [NFT.Storage](http://NFT.Storage) gives you [IPFS](https://ipfs.io/) URIs rather than HTTP URLs. IPFS URIs are unique identifiers of the underlying data based on cryptographic hashes of the data itself, rather than the location where the data sits today. That way, you can easily prove that a piece of data is actually a part of your NFT! Further, as long as a copy exists somewhere on the IPFS network (on a public IPFS node, on Filecoin, even on your own computer running an IPFS node), you can download a copy of that data.

Click [here](https://proto.school/content-addressing) to read more about the power of content addressing!

```javascript
import { NFTStorage, File } from 'nft.storage'
import { pack } from 'ipfs-car/pack';

const apiKey = 'YOUR_API_KEY'
const client = new NFTStorage({ token: apiKey })

const metadata = await client.store({
  name: 'Pinpie',
  description: 'Pin is not delicious beef!',
  image: new File([/* data */], 'pinpie.jpg', { type: 'image/jpg' })
})
console.log(metadata.url)
// ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
```

There are other ways to get data onto IPFS and help ensure that data stays up (e.g., [add data to your own node](https://docs.ipfs.io/how-to/command-line-quick-start/) and/or use a [pinning service](https://docs.ipfs.io/how-to/work-with-pinning-services/)), but [NFT.Storage](https://nft.storage) simplifies the process for you. You upload data using a simple API, and behind the scenes, the service makes the data available on IPFS and puts physical copies of the data redundantly into the Filecoin network, a decentralized storage network that "speaks" IPFS CID!

The Filecoin network is a great building block for any decentralized storage system. Independent storage providers periodically must cryptographically prove that they are physically storing your specific data for a specific duration of time. When they submit these proofs to the network, other nodes verify these proofs, and this is what ends up on the Filecoin blockchain. So, anyone at any given moment can trustlessly verify that specific content is persisted, the number of copies on the network, and with who they are stored with. Read more about Filecoin proofs [here](https://filecoin.io/blog/posts/what-sets-us-apart-filecoin-s-proof-system/).

When storing data on Filecoin, you enter storage "deals" that have a finite duration. NFT.Storage service currently renews deals for you to ensure your data deals never expire. However, there are also improvements underway to ensure multi-genereational persistence with no dependency on NFT.Storage, with the mission to store all NFT data as a public good. Filecoin's unique combination of verifiable proof of storage and open market protocols allow for solutions that can ensure persistence through smart contract interactions. The current plan is to create a "data DAO" that funds smart contracts that perpetually ensure many copies of data uploaded to NFT.Storage exist, and create new storage deals if storage deals expire or copies go away. Using NFT.Storage today positions you to take advantage of these future upgrades with no extra work from your end!

But since more copies on the IPFS network only increases redundancy, you should store your off-chain NFT data all the places that you need to in order to feel comfortable (we call this ["Storage Layer Maximalism"](https://nft.storage/blog/post/2021-12-14-storage-layer-maximalism/)). We hope that NFT marketplaces, tools, artists, and buyers all feel the shared responsibility to keep copies of their NFT data, alongside our efforts to store NFT data as a public good - but this starts with using IPFS CIDs in NFTs.

## Infrastructure for Web2.5

To help give end-users the best possible experience using NFTs, we design our infrastructure to balance between performance (e.g., reliability, speed) and trustlessness (e.g., verifiability). To do this, we rely on infrastructure like CDNs, caching, edge workers, and other cloud infrastructure, while designing our data pipelines to ensure that users locally compute CIDs when storing and retrieve data based on CIDs. We encourage folks to use NFT.Storage for the best possible storage and retrieval experience of off-chain data, without compromising on web3 principles!

<Callout emoji="⚡">
**Ready to get started using NFT.Storage right now?** Get up and running in minutes by following [the Quickstart guide][quickstart]!
</Callout>

[quickstart]: ./
[reference-http-api]: https://nft.storage/api-docs/
[concepts-car-files]: ../concepts/car-files/

