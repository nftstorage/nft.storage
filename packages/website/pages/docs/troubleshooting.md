---
title: Troubleshooting
---



# Troubleshooting

### I tried using an HTTP gateway to retrieve my content from IPFS but am receiving an HTTP error. Does this mean my content was not stored successfully on NFT.Storage?

Not necessarily! HTTP gateways are a great way for users who aren't running their own IPFS nodes to retrieve content from the IPFS network. 

However, they do introduce a centralized point of failure to a user flow. If a given gateway is down, or is under too much load, or is facing other issues, users who are accessing content through that gateway might be unable to access content. In this case, we recommend trying another gateway or running and using your own IPFS node.

Additionally, if the data was not stored on NFT.Storage, then there might be issues with the IPFS node(s) with a copy of the data providing that data to the gateway. Using NFT.Storage makes sure that the content stored is broadcasted to the network using best practices!

### Why am I seeing "Module not found" errors?

The `nft.storage` package uses the [`exports` field](https://nodejs.org/api/packages.html#packages_exports) in it's `package.json` file to export the correct code depending on the target environment. This allows us to support browsers, node.js with CommonJS (`require` syntax), and node.js with ES Modules (`import` syntax) from the same code base.

Unfortunately, not all bundlers and build tools in the JS ecosystem support the `exports` field. In particular, trying to import the `nft.storage` package from a project using Webpack 4 will result in an error like this:

```
Failed to compile.

./node_modules/nft.storage/src/platform.web.js
Module not found: Can't resolve 'ipfs-car/blockstore/memory' in '/workspace/Unstoppable-Stream/node_modules/nft.storage/src'
```

If possible, upgrading your project to use Webpack 5 or adopting an alternative bundler like [Vite](https://vitejs.dev/) should fix the issue. If your project was built using an older version of [create-react-app](https://create-react-app.dev/) and has not been "ejected" to use a custom configuration, you should be able to update to the latest `react-scripts` dependency by following [the update documentation](https://create-react-app.dev/docs/updating-to-new-releases/).

You may see similar errors when using Jest to run unit tests for projects built on NestJS. A working example using NestJS and Jest is available on [GitHub](https://github.com/alanshaw/nest-nftstorage).

Try the following to resolve: 

1. Install the dependency: ```npm i -D enhanced-resolve```
2. Add the file located [here](https://github.com/alanshaw/nest-nftstorage/blob/main/test/export-maps-resolver.js)
3. Configure it as a [resolver](https://github.com/alanshaw/nest-nftstorage/blob/main/package.json#L72)

You can read more about the Jest [fix](https://github.com/facebook/jest/issues/9771#issuecomment-841624042) for this issue. Jest v28 is expected to incorporate this fix once a stable release is available. 

If you don't want to change your build setup, you can import a pre-bundled and minified version of the package by changing the import statement:

```js
import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
```


### Why am I seeing syntax error unexpected token?

**Try updating to Node version 14 or later**. 

We no longer offer support for versions prior to v14 ([see here](https://nft.storage/faq/#why-don't-you-support-versions-of-node-prior-to-v14)). This error can occur when attempting to use [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#browser_compatibility) with an old version of Node.

### Why am I seeing syntax error cannot use import statement outside a module?

**Try updating to Node version 14 or later**. 

This error can occur because of having an old version of Node. We no longer offer support for versions prior to v14 ([see here](https://nft.storage/faq/#why-don't-you-support-versions-of-node-prior-to-v14)). With Node v14 or greater, you should be able to use `import` if you are using ESM Modules, otherwise you will need to use `require`.

### Don't See Your Question Answered?

[Chat with us in #nft-storage on IPFS discord](https://discord.com/invite/KKucsCpZmY)
