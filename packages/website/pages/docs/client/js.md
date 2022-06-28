# JavaScript client library

import { Tabs, TabItem } from 'components/mdx/tabs';
import Callout from 'nextra-theme-docs/callout';

The [`nft.storage`][npm-package] JavaScript package is a small and easy-to-use library that can have your JavaScript or TypeScript project integrated with NFT.Storage in minutes.

The JavaScript client uses the [HTTP API][reference-http-api] to send your data to the NFT.Storage service as a collection of [Content Archives (CARs)][concepts-car]. Encoding data into CARs locally allows you to send files that would otherwise be too large to fit within the API's size limits, as the client will automatically split large CARs into smaller pieces and the service will re-assemble them once they are all received. 

Encoding the data locally has another benefit of reducing the trust required of the NFT.Storage service. By calculating all of the [Content Identifiers (CIDs)][concepts-cid] for your data yourself, you can make sure that the data you send is exactly what gets provided to the network. Any alteration of your data by the NFT.Storage service or a third party "monster in the middle" would result in a different CID, which the client will reject as an error.

This guide will cover the basics of creating a client object, as well as the most common and useful operations. For more details, see the complete [client API documentation][reference-nftstorage-class]. For less, see the [Quickstart guide][quickstart]!

## Installation and importing

The [`nft.storage`][npm-package] NPM package can be added to your project with your favorite JS dependency manager:

<Tabs>
<TabItem value="npm" label="NPM">
  ```bash
  npm install nft.storage
  ```
</TabItem>
<TabItem value="yarn" label="Yarn">
  ```bash
  yarn add nft.storage
  ```
</TabItem>
</Tabs>

How you import the client into your code will depend on whether your project uses [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) or the [CommonJS](https://en.wikipedia.org/wiki/CommonJS) `require` syntax:

<Tabs>
<TabItem value="esm" label="ES Modules (import)">
  ```js
  import { NFTStorage } from 'nft.storage'
  ```
</TabItem>
<TabItem value="commonjs" label="CommonJS (require)">
  ```bash
  const { NFTStorage } = require('nft.storage')
  ```
</TabItem>
</Tabs>


### Additional imports for Node.js

The client API works with `File` and `Blob` objects that are built-in to the JavaScript runtimes on browsers but are not included in the standard library for Node.js. You can import API-compatible `File` and `Blob` objects from the `nft.storage` package, which will work on both Node and in the browser:

<Tabs>
<TabItem value="esm" label="ES Modules (import)">
```js
import { NFTStorage, File, Blob } from 'nft.storage'
```
</TabItem>
<TabItem value="commonjs" label="CommonJS (require)">
```js
const { NFTStorage, File, Blob } = require('nft.storage')
```
</TabItem>
</Tabs>

## Creating a client object

To create an [`NFTStorage`][reference-nftstorage-class] client object, you'll need an NFT.Storage API token. If you don't have one yet,
head to the [Quickstart guide][quickstart] to learn more.

```js
const NFT_STORAGE_TOKEN = 'your-api-token'
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
```

## Storing data

There are a few methods available for storing data. 

### `store` - store ERC1155 NFT data

For NFTs that follow the [ERC-1155][erc-1155] metadata specification, the [`store`][reference-store] method provides a convenient way to upload your NFT assets (images, etc) in the same operation as your metadata, with the client taking care of the details of linking from the metadata to the assets.

```js
const imageFile = new File([ someBinaryImageData ], 'nft.png', { type: 'image/png' })
const metadata = await client.store({
  name: 'My sweet NFT',
  description: 'Just try to funge it. You can\'t do it.',
  image: imageFile
})
```

For more details, see the [guide to storing ERC-1155 NFTs][howto-erc1155].

### `storeBlob` - store a single binary data object

The [`storeBlob`][reference-storeBlob]  method takes a single [`Blob`][mdn-blob] of binary data and stores it with NFT.Storage, returning the CID asynchronously. Note that files stored in this manner will not have human-readable filenames stored on IPFS and must be fetched directly by CID.

```js
const someData = new Blob(["hello world"])
const cid = await client.storeBlob(someData)
```

### `storeDirectory` - store a collection of files

The [`storeDirectory`][reference-storeDirectory] method takes a collection of one or more [`File`][mdn-file] objects and stores them in an IPFS directory listing. You can create a directory structure by using `/` characters in the filenames to delimit directories.

```js
const readmeFile = new File('Run node src/index.js for a friendly greeting.', 'README.txt', { type: 'text/plain' })
const sourceFile = new File('console.log("hello, world")', 'src/index.js', { type: 'text/javascript' })

const cid = await client.storeDirectory([readmeFile, sourcefile])
```

The CID returned by the `storeDirectory` method will resolve to an IPFS directory object containg the stored files. In the case of the example above, the contents would be a file named `README.txt` and a subdirectory named `src` that contains an `index.js` file.

### `storeCar` - store a Content Archive (CAR)

The [`storeCar`][reference-storeCar] method stores a [Content Archive (CAR)][concepts-car] of content-addressed data, returning the root CID of the archive.

One of the simplest ways to create a CAR is using the [`encodeBlob`][reference-encodeBlob] and [`encodeDirectory`][reference-encodeDirectory] static methods of the `NFTStorage` class. For other options, see the [guide to CAR files][concepts-car].

```js
const someData = new Blob(["hello world"])
const { car } = await NFTStorage.encodeBlob(someData)

const cid = await client.storeCar(car)
```

## Deleting an upload from your account

The [`delete`][reference-delete] method can remove uploaded data from your account, however it's important to understand that this **does not** guarantee that the data will be removed from the [decentralized storage networks][concepts-decentralized-storage] used by NFT.Storage. 

The entry for the data will be removed from your account's file listing page, and the NFT.Storage service may stop providing the data to the IPFS network and managing Filecoin storage deals. However, any peers in the storage networks who have obtained a copy of the data may continue to store it and may continue to provide the data to the network at their discretion.

## API reference

Full [API reference documentation][reference-nftstorage-class].

[quickstart]: /docs/
[reference-http-api]: /api-docs/
[concepts-car]: /docs/concepts/car-files/
[concepts-decentralized-storage]: /docs/concepts/decentralized-storage/
[concepts-cid]: https://docs.ipfs.io/concepts/content-addressing/
[howto-erc1155]: /docs/how-to/mint-erc-1155/


{ /* TODO: update links once API docs are moved into the main site */ }
[reference-nftstorage-class]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html
[reference-store]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#store
[reference-storeBlob]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#storeBlob
[reference-storeDirectory]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#storeDirectory
[reference-storeCar]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#storeCar
[reference-delete]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#delete
[reference-encodeDirectory]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#encodeDirectory
[reference-encodeBlob]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#encodeBlob

[npm-package]: https://npmjs.com/package/nft.storage
[mdn-blob]: https://developer.mozilla.org/en-US/docs/Web/API/Blob
[mdn-file]: https://developer.mozilla.org/en-US/docs/Web/API/File
[erc-1155]: https://eips.ethereum.org/EIPS/eip-1155
