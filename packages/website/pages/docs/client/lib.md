---
title: Client Lib
---

# Client Lib Module

A client library for the https://nft.storage/ service. It provides a convenient interface for working with the Raw HTTP API from a web browser or [Node.js][node-js] and comes bundled with TS for out-of-the box type inference and better IntelliSense.

example
```js
import { NFTStorage, File, Blob } from "nft.storage"
const client = new NFTStorage({ token: API_TOKEN })

const cid = await client.storeBlob(new Blob(['hello world']))
```

[node-js]: https://nodejs.org
