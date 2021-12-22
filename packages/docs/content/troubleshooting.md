---
sidebar_position: 3
---
# Troubleshooting


### I tried using an HTTP gateway to retrieve my content from IPFS but am receiving an HTTP error. Does this mean my content was not stored successfully on NFT.Storage?

Not necessarily! HTTP gateways are a great way for users who aren't running their own IPFS nodes to retrieve content from the IPFS network. 

However, they do introduce a centralized point of failure to a user flow. If a given gateway is down, or is under too much load, or is facing other issues, users who are accessing content through that gateway might be unable to access content. In this case, we recommend trying another gateway or running and using your own IPFS node.

Additionally, if the data was not stored on NFT.Storage, then there might be issues with the IPFS node(s) with a copy of the data providing that data to the gateway. Using NFT.Storage makes sure that the content stored is broadcasted to the network using best practices!

### Why am I seeing syntax error unexpected token?

**Try updating to Node version 14 or later**. 

We no longer offer support for versions prior to v14 ([see here](https://nft.storage/faq/#why-don't-you-support-versions-of-node-prior-to-v14)). This error can occur when attempting to use [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#browser_compatibility) with an old version of Node.

### Why am I seeing syntax error cannot use import statement outside a module?

**Try updating to Node version 14 or later**. 

This error can occur because of having an old version of Node. We no longer offer support for versions prior to v14 ([see here](https://nft.storage/faq/#why-don't-you-support-versions-of-node-prior-to-v14)). With Node v14 or greater, you should be able to use `import` if you are using ESM Modules, otherwise you will need to use `require`.

