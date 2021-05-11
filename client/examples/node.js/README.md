# nft.storage Node.js examples

Here are two examples for using the nft.storage client from Node.js.

- `store.js` - creates ERC-1155 compatible metadata
- `storeBlob.js` - uploads a single file using `storeBlob`
- `storeDirectory.js` - uploads a multiple files using `storeDirectory`

## Setup

Install dependencies:

```sh
npm install
```

Register an account at https://nft.storage and create a new API key.

Open `store.js`/`storeBlob.js`/`storeDirectory.js` and replace `API_KEY` in the code with your key.

## Running

```sh
node store.js
# or
node storeBlob.js
# or
node storeDirectory.js
```
