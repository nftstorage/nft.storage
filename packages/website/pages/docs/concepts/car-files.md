---
title: Working with Content Archives
sidebar_label: Work with Content Archives
description: Learn how to work with Content Archives of IPLD data.
---

import Callout from 'nextra-theme-docs/callout';

# Working with Content Archives

When you upload files to NFT.Storage using the [client library][reference-client-library], your data is converted into a graph of data structures, which are then packed into a format called a Content Archive (CAR) before being sent to the NFT.Storage service. 

For many use cases, you never need to know about this process, as the conversion happens behind the scenes when using the client library.  However, if you're using the [HTTP API][reference-http-api], or if you want more control over the structure of the IPFS data graph, you may want to work with Content Archives directly.

This how-to guide will explain [the basics of Content Archives](#what-is-a-content-archive) and [how they're used by the NFT.Storage API](#car-files-and-nft-storage).

We'll also see several methods of creating and manipulating Content Archives using [command line tools](#command-line-tools) and an overview of the [libraries](#libraries-for-application-developers) you can use in your application's code.

## What is a Content Archive?

The [Content Archive format][car-spec] is a way of packaging up [content addressed data][concepts-content-addressing] into archive files that can be easily stored and transferred. You can think of them like [TAR files][wikipedia-tar] that are designed for storing collections of content addressed data.

The type of data stored in CARs is defined by [IPLD](https://ipld.io), or InterPlanetary Linked Data. IPLD is a specification and set of implementations for structured data types that can link to each other using a hash-based Content Identifier (CID). Data linked in this way forms a Directed Acyclic Graph, or DAG, and you'll likely see a few references to DAGs in the documentation for IPLD and IPFS.

IPFS files are one example of IPLD data, but IPLD can also be used to access data from Ethereum, Git, and other hash-addressed systems. You can also use IPLD as a general purpose format for your structured data, sort of like a Web3-flavored JSON. See [Advanced IPLD formats](#advanced-ipld-formats) below for more information.

## CARs and NFT.Storage

When the NFT.Storage client packs up regular files into a CAR to store on IPFS, the CAR contains data encoded in the same format used by IPFS when importing files using the command line or other IPFS APIs.

This format uses an IPLD "codec" called [`dag-pb`](https://ipld.io/docs/codecs/known/dag-pb/), which uses [Protocol Buffers](https://developers.google.com/protocol-buffers) to encode an object graph. Inside the graph are [UnixFS objects](https://docs.ipfs.io/concepts/file-systems/#unix-file-system-unixfs) that describe the files and their contents.

Although the [HTTP API][reference-http-api] also allows you to upload regular files, the client prefers to send CARs for a few reasons.

First, formatting everything on the client allows us to calculate the root Content Identifier for the data you're uploading before we send any data to the remote service. This means that you can compare the CID returned by the NFT.Storage service to the one you calculated locally, and you don't have to trust the service to do the right thing.

Another reason to use CARs is to support large files, which would otherwise hit size limits on the NFT.Storage backend platform. The data in a CAR is already chunked into small blocks, which makes CARs easy to split into small pieces that can be uploaded in batches.

## Command line tools

There are a few ways to create and interact with CAR files from the command line.

### ipfs-car

The [ipfs-car][github-ipfs-car] JavaScript package includes a command-line tool for easily creating, unpacking, and verifying CAR files.

To install it, you'll need [Node.js](https://nodejs.org) - we recommend the latest stable version.

You can install the command globally:

```shell
npm install -g ipfs-car
```

Or run the command with `npx` without installing it to your PATH:

```shell
npx ipfs-car --help
```

The `--pack` flag will create a new CAR file from a collection of input files:

```shell
ipfs-car --pack path/to/files --output path/to/write/a.car
```

Or extract files from a CAR with `--unpack`:

```shell
ipfs-car --unpack path/to/my.car --output /path/to/unpack/files/to
```

You can also list the contents of a CAR with `--list`:

```shell
ipfs-car --list path/to/my.car
```

For more usage information, run `ipfs-car --help`.

### go-ipfs

[`go-ipfs`](https://docs.ipfs.io/install/command-line/) is the reference implementation of the IPFS protocol. Among many other features, `go-ipfs` supports exporting any IPFS object graph into a CAR file and importing data from CAR files into your local IPFS repository.

The [`ipfs dag export`][ipfs-docs-dag-export] command will fetch an IPFS object graph by its Content ID (CID), writing a stream of CAR data to standard output.

To create a CAR file using go-ipfs, you can redirect the output of `ipfs dag export` to a file:

```shell
cid="bafybeigdmvh2wgmryq5ovlfu4bd3yiljokhzdep7abpe4c4lrf6rukkx4m"
ipfs dag export $cid > path/to/output.car
```

Note that you should replace the value of `cid` inside the quotes with the CID you want to export.

If you don't have the CID in your local IPFS repository, the `dag export` command will try to fetch it over the IPFS network.

To add the contents of a CAR file to your local IPFS repository, you can use `ipfs dag import`:

```shell
ipfs dag import path/to/input.car
```

## Libraries for application developers

### JavaScript

There are two JavaScript packages available for manipulating CARs inside your application.

#### ipfs-car

The `ipfs-car` package includes library functions for packing and unpacking files into CARs, using the IPFS UnixFs data model. The library includes the same functionality as the `ipfs-car` command line utility described above.

See the [ipfs-car README](https://github.com/web3-storage/ipfs-car#api) for API documentation and usage examples.

#### @ipld/car

The [`@ipld/car` package](https://github.com/ipld/js-car) contains the main JavaScript implementation of the CAR specification and is used by `ipfs-car` under the hood. If you want to store non-file data using [advanced IPLD formats](#advanced-ipld-formats), you should use `@ipld/car` directly.

`@ipld/car` also provides the `CarReader` interface used by the NFT.Storage client's [`storeCar` method](https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#storeCar).

Here's a simple example of loading a CAR file from a Node.js stream and storing it with NFT.Storage:

```js
import { createReadStream } from 'fs'
import { CarReader } from '@ipld/car'

async function storeCarFile(filename) {
  const inStream = createReadStream(filename)
  const car = await CarReader.fromIterable(inStream)
  
  const client = makeStorageClient()
  const cid = await client.putCar(car)
  console.log('Stored CAR file! CID:', cid)
}
```

`CarReader.fromIterable` accepts any iterable of `Uint8Array` data, including Node.js streams. If you have all your CAR data in a single `Uint8Array` already, you can use [`CarReader.fromBytes`](https://github.com/ipld/js-car#CarReader__fromBytes) instead.

The `CarReader` type shown above will read the entire contents of the CAR into memory, which may cause issues with large files. On Node.js, you can use [`CarIndexedReader`](https://github.com/ipld/js-car#carindexedreader), which reads CAR data from disk directly and uses less memory than `CarReader`.

### Go

The [`go-car` module](https://github.com/ipld/go-car) provides the main Golang implementation of the CAR specification. We recommend using the `v2` module version, which supports the latest version of the CAR spec.

See the [API reference documentation](https://pkg.go.dev/github.com/ipld/go-car/v2) for more information.

## Splitting CARs for upload to NFT.Storage

The NFT.Storage [HTTP API][reference-http-api] accepts CAR uploads up to 100 MB in size, but the JavaScript client uses the HTTP API to upload files of _any_ size. The client manages to do this by splitting CARs into chunks of less than 100 MB each and uploading each chunk separately.

The main tool available for splitting and joining CARs is called `carbites`, which has implementations in JavaScript and Go. The JavaScript implementation includes a command-line version that allows you to split and join CARs from your terminal or favorite scripting language.

This section will demonstrate a few ways to split CARs in a way that's acceptable to the NFT.Storage service, using the command line tool, as well as programmatically using the `carbites` libraries in JavaScript and Go.

## Using the carbites-cli tool

The JavaScript [carbites library][github-carbites-js] includes a package called `carbites-cli` that can split and join CARs from the command line. You'll need a recent version of [Node.js](https://nodejs.org) installed, preferably the latest stable version.

You can install the tool globally with `npm`:

```shell with-output
npm install -g carbites-cli
```

```
added 71 packages, and audited 72 packages in 846ms
20 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
```

This will add a `carbites` command to your shell's environment:

```shell with-output
carbites --help
```

```
  CLI tool for splitting a single CAR into multiple CARs from the comfort of your terminal.
  Usage
    $ carbites <command>
    Commands
      split
      join
```

<Callout emoji="💡">

  You can run the `carbites` command without installing it globally using the `npx` command, which is included with Node.js:

  ```shell
  npx carbites-cli --help
  ```

  The first time around, it will ask to make sure you want to install the package:

  ```text output
  Need to install the following packages:
    carbites-cli
  Ok to proceed? (y)
  ```

  After that, you can use `npx carbites-cli` instead of `carbites` for any of the commands below!

</Callout>

  #### Splitting CARs

  The `carbites split` command takes a CAR file as input and splits it into multiple smaller CARs. 

  The `--size` flag sets the maximum size of the output CAR files. For uploading to NFT.Storage, `--size` must be less than `100MB`.

  The other important flag is `--strategy`, which determines how the CAR files are split. For NFT.Storage uploads, we need to use the `treewalk` strategy, so that all of our CARs share the same root CID. This will allow the NFT.Storage service to piece them all together again once they've all been uploaded.

  Here's an example, using an input car file called `my-video.car` that weighs in at 455MB:

  ```shell
  carbites split --size 100MB --strategy treewalk my-video.car
  ```

  This will create five new files in the same directory as the input file, named `my-video-0.car` through `my-video-4.car`. If you list their sizes, you can see that all the chunked cars are less than or equal to 100 MB:

  ```shell with-output
  ls -lh my-video*
  ```

  ```
  -rw-r--r--  1 user  staff   100M Sep 15 13:56 my-video-1.car
  -rw-r--r--  1 user  staff   100M Sep 15 13:56 my-video-0.car
  -rw-r--r--  1 user  staff   100M Sep 15 13:56 my-video-2.car
  -rw-r--r--  1 user  staff   100M Sep 15 13:56 my-video-3.car
  -rw-r--r--  1 user  staff    56M Sep 15 13:56 my-video-4.car
  -rw-r--r--  1 user  staff   455M Sep 15 13:52 my-video.car
  ```

  #### Joining CARs

  To combine CARs that have been previously split, you can use the `carbites join` command:

  ```shell
  carbites join my-video-*.car --output my-video-joined.car
  ```
## Using JavaScript code
  The [carbites library][github-carbites-js] provides an interface for splitting CARs that can be invoked from your application code.

<Callout emoji="💡">

  **You probably don't need this!**

  If you're using JavaScript, you can [use the NFT.Storage client][howto-store] to upload your data and let the client take care of CAR splitting for you. If you're sure you want to split CARs from JavaScript yourself, read on!

</Callout>

  To split CARs from your JavaScript code, install the `carbites` package:

  ```shell
  npm install carbites
  ```

  And import the `TreewalkCarSplitter` class into your code:

  ```js
  import { TreewalkCarSplitter } from 'carbites/treewalk'
  ```

  You can create a `TreewalkCarSplitter` by passing in a `CarReader` and a `targetSize` in bytes for the output cars. See the section on @ipld/car for more information on `CarReader`. For now, we'll assume that the `loadLargeCar` function returns a `CarReader`, and we'll use the `TreewalkCarSplitter` to create split CARs:

  ```js
  import { TreewalkCarSplitter } from 'carbites/treewalk'
  async function splitCars() {
    const largeCar = await loadLargeCar()
    const targetSize = 100000000
    const splitter = new TreewalkCarSplitter(largeCar, targetSize)
    for await (const smallCar of splitter.cars()) {
      // Each small car is an AsyncIterable<Uint8Array> of CAR data
      for await (const chunk of smallCar) {
        // Do something with the car data...
        // For example, you could upload it to the NFT.storage HTTP API
        // https://nft.storage/api-docs
      }
      // You can also get the root CID of each small CAR with the getRoots method:
      const roots = await smallCar.getRoots()
      console.log('root cids', roots)
      // Since we're using TreewalkCarSpliter, all the smaller CARs should have the
      // same root CID as the large input CAR.
    }
  }
  ```
## Using Go code
  The [go-carbites](https://github.com/alanshaw/go-carbites) module can be used to split large CARs from your Go applications.

  Install the module with `go get`:

  ```shell
  go get github.com/alanshaw/go-carbites
  ```

  The [`carbites.Split` function](https://pkg.go.dev/github.com/alanshaw/go-carbites#Split) returns a [`carbites.Splitter`](https://pkg.go.dev/github.com/alanshaw/go-carbites#Splitter) that will make sure that the output CARs all have the same root CID, which is important when uploading to NFT.Storage.

  ```go
package main

import (
	"io"
	"os"
	"github.com/alanshaw/go-carbites"
)

func main() {
	bigCar, _ := os.Open("big.car")
	targetSize := 1024 * 1024 // 1MiB chunks
	strategy := carbites.Treewalk
	spltr, _ := carbites.Split(bigCar, targetSize, strategy)

	var i int
	for {
		car, err := spltr.Next()
		if err != nil {
			if err == io.EOF {
				break
			}
			panic(err)
		}
		b, _ := ioutil.ReadAll(car)
		ioutil.WriteFile(fmt.Sprintf("chunk-%d.car", i), b, 0644)
		i++
	}
}
  ```

  You can also use [`NewTreewalkSplitterFromPath`](https://pkg.go.dev/github.com/alanshaw/go-carbites#NewTreewalkSplitterFromPath), which takes a local file path instead of an `io.Reader`.

## Advanced IPLD formats

IPLD can also be used as a general purpose data format like JSON. In fact, you can use JSON directly as IPLD just by using a special convention for linking to other IPLD objects. This convention is defined in the [`dag-json` "codec"](https://ipld.io/docs/codecs/known/dag-json/).

Here's an example of a `dag-json` object:

```json
{
  "name": "Have you seen this dog?",
  "description": "I have now...",
  "image": { "/": "bafybeihkqv2ukwgpgzkwsuz7whmvneztvxglkljbs3zosewgku2cfluvba" }
}
```

The `image` field uses the special "link type" to reference another IPLD object. The link is just a regular JSON object with a single key named `/`, whose value is a Content Identifier.

Although `dag-json` is familiar and easy to use, we recommend using the similar [`dag-cbor` codec](https://ipld.io/docs/codecs/known/dag-cbor/) instead. `dag-cbor` uses the [Concise Binary Object Representation](https://cbor.io) to more efficiently encode data, especially binary data which must be Base64-encoded when using `dag-json`.

You may already be using `dag-cbor` without knowing it! When using the client library's `store` method or the HTTP API's `/store` endpoint, NTF.Storage creates a `dag-cbor` "bundle" that includes the NFT metadata with native IPLD links to all of the files referenced in the NFT, including a JSON version of the metadata for compatibility.



[reference-client-library]: https://nftstorage.github.io/nft.storage/client/
[reference-http-api]: https://nft.storage/api-docs/
[github-ipfs-car]: https://github.com/web3-storage/ipfs-car
[github-carbites-js]: https://github.com/nftstorage/carbites
[ipfs-docs-dag-export]: https://docs.ipfs.io/reference/cli/#ipfs-dag-export
[ipfs-docs-dag-import]: https://docs.ipfs.io/reference/cli/#ipfs-dag-import
[ipfs-docs-dag-get]: https://docs.ipfs.io/reference/cli/#ipfs-dag-get
[car-spec]: https://ipld.io/specs/transport/car/
[wikipedia-tar]: https://en.wikipedia.org/wiki/Tar_(computing)