# nft.storage

![ci][ci.icon]
[![package][version.icon]][package.url]
[![styled with prettier][prettier.icon]][prettier.url]
[![size][size.icon]][size.url]
[![deps][deps.icon]][deps.url]

A client library for the https://nft.storage/ service. It provides a convenient interface for working with the [Raw HTTP API][] from a web browser or [Node.js][] and comes bundled with TS for out-of-the box type inference and better IntelliSense.

## Install

Install the package using npm

```
npm install nft.storage
```

Or yarn

```
yarn add nft.storage
```

### Usage

First, obtain an API token from https://nft.storage and use it in place of `API_TOKEN` below:

```js
import { NFTStorage } from 'nft.storage'
const client = new NFTStorage({ token: API_TOKEN })
const cid = await client.storeBlob(new Blob(['hello world']))
```

For more examples please see the [API documentation][].

[raw http api]: https://nft.storage/#api-docs
[node.js]: https://nodejs.org/
[api documentation]: https://ipfs-shipyard.github.io/nft.storage/client/
[ci.icon]: https://github.com/ipfs-shipyard/nft.storage/actions/workflows/client.yml/badge.svg
[version.icon]: https://img.shields.io/npm/v/nft.storage.svg
[package.url]: https://npmjs.org/package/nft.storage
[prettier.icon]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier.url]: https://github.com/prettier/prettier
[size.icon]: https://badgen.net/bundlephobia/minzip/nft.storage
[size.url]: https://bundlephobia.com/result?p=nft.storage
[deps.icon]: https://status.david-dm.org/gh/ipfs-shipyard/nft.storage.svg?path=client
[deps.url]: https://david-dm.org/ipfs-shipyard/nft.storage?path=client
