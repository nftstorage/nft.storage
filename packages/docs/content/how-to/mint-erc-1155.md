# How to mint an NFT with NFT.Storage using ERC-1155 compliant metadata

Using NFT.Storage, you can: 

- Store all your NFT's images and assets
- Generate ERC-1155 compliant metadata that contains your images and assets
- Store this metadata into NFT.Storage
- Provide the IPFS URL for the metadata that should be put into the transaction minting your ERC-1155 token

...all in one HTTP request!

<aside>
⚠️ It's important to make sure the metadata URL you use when minting your NFT is a properly formatted IPFS URL (i.e., `ipfs://bafy...`). This way, any IPFS-compatible browser can retrieve the right data directly using this URL, and your NFT follows this universal standard. Click [here](https://docs.ipfs.io/how-to/address-ipfs-on-web/) to read more about IPFS URLs.
</aside>

Here's an example on how to do this to mint your own NFT!



1. To upload your images / assets, metadata, and get your metadata's IPFS URI
    1. <using `store()` in JS client>
    2. <using `/store` with HTTP API>
        1. Call out intricacies with Cloudflare request limits (think with HTTP API, you can't use /store if total request is 100MB+?)
2. To mint your NFT using this metadata URI,
    1. <using hardhat or similar>
    2. <using something like opensea>

