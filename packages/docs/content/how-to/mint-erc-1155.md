# How to mint an NFT with NFT.Storage using ERC-1155 compliant metadata

<!-- TODO: introduce & define ERC-1155, explain that it works for ERC-721 also -->

Using NFT.Storage, you can: 

- Store all your NFT's images and assets
- Generate ERC-1155 compliant metadata that contains your images and assets
- Store this metadata into NFT.Storage
- Provide the IPFS URL for the metadata that should be put into the transaction minting your ERC-1155 token

...all in one HTTP request!

:::info Check your metadata URI
It's important to make sure the metadata URL you use when minting your NFT is a properly formatted IPFS URL (i.e., `ipfs://bafy...`). This way, any IPFS-compatible browser can retrieve the right data directly using this URL, and your NFT follows this universal standard. Click [here](https://docs.ipfs.io/how-to/address-ipfs-on-web/) to read more about IPFS URLs.
:::

Here's an example on how to do this to mint your own NFT!

<!-- docusaurus tabs imports -->
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Uploading your images, assets, and metadata

Before you can create the blockchain record for your NFT, you'll need to store all of the off-chain resources that comprise the NFT "package". Once everything has been stored, you can use the IPFS URI for the metadata to link from the on-chain token to everything else.

Below are examples of storing NFT assets and metadata using JavaScript and the HTTP API. Both examples use the `store` operation, which accepts metadata and asset files in one request and updates the metadata to link to the asset files using IPFS URIs. 

This method expects the metadata to conform to the [ERC-1155 metadata schema][reference-erc-1155-schema]. This standard is backwards compatible with ERC-721 metadata and is generally well supported by various wallets and marketplaces.

:::tip Not using ERC-1155?
If your metadata doesn't fit the ERC-1155 standard, learn how to [mint using custom metadata](./mint-custom-metadata.md) instead!
:::

When adding custom properties, we recommend that you put them in the `properties` object, rather than at the top level. However, if you're minting for a specific marketplace, you should consult their documentation and follow their recommendations.

For the examples below, we'll use metadata that looks like this:

```json
{
  "name": "Storing the World's Most Valuable Virtual Assets with NFT.Storage",
  "description": "The metaverse is here. Where is it all being stored?",
  "image": null,
  "properties": {
    "type": "blog-post",
    "origins": {
      "http": "https://nft.storage/blog/post/2021-11-30-hello-world-nft-storage/",
      "ipfs": "ipfs://bafybeieh4gpvatp32iqaacs6xqxqitla4drrkyyzq6dshqqsilkk3fqmti/blog/post/2021-11-30-hello-world-nft-storage/"
    },
    "authors": [
      {
        "name": "David Choi"
      }
    ],
    "content": {
      "text/markdown": "The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>"
    }
  }
}
```

This metadata object describes [a post on the NFT.Storage blog](https://nft.storage/blog/post/2021-11-30-hello-world-nft-storage/) using some custom metadata in the `properties` field that was made up for this example. 

Although wallets and other clients won't understand the meaning of our custom fields like `type` or `origins`, they will be able to show the name, description and image, since those all conform to the ERC-1155 and ERC-721 spec.

Speaking of the `image`, if you look closely at the metadata above, you might notice that the `image` field is set to `null`. This is because the method for including images and other files with your request is a little different depending on whether you're using the JavaScript client or the HTTP API. See the tab that matches your platform to see how to prepare your request.

<Tabs>
<TabItem value="js" label="JavaScript">

The JavaScript client's [`store(token)` method](https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#store) takes a single `token` argument, which contains the metadata for your NFT as a JavaScript object.

Inside the `token` object, the `image` field must be set to a [`File`][mdn-file] or [`Blob`][mdn-blob] object, which should contain image data in a "web-friendly" format, for example, PNG or JPEG.

You can include additional files by adding an entry to the `properties` field whose value is a `File` or `Blob` object. This will result in those files being stored with NFT.Storage, and the metadata entry will be set to an IPFS link to the file.

Here's an example:

```js
import { NFTStorage } from 'nft.storage'

// read the API key from an environment variable. You'll need to set this before running the example!
const API_KEY = process.env.NFT_STORAGE_API_KEY

// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
async function getExampleImage() {
  const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
  const r = await fetch(imageOriginUrl)
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
  }
  return r.blob()
}

async function storeExampleNFT() {
  const image = await getExampleImage()
  const nft = {
    image, // use image Blob as `image` field
    name: "Storing the World's Most Valuable Virtual Assets with NFT.Storage",
    description: "The metaverse is here. Where is it all being stored?",
    properties: {
      type: "blog-post",
      origins: {
        http: "https://nft.storage/blog/post/2021-11-30-hello-world-nft-storage/",
        ipfs: "ipfs://bafybeieh4gpvatp32iqaacs6xqxqitla4drrkyyzq6dshqqsilkk3fqmti/blog/post/2021-11-30-hello-world-nft-storage/"
      },
      authors: [{ name: "David Choi" }],
      content: {
        "text/markdown": "The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>"
      }
    }
  }

  const client = new NFTStorage({ token: API_KEY })
  const metadata = await client.store(nft)

  console.log('NFT data stored!')
  console.log('Metadata URI: ', metadatal.url)
}

storeExampleNFT()
```

</TabItem>
<TabItem value="http" label="HTTP API">

To store ERC-1155 NFT metadata and assets using the HTTP API, send a `POST` request to the `/store` endpoint, with a body containing `multipart/form-data` content.

:::info Check your file sizes
The `/store` endpoint supports a total request size of 100Mib, including all metadata, images and other asset files. If you need to store larger files and are unable to use the JavaScript client, see the [guide to CAR files][guide-car-files] to see how to chunk large files for upload.
:::

Inside the form data, you must have a field named `meta`, which contains your ERC-1155 compatible metadata as a JSON string.

Any field inside the meta object can be substituted with an ipfs URL to a file(, by providing a form data field with a name matching a (`.` delimited) property path and value containing the file content (in binary string or plain text depending on file format).

The name of the form data field containing the file content should be the "path" of the JSON field, using `.` to traverse nested objects.

For example, with a `meta` object of the form:

```json
{
  "name": "Hello",
  "image": null,
  "properties": {
    "videoClip": null
  }
}
```

You must include form fields named image and properties.videoClip in your request body, with the content of the image and video files as the form field values.

Here's an example that uses CURL to upload an image and its metadata.

It assumes that you have a file named `image.jpg` in your local directory. If not, you can download [this one](https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg) and save it as `image.jpg`

```bash
curl --request POST -F image=@image.jpg -F meta='{"image":null,"name":"Storing the Worlds Most Valuable Virtual Assets with NFT.Storage","description":"The metaverse is here. Where is it all being stored?","properties":{"type":"blog-post","origins":{"http":"https://nft.storage/blog/post/2021-11-30-hello-world-nft-storage/","ipfs":"ipfs://bafybeieh4gpvatp32iqaacs6xqxqitla4drrkyyzq6dshqqsilkk3fqmti/blog/post/2021-11-30-hello-world-nft-storage/"},"authors":[{"name":"David Choi"}],"content":{"text/markdown":"The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>"}}}'
```

</TabItem>
</Tabs>


## Minting your NFT

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

[guide-car-files]: ../concepts/car-files.md
[reference-erc-1155-schema]: https://eips.ethereum.org/EIPS/eip-1155#metadata
[mdn-file]: https://developer.mozilla.org/en-US/docs/Web/API/File
[mdn-blob]: https://developer.mozilla.org/en-US/docs/Web/API/Blob
