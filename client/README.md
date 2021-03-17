# nft.storage

A client library for https://nft.storage/ service. It provides convenient interface for working with [RAW HTTP API][] from web browser or [nodejs][] and comes bundled with TS for out-of-the box type inference and better IntelliSense.

## Install

Install the package from npm using using npm

```
npm install nft.storage
```

Or yarn

```
yarn add nft.storage
```


### Usage

```js
import { NFTStorage } from "nft.storage"
const client = new NFTStorage({ token: API_TOKEN }) 
const cid = await client.storeBlob(new Blob(['hello world'])) 
```

For more examples please see [API documentation][]


[RAW HTTP API]:https://nft.storage/#api-docs
[nodejs]:https://nodejs.org/
[API documentation]:https://ipfs-shipyard.github.io/nft.storage/client/
