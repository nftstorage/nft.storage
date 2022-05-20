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
import { NFTStorage } from 'nft.storage'
import { filesFromPath } from 'files-from-path'
import path from 'path'

const token = 'YOUR_API_TOKEN'

async function main() {
  // you'll probably want more sophisticated argument parsing in a real app
  if (process.argv.length !== 3) {
    console.error(`usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`)
  }
  const directoryPath = process.argv[2]
  const files = filesFromPath(directoryPath, {
    pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  })

  const storage = new NFTStorage({ token })

  console.log(`storing file(s) from ${path}`)
  const cid = await storage.storeDirectory(files)
  console.log({ cid })

  const status = await storage.status(cid)
  console.log(status)
}
main()
```

The `filesFromPath` function is provided by the [`files-from-path` package][npm-files-from-path]. It will read the contents of a directory into `File` objects that can be passed into the NFT.Storage client.

The `pathPrefix` option tells `filesFromPath` to remove the input `path` from the filenames of the `File` objects it creates. For example, if you're reading in files from a directory called `example`, calling `filesFromPath` _without_ the `pathPrefix` argument would result in `File` objects with filenames like `example/file1.txt`, `example/file2.txt`, and so on. If you set the `pathPrefix` option to `example`, you'll get `file1.txt`, `file2.txt`, etc. instead. This results in a final IPFS URI of `ipfs://<directory-cid>/file1.txt` instead of `ipfs://<directory-cid>/example/file1.txt`.

Notice that we're calling [`path.resolve`](https://nodejs.org/api/path.html#pathresolvepaths) on the `directoryPath` argument before using it as our `pathPrefix`. `filesFromPath` will compare the `pathPrefix` we give it to the absolute path of the file, so using `path.resolve` ensures that we give it the correct input, even if the user passed in a relative path at the command line.

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
