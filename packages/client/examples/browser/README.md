# nft.storage browser examples

Examples using the nft.storage client from the browser.

- `store.html` - creates ERC-1155 compatible metadata
- `storeBlob.html` - uploads a single file using `storeBlob`
- `storeDirectory.html` - uploads a multiple files using `storeDirectory`

These demos use https://skypack.dev to bundle the deps up.

**Note**

At time of writing skypack's bundle of `ipfs-car` is incorrect, so a CAR upload demo is provided in /car that
the CAR upload demo converts it's deps to local ESM modules with [`vite`](https://vitejs.dev/), in the /car folder.

## Setup

Register an account at https://nft.storage and create a new API key.

Open `store.html`/`storeBlob.html`/`storeDirectory.html` and replace `API_KEY` in the code with your key.

## Running

Open `store.html`/`storeBlob.html`/`storeDirectory.html` in your favourite web browser.
