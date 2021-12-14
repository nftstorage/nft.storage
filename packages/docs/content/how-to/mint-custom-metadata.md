# How to mint an NFT with NFT.Storage using hand-rolled metadata

If you want to customize your metadata, or know you'll be using the same off-chain assets in many NFTs, you can store your files separately and get their IPFS URIs. You can then use these IPFS URIs and put them into a JSON file however you'd like to create your metadata. This metadata can then be stored, getting its IPFS URI, and using it when minting your NFT.

<aside>
⚠️ It's important to make sure you are using a properly formatted IPFS URL (i.e., `ipfs://bafy...`) for the metadata URL you use when minting your NFT, as well as the URLs referenced within the metadata. This way, any IPFS-compatible browser can retrieve the right data directly using these URLs, and your NFT follows this universal standard. Click [here](https://docs.ipfs.io/how-to/address-ipfs-on-web/) to read more about IPFS URLs.

</aside>

Here's an example on how to do this to mint your own NFT!

1. <using JS client (probably just `storeBlob()` vs. using HTTP API `/upload`>
    1. Storing your files
        1. Call out intricacies with Cloudflare request limits (use [chunked CAR uploads](https://github.com/nftstorage/nft.storage/issues/413#issuecomment-918410081) if using HTTP API /upload)
        2. Call out 31GB data limit
    2. Creating your metadata
    3. Storing your metadata
2. To mint your NFT using this metadata URI,
    1. <using hardhat or similar>
    2. <using something like opensea>