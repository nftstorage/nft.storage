# How to mint an NFT with NFT.Storage using ERC-1155 compliant metadata

<!-- TODO: introduce & define ERC-1155, explain that it works for ERC-721 also -->

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

<!-- docusaurus tabs imports -->
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Uploading your images, assets, and metadata

Before you can create the blockchain record for your NFT (generally called "minting"), you'll need to store all of the off-chain resources that comprise the NFT "package".

<Tabs>
<TabItem value="js" label="JavaScript">

TODO: js client `store()` example

</TabItem>
<TabItem value="http" label="HTTP API">

TODO: http `/store` example

        1. Call out intricacies with Cloudflare request limits (think with HTTP API, you can't use /store if total request is 100MB+?)

</TabItem>
</Tabs>


### Minting your NFT

<Tabs>
<TabItem value="marketplace" label="Using an NFT marketplace">

TODO: OpenSea example

</TabItem>
<TabItem value="contract" label="Writing your own minting contract">

TODO:
- describe high-level minting process
- link to NFT school minting example & flow tutorial
- link to minty how-to on IPFS docs

</TabItem>
</Tabs>