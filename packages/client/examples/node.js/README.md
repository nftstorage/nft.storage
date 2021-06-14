# nft.storage Node.js examples

Examples for using the nft.storage client from Node.js.

- `store.js` - creates ERC-1155 compatible metadata
- `storeBlob.js` - uploads a single file using `storeBlob`
- `storeCar.js` - uploads a Content Addressed Archive using `storeCar`
- `storeDirectory.js` - uploads a multiple files using `storeDirectory`

## Setup

Install dependencies:

```sh
npm install
```

Register an account at https://nft.storage and create a new API key.

Open `store.js`/`storeBlob.js`/`storeCar.js`/`storeDirectory.js` and replace `API_KEY` in the code with your key.

## Running

```sh
node store.js
# or
node storeBlob.js
# or
node storeCar.js
# or
node storeDirectory.js
```
