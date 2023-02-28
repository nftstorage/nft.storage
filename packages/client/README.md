# nft.storage

![ci][ci.icon]
[![package][version.icon]][package.url]
[![styled with prettier][prettier.icon]][prettier.url]
[![size][size.icon]][size.url]
[![codecov][cov.icon]][cov.url]

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

## Usage

First, obtain an API token from https://nft.storage and use it in place of `API_TOKEN` below:

```js
import { NFTStorage, File } from 'nft.storage'
const client = new NFTStorage({ token: 'API_TOKEN' })

async function main() {
  const metadata = await client.store({
    name: 'Pinpie',
    description: 'Pin is not delicious beef!',
    image: new File(
      [
        /* data */
      ],
      'pinpie.jpg',
      { type: 'image/jpg' }
    ),
  })
  console.log(metadata.url)
  // ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
}

main()
```

The client uses ESM modules. If running from Node.js, either name your script `index.mjs` or name it `index.js` _and_ use `npm init` to create a new `package.json` file in your project directory, adding `"type": "module",` to it.

Run the script:

```sh
node index.mjs # or index.js
```

For more examples please see the [API documentation](https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html) or the [examples directory in the project repository][examples directory], which contains sample projects for both [browsers][examples.browser] and [Node.js][examples.node].

[raw http api]: https://nft.storage/api-docs/
[node.js]: https://nodejs.org/
[api documentation]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html
[examples directory]: https://github.com/nftstorage/nft.storage/tree/main/examples/client
[examples.node]: https://github.com/nftstorage/nft.storage/tree/main/examples/client/node.js
[examples.browser]: https://github.com/nftstorage/nft.storage/tree/main/examples/client/browser
[ci.icon]: https://github.com/nftstorage/nft.storage/actions/workflows/client.yml/badge.svg
[version.icon]: https://img.shields.io/npm/v/nft.storage.svg
[package.url]: https://npmjs.org/package/nft.storage
[prettier.icon]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier.url]: https://github.com/prettier/prettier
[size.icon]: https://badgen.net/bundlephobia/minzip/nft.storage
[size.url]: https://bundlephobia.com/result?p=nft.storage
[cov.icon]: https://codecov.io/gh/nftstorage/nft.storage/branch/main/graph/badge.svg?token=dU5oWrlqHF
[cov.url]: https://codecov.io/gh/nftstorage/nft.storage
