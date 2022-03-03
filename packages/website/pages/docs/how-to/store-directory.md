# Store a directory of files

import Callout from 'nextra-theme-docs/callout';


You can use NFT.Storage to store any files needed for your NFT projects. This guide shows a simple example of uploading a directory full of files using a script written in Node.js with the `nft.storage` [JavaScript client library][reference-client-js].

To follow along, you'll need [Node.js](https://nodejs.org) version 16 or greater.

## Creating a project

Create a new directory and use `npm` to initalize a new JavaScript project.

```bash
mkdir store-directory
cd store-directory
npm init -y
```

This will create a `package.json` file with the standard "new project" defaults. 

Next, add the `nft.storage` and `files-from-path` packages to your project's dependencies:

```bash
npm install nft.storage files-from-path
```

## Adding the upload code

Create a file called `storeDirectory.mjs` and add the following code:

```js
import { NFTStorage, File } from 'nft.storage'
import { getFilesFromPath } from 'files-from-path'

const token = 'YOUR_API_TOKEN'

async function main() {
  const path = process.argv.slice(2)
  const files = await getFilesFromPath(path)

  const storage = new NFTStorage({ token })

  console.log(`storing ${files.length} file(s) from ${path}`)
  const cid = await storage.storeDirectory(files, {
      pathPrefix: path // see the note about pathPrefix below
      hidden: true // use the default of false if you want to ignore files that start with '.'
  })
  console.log({ cid })

  const status = await storage.status(cid)
  console.log(status)
}
main()
```

The `getFilesFromPath` function is provided by the [`files-from-path` package][npm-files-from-path]. It will read the contents of a directory into `File` objects that can be passed into the NFT.Storage client.

The `pathPrefix` option tells `getFilesFromPath` to remove the input `path` from the filenames of the `File` objects it creates. For example, if you're reading in files from a directory called `example`, calling `getFilesFromPath` _without_ the `pathPrefix` argument would result in `File` objects with filenames like `example/file1.txt`, `example/file2.txt`, and so on. If you set the `pathPrefix` option to `example`, you'll get `file1.txt`, `file2.txt`, etc. instead. This results in a final IPFS URI of `ipfs://<directory-cid>/file1.txt` instead of `ipfs://<directory-cid>/example/file1.txt`.

<Callout emoji="💡">
If your directory contains a lot of files, or if the files themselves are very large, you may want to use `filesFromPath` instead of `getFilesFromPath`. This will avoid buffering all the files into memory, but will require you to handle each `File` object individually as you pull from the returned `AsyncIterator`.
</Callout>

You'll need to replace `YOUR_API_TOKEN` with your NFT.Storage API key. If you don't yet have an API key, see the [Quickstart guide][quickstart].

<Callout emoji="⚠️">
Make sure not to check your API token into version control! If you plan to share this script with others, it's best to read the token from an environment variable or configuration file instead of including it in your source code.
</Callout>



## Running the script

You should now be able to run the script and pass in the path to a directory:

```bash
node storeDirectory.mjs 'path_to_your_directory'
```

When the upload is complete, the CID and status of the upload will be printed to the console.

[quickstart]: /docs/
[reference-client-js]: /docs/client/lib

[npm-files-from-path]: https://www.npmjs.com/package/files-from-path