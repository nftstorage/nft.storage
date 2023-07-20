/**
 * A client library for the https://nft.storage/ service. It provides a convenient
 * interface for working with the [Raw HTTP API](https://nft.storage/#api-docs)
 * from a web browser or [Node.js](https://nodejs.org/) and comes bundled with
 * TS for out-of-the box type inference and better IntelliSense.
 *
 * @example
 * ```js
 * import { NFTStorage, File, Blob } from "nft.storage"
 * const client = new NFTStorage({ token: API_TOKEN })
 *
 * const cid = await client.storeBlob(new Blob(['hello world']))
 * ```
 * @module
 */

import { transform } from 'streaming-iterables'
import pRetry, { AbortError } from 'p-retry'
import { TreewalkCarSplitter } from 'carbites/treewalk'
import { pack } from 'ipfs-car/pack'
import { CID } from 'multiformats/cid'
import throttledQueue from 'throttled-queue'
import * as Token from './token.js'
import { fetch, File, Blob, FormData, Blockstore } from './platform.js'
import { toGatewayURL } from './gateway.js'
import { BlockstoreCarReader } from './bs-car-reader.js'
import pipe from 'it-pipe'

const MAX_STORE_RETRIES = 5
const MAX_CONCURRENT_UPLOADS = 3
const MAX_CHUNK_SIZE = 1024 * 1024 * 50 // chunk to ~50MB CARs
const RATE_LIMIT_REQUESTS = 30
const RATE_LIMIT_PERIOD = 10 * 1000

/**
 * @typedef {import('./lib/interface.js').Service} Service
 * @typedef {import('./lib/interface.js').CIDString} CIDString
 * @typedef {import('./lib/interface.js').Deal} Deal
 * @typedef {import('./lib/interface.js').FileObject} FileObject
 * @typedef {import('./lib/interface.js').FilesSource} FilesSource
 * @typedef {import('./lib/interface.js').Pin} Pin
 * @typedef {import('./lib/interface.js').CarReader} CarReader
 * @typedef {import('ipfs-car/blockstore').Blockstore} BlockstoreI
 * @typedef {import('./lib/interface.js').RateLimiter} RateLimiter
 * @typedef {import('./lib/interface.js').RequestOptions} RequestOptions
 */

/**
 * @returns {RateLimiter}
 */
export function createRateLimiter() {
  const throttle = throttledQueue(RATE_LIMIT_REQUESTS, RATE_LIMIT_PERIOD)
  return () => throttle(() => {})
}

/**
 * Rate limiter used by static API if no rate limiter is passed. Note that each
 * instance of the NFTStorage class gets it's own limiter if none is passed.
 * This is because rate limits are enforced per API token.
 */
const globalRateLimiter = createRateLimiter()

/**
 * @template {import('./lib/interface.js').TokenInput} T
 * @typedef {import('./lib/interface.js').Token<T>} TokenType
 */

/**
 * @implements {Service}
 */
class NFTStorage {
  /**
   * Constructs a client bound to the given `options.token` and
   * `options.endpoint`.
   *
   * @example
   * ```js
   * import { NFTStorage, File, Blob } from "nft.storage"
   * const client = new NFTStorage({ token: API_TOKEN })
   *
   * const cid = await client.storeBlob(new Blob(['hello world']))
   * ```
   * Optionally you could pass an alternative API endpoint (e.g. for testing)
   * @example
   * ```js
   * import { NFTStorage } from "nft.storage"
   * const client = new NFTStorage({
   *   token: API_TOKEN
   *   endpoint: new URL('http://localhost:8080/')
   * })
   * ```
   *
   * @param {{token: string, endpoint?: URL, rateLimiter?: RateLimiter, did?: string}} options
   */
  constructor({
    token,
    did,
    endpoint = new URL('https://api.nft.storage'),
    rateLimiter,
  }) {
    /**
     * Authorization token.
     *
     * @readonly
     */
    this.token = token
    /**
     * Service API endpoint `URL`.
     * @readonly
     */
    this.endpoint = endpoint
    /**
     * @readonly
     */
    this.rateLimiter = rateLimiter || createRateLimiter()

    /**
     * @readonly
     */
    this.did = did
  }

  /**
   * @hidden
   * @param {object} options
   * @param {string} options.token
   * @param {string} [options.did]
   */
  static auth({ token, did }) {
    if (!token) throw new Error('missing token')
    return {
      Authorization: `Bearer ${token}`,
      'X-Client': 'nft.storage/js',
      ...(did ? { 'x-agent-did': did } : {}),
    }
  }

  /**
   * Stores a single file and returns its CID.
   *
   * @param {Service} service
   * @param {Blob} blob
   * @param {RequestOptions} [options]
   * @returns {Promise<CIDString>}
   */
  static async storeBlob(service, blob, options) {
    const blockstore = new Blockstore()
    let cidString

    try {
      const { cid, car } = await NFTStorage.encodeBlob(blob, { blockstore })
      await NFTStorage.storeCar(service, car, options)
      cidString = cid.toString()
    } finally {
      await blockstore.close()
    }

    return cidString
  }

  /**
   * Stores a CAR file and returns its root CID.
   *
   * @param {Service} service
   * @param {Blob|CarReader} car
   * @param {import('./lib/interface.js').CarStorerOptions} [options]
   * @returns {Promise<CIDString>}
   */
  static async storeCar(
    { endpoint, rateLimiter = globalRateLimiter, ...token },
    car,
    { onStoredChunk, maxRetries, maxChunkSize, decoders, signal } = {}
  ) {
    const url = new URL('upload/', endpoint)
    const headers = {
      ...NFTStorage.auth(token),
      'Content-Type': 'application/car',
    }
    const targetSize = maxChunkSize || MAX_CHUNK_SIZE
    const splitter =
      car instanceof Blob
        ? await TreewalkCarSplitter.fromBlob(car, targetSize, { decoders })
        : new TreewalkCarSplitter(car, targetSize, { decoders })

    const upload = transform(
      MAX_CONCURRENT_UPLOADS,
      async function (/** @type {AsyncIterable<Uint8Array>} */ car) {
        const carParts = []
        for await (const part of car) {
          carParts.push(part)
        }
        const carFile = new Blob(carParts, { type: 'application/car' })
        /** @type {Blob|ArrayBuffer} */
        let body = carFile
        // FIXME: should not be necessary to await arrayBuffer()!
        // Node.js 20 hangs reading the stream (it never ends) but in
        // older node versions and the browser it is fine to pass a blob.
        /* c8 ignore next 3 */
        if (parseInt(globalThis.process?.versions?.node) > 18) {
          body = await body.arrayBuffer()
        }
        const cid = await pRetry(
          async () => {
            await rateLimiter()
            /** @type {Response} */
            let response
            try {
              response = await fetch(url.toString(), {
                method: 'POST',
                headers,
                body,
                signal,
              })
            } catch (/** @type {any} */ err) {
              // TODO: remove me and test when client accepts custom fetch impl
              /* c8 ignore next 1 */
              throw signal && signal.aborted ? new AbortError(err) : err
            }
            /* c8 ignore next 3 */
            if (response.status === 429) {
              throw new Error('rate limited')
            }
            const result = await response.json()
            if (!result.ok) {
              // do not retry if unauthorized - will not succeed
              if (response.status === 401) {
                throw new AbortError(result.error.message)
              }
              throw new Error(result.error.message)
            }
            return result.value.cid
          },
          {
            retries: maxRetries == null ? MAX_STORE_RETRIES : maxRetries,
          }
        )
        onStoredChunk && onStoredChunk(carFile.size)
        return cid
      }
    )

    let root
    for await (const cid of upload(splitter.cars())) {
      root = cid
    }

    return /** @type {CIDString} */ (root)
  }

  /**
   * Stores a directory of files and returns a CID. Provided files **MUST**
   * be within the same directory, otherwise error is raised e.g. `foo/bar.png`,
   * `foo/bla/baz.json` is ok but `foo/bar.png`, `bla/baz.json` is not.
   *
   * @param {Service} service
   * @param {FilesSource} filesSource
   * @param {RequestOptions} [options]
   * @returns {Promise<CIDString>}
   */
  static async storeDirectory(service, filesSource, options) {
    const blockstore = new Blockstore()
    let cidString
    try {
      const { cid, car } = await NFTStorage.encodeDirectory(filesSource, {
        blockstore,
      })
      await NFTStorage.storeCar(service, car, options)
      cidString = cid.toString()
    } finally {
      await blockstore.close()
    }

    return cidString
  }

  /**
   * Stores the given token and all resources it references (in the form of a
   * File or a Blob) along with a metadata JSON as specificed in ERC-1155. The
   * `token.image` must be either a `File` or a `Blob` instance, which will be
   * stored and the corresponding content address URL will be saved in the
   * metadata JSON file under `image` field.
   *
   * If `token.properties` contains properties with `File` or `Blob` values,
   * those also get stored and their URLs will be saved in the metadata JSON
   * file in their place.
   *
   * Note: URLs for `File` objects will retain file names e.g. in case of
   * `new File([bytes], 'cat.png', { type: 'image/png' })` will be transformed
   * into a URL that looks like `ipfs://bafy...hash/image/cat.png`. For `Blob`
   * objects, the URL will not have a file name name or mime type, instead it
   * will be transformed into a URL that looks like
   * `ipfs://bafy...hash/image/blob`.
   *
   * @template {import('./lib/interface.js').TokenInput} T
   * @param {Service} service
   * @param {T} metadata
   * @param {RequestOptions} [options]
   * @returns {Promise<TokenType<T>>}
   */
  static async store(service, metadata, options) {
    const { token, car } = await NFTStorage.encodeNFT(metadata)
    await NFTStorage.storeCar(service, car, options)
    return token
  }

  /**
   * Returns current status of the stored NFT by its CID. Note the NFT must
   * have previously been stored by this account.
   *
   * @param {Service} service
   * @param {string} cid
   * @param {RequestOptions} [options]
   * @returns {Promise<import('./lib/interface.js').StatusResult>}
   */
  static async status(
    { endpoint, rateLimiter = globalRateLimiter, ...token },
    cid,
    options
  ) {
    const url = new URL(`${cid}/`, endpoint)
    await rateLimiter()
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: NFTStorage.auth(token),
      signal: options && options.signal,
    })
    /* c8 ignore next 3 */
    if (response.status === 429) {
      throw new Error('rate limited')
    }
    const result = await response.json()

    if (result.ok) {
      return {
        cid: result.value.cid,
        deals: decodeDeals(result.value.deals),
        size: result.value.size,
        pin: decodePin(result.value.pin),
        created: new Date(result.value.created),
      }
    } else {
      throw new Error(result.error.message)
    }
  }

  /**
   * Check if a CID of an NFT is being stored by NFT.Storage.
   *
   * @param {import('./lib/interface.js').PublicService} service
   * @param {string} cid
   * @param {RequestOptions} [options]
   * @returns {Promise<import('./lib/interface.js').CheckResult>}
   */
  static async check(
    { endpoint, rateLimiter = globalRateLimiter },
    cid,
    options
  ) {
    const url = new URL(`check/${cid}/`, endpoint)
    await rateLimiter()
    const response = await fetch(url.toString(), {
      signal: options && options.signal,
    })
    /* c8 ignore next 3 */
    if (response.status === 429) {
      throw new Error('rate limited')
    }
    const result = await response.json()

    if (result.ok) {
      return {
        cid: result.value.cid,
        deals: decodeDeals(result.value.deals),
        pin: result.value.pin,
      }
    } else {
      throw new Error(result.error.message)
    }
  }

  /**
   * Removes stored content by its CID from this account. Please note that
   * even if content is removed from the service other nodes that have
   * replicated it might still continue providing it.
   *
   * @param {Service} service
   * @param {string} cid
   * @param {RequestOptions} [options]
   * @returns {Promise<void>}
   */
  static async delete(
    { endpoint, rateLimiter = globalRateLimiter, ...token },
    cid,
    options
  ) {
    const url = new URL(`${cid}/`, endpoint)
    await rateLimiter()
    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: NFTStorage.auth(token),
      signal: options && options.signal,
    })
    /* c8 ignore next 3 */
    if (response.status === 429) {
      throw new Error('rate limited')
    }
    const result = await response.json()
    if (!result.ok) {
      throw new Error(result.error.message)
    }
  }

  /**
   * Encodes the given token and all resources it references (in the form of a
   * File or a Blob) along with a metadata JSON as specificed in ERC-1155 to a
   * CAR file. The `token.image` must be either a `File` or a `Blob` instance,
   * which will be stored and the corresponding content address URL will be
   * saved in the metadata JSON file under `image` field.
   *
   * If `token.properties` contains properties with `File` or `Blob` values,
   * those also get stored and their URLs will be saved in the metadata JSON
   * file in their place.
   *
   * Note: URLs for `File` objects will retain file names e.g. in case of
   * `new File([bytes], 'cat.png', { type: 'image/png' })` will be transformed
   * into a URL that looks like `ipfs://bafy...hash/image/cat.png`. For `Blob`
   * objects, the URL will not have a file name name or mime type, instead it
   * will be transformed into a URL that looks like
   * `ipfs://bafy...hash/image/blob`.
   *
   * @example
   * ```js
   * const { token, car } = await NFTStorage.encodeNFT({
   *   name: 'nft.storage store test',
   *   description: 'Test ERC-1155 compatible metadata.',
   *   image: new File(['<DATA>'], 'pinpie.jpg', { type: 'image/jpg' }),
   *   properties: {
   *     custom: 'Custom data can appear here, files are auto uploaded.',
   *     file: new File(['<DATA>'], 'README.md', { type: 'text/plain' }),
   *   }
   * })
   *
   * console.log('IPFS URL for the metadata:', token.url)
   * console.log('metadata.json contents:\n', token.data)
   * console.log('metadata.json with IPFS gateway URLs:\n', token.embed())
   *
   * // Now store the CAR file on NFT.Storage
   * await client.storeCar(car)
   * ```
   *
   * @template {import('./lib/interface.js').TokenInput} T
   * @param {T} input
   * @returns {Promise<{ cid: CID, token: TokenType<T>, car: CarReader }>}
   */
  static async encodeNFT(input) {
    validateERC1155(input)
    return Token.Token.encode(input)
  }

  /**
   * Encodes a single file to a CAR file and also returns its root CID.
   *
   * @example
   * ```js
   * const content = new Blob(['hello world'])
   * const { cid, car } = await NFTStorage.encodeBlob(content)
   *
   * // Root CID of the file
   * console.log(cid.toString())
   *
   * // Now store the CAR file on NFT.Storage
   * await client.storeCar(car)
   * ```
   *
   * @param {Blob} blob
   * @param {object} [options]
   * @param {BlockstoreI} [options.blockstore]
   * @returns {Promise<{ cid: CID, car: CarReader }>}
   */
  static async encodeBlob(blob, { blockstore } = {}) {
    if (blob.size === 0) {
      throw new Error('Content size is 0, make sure to provide some content')
    }
    return packCar([toImportCandidate('blob', blob)], {
      blockstore,
      wrapWithDirectory: false,
    })
  }

  /**
   * Encodes a directory of files to a CAR file and also returns the root CID.
   * Provided files **MUST** be within the same directory, otherwise error is
   * raised e.g. `foo/bar.png`, `foo/bla/baz.json` is ok but `foo/bar.png`,
   * `bla/baz.json` is not.
   *
   * @example
   * ```js
   * const { cid, car } = await NFTStorage.encodeDirectory([
   *   new File(['hello world'], 'hello.txt'),
   *   new File([JSON.stringify({'from': 'incognito'}, null, 2)], 'metadata.json')
   * ])
   *
   * // Root CID of the directory
   * console.log(cid.toString())
   *
   * // Now store the CAR file on NFT.Storage
   * await client.storeCar(car)
   * ```
   *
   * @param {FilesSource} files
   * @param {object} [options]
   * @param {BlockstoreI} [options.blockstore]
   * @returns {Promise<{ cid: CID, car: CarReader }>}
   */
  static async encodeDirectory(files, { blockstore } = {}) {
    let size = 0
    const input = pipe(files, async function* (files) {
      for await (const file of files) {
        yield toImportCandidate(file.name, file)
        size += file.size
      }
    })
    const packed = await packCar(input, {
      blockstore,
      wrapWithDirectory: true,
    })
    if (size === 0) {
      throw new Error(
        'Total size of files should exceed 0, make sure to provide some content'
      )
    }
    return packed
  }

  // Just a sugar so you don't have to pass around endpoint and token around.

  /**
   * Stores a single file and returns the corresponding Content Identifier (CID).
   * Takes a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob)
   * or a [File](https://developer.mozilla.org/en-US/docs/Web/API/File). Note
   * that no file name or file metadata is retained.
   *
   * @example
   * ```js
   * const content = new Blob(['hello world'])
   * const cid = await client.storeBlob(content)
   * cid //> 'zdj7Wn9FQAURCP6MbwcWuzi7u65kAsXCdjNTkhbJcoaXBusq9'
   * ```
   *
   * @param {Blob} blob
   * @param {RequestOptions} [options]
   */
  storeBlob(blob, options) {
    return NFTStorage.storeBlob(this, blob, options)
  }

  /**
   * Stores files encoded as a single [Content Addressed Archive
   * (CAR)](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md).
   *
   * Takes a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob)
   * or a [File](https://developer.mozilla.org/en-US/docs/Web/API/File).
   *
   * Returns the corresponding Content Identifier (CID).
   *
   * See the [`ipfs-car` docs](https://www.npmjs.com/package/ipfs-car) for more
   * details on packing a CAR file.
   *
   * @example
   * ```js
   * import { pack } from 'ipfs-car/pack'
   * import { CarReader } from '@ipld/car'
   * const { out, root } = await pack({
   *  input: fs.createReadStream('pinpie.pdf')
   * })
   * const expectedCid = root.toString()
   * const carReader = await CarReader.fromIterable(out)
   * const cid = await storage.storeCar(carReader)
   * console.assert(cid === expectedCid)
   * ```
   *
   * @example
   * ```
   * import { packToBlob } from 'ipfs-car/pack/blob'
   * const data = 'Hello world'
   * const { root, car } = await packToBlob({ input: [new TextEncoder().encode(data)] })
   * const expectedCid = root.toString()
   * const cid = await client.storeCar(car)
   * console.assert(cid === expectedCid)
   * ```
   * @param {Blob|CarReader} car
   * @param {import('./lib/interface.js').CarStorerOptions} [options]
   */
  storeCar(car, options) {
    return NFTStorage.storeCar(this, car, options)
  }

  /**
   * Stores a directory of files and returns a CID for the directory.
   *
   * @example
   * ```js
   * const cid = await client.storeDirectory([
   *   new File(['hello world'], 'hello.txt'),
   *   new File([JSON.stringify({'from': 'incognito'}, null, 2)], 'metadata.json')
   * ])
   * cid //>
   * ```
   *
   * Argument can be a [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList)
   * instance as well, in which case directory structure will be retained.
   *
   * @param {FilesSource} files
   * @param {RequestOptions} [options]
   */
  storeDirectory(files, options) {
    return NFTStorage.storeDirectory(this, files, options)
  }

  /**
   * Returns current status of the stored NFT by its CID. Note the NFT must
   * have previously been stored by this account.
   *
   * @example
   * ```js
   * const status = await client.status('zdj7Wn9FQAURCP6MbwcWuzi7u65kAsXCdjNTkhbJcoaXBusq9')
   * ```
   *
   * @param {string} cid
   * @param {RequestOptions} [options]
   */
  status(cid, options) {
    return NFTStorage.status(this, cid, options)
  }

  /**
   * Removes stored content by its CID from the service.
   *
   * > Please note that even if content is removed from the service other nodes
   * that have replicated it might still continue providing it.
   *
   * @example
   * ```js
   * await client.delete('zdj7Wn9FQAURCP6MbwcWuzi7u65kAsXCdjNTkhbJcoaXBusq9')
   * ```
   *
   * @param {string} cid
   * @param {RequestOptions} [options]
   */
  delete(cid, options) {
    return NFTStorage.delete(this, cid, options)
  }

  /**
   * Check if a CID of an NFT is being stored by nft.storage. Throws if the NFT
   * was not found.
   *
   * @example
   * ```js
   * const status = await client.check('zdj7Wn9FQAURCP6MbwcWuzi7u65kAsXCdjNTkhbJcoaXBusq9')
   * ```
   *
   * @param {string} cid
   * @param {RequestOptions} [options]
   */
  check(cid, options) {
    return NFTStorage.check(this, cid, options)
  }

  /**
   * Stores the given token and all resources it references (in the form of a
   * File or a Blob) along with a metadata JSON as specificed in
   * [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155#metadata). The
   * `token.image` must be either a `File` or a `Blob` instance, which will be
   * stored and the corresponding content address URL will be saved in the
   * metadata JSON file under `image` field.
   *
   * If `token.properties` contains properties with `File` or `Blob` values,
   * those also get stored and their URLs will be saved in the metadata JSON
   * file in their place.
   *
   * Note: URLs for `File` objects will retain file names e.g. in case of
   * `new File([bytes], 'cat.png', { type: 'image/png' })` will be transformed
   * into a URL that looks like `ipfs://bafy...hash/image/cat.png`. For `Blob`
   * objects, the URL will not have a file name name or mime type, instead it
   * will be transformed into a URL that looks like
   * `ipfs://bafy...hash/image/blob`.
   *
   * @example
   * ```js
   * const metadata = await client.store({
   *   name: 'nft.storage store test',
   *   description: 'Test ERC-1155 compatible metadata.',
   *   image: new File(['<DATA>'], 'pinpie.jpg', { type: 'image/jpg' }),
   *   properties: {
   *     custom: 'Custom data can appear here, files are auto uploaded.',
   *     file: new File(['<DATA>'], 'README.md', { type: 'text/plain' }),
   *   }
   * })
   *
   * console.log('IPFS URL for the metadata:', metadata.url)
   * console.log('metadata.json contents:\n', metadata.data)
   * console.log('metadata.json with IPFS gateway URLs:\n', metadata.embed())
   * ```
   *
   * @template {import('./lib/interface.js').TokenInput} T
   * @param {T} token
   * @param {RequestOptions} [options]
   */
  store(token, options) {
    return NFTStorage.store(this, token, options)
  }
}

/**
 * Cast an iterable to an asyncIterable
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {AsyncIterable<T>}
 */
export function toAsyncIterable(iterable) {
  return (async function* () {
    for (const item of iterable) {
      yield item
    }
  })()
}

/**
 * @template {import('./lib/interface.js').TokenInput} T
 * @param {T} metadata
 */
const validateERC1155 = ({ name, description, image, decimals }) => {
  // Just validate that expected fields are present
  if (typeof name !== 'string') {
    throw new TypeError(
      'string property `name` identifying the asset is required'
    )
  }
  if (typeof description !== 'string') {
    throw new TypeError(
      'string property `description` describing asset is required'
    )
  }
  if (!(image instanceof Blob)) {
    throw new TypeError('property `image` must be a Blob or File object')
  } else if (!image.type.startsWith('image/')) {
    console.warn(`According to ERC721 Metadata JSON Schema 'image' must have 'image/*' mime type.

For better interoperability we would highly recommend storing content with different mime type under 'properties' namespace e.g. \`properties: { video: file }\` and using 'image' field for storing a preview image for it instead.

For more context please see ERC-721 specification https://eips.ethereum.org/EIPS/eip-721`)
  }

  if (typeof decimals !== 'undefined' && typeof decimals !== 'number') {
    throw new TypeError('property `decimals` must be an integer value')
  }
}

/**
 * @param {import('ipfs-car/pack').ImportCandidateStream|Array<{ path: string, content: import('./platform.js').ReadableStream }>} input
 * @param {object} [options]
 * @param {BlockstoreI} [options.blockstore]
 * @param {boolean} [options.wrapWithDirectory]
 */
const packCar = async (input, { blockstore, wrapWithDirectory } = {}) => {
  /* c8 ignore next 1 */
  blockstore = blockstore || new Blockstore()
  const { root: cid } = await pack({ input, blockstore, wrapWithDirectory })
  const car = new BlockstoreCarReader(1, [cid], blockstore)
  return { cid, car }
}

/**
 * @param {Deal[]} deals
 * @returns {Deal[]}
 */
const decodeDeals = (deals) =>
  deals.map((deal) => {
    const { dealActivation, dealExpiration, lastChanged } = {
      dealExpiration: null,
      dealActivation: null,
      ...deal,
    }

    return {
      ...deal,
      lastChanged: new Date(lastChanged),
      ...(dealActivation && { dealActivation: new Date(dealActivation) }),
      ...(dealExpiration && { dealExpiration: new Date(dealExpiration) }),
    }
  })

/**
 * @param {Pin} pin
 * @returns {Pin}
 */
const decodePin = (pin) => ({ ...pin, created: new Date(pin.created) })

/**
 * Convert the passed blob to an "import candidate" - an object suitable for
 * passing to the ipfs-unixfs-importer. Note: content is an accessor so that
 * the stream is created only when needed.
 *
 * @param {string} path
 * @param {Pick<Blob, 'stream'>|{ stream: () => AsyncIterable<Uint8Array> }} blob
 * @returns {import('ipfs-core-types/src/utils.js').ImportCandidate}
 */
function toImportCandidate(path, blob) {
  /** @type {AsyncIterable<Uint8Array>} */
  let stream
  return {
    path,
    get content() {
      stream = stream || blob.stream()
      return stream
    },
  }
}

export { NFTStorage, File, Blob, FormData, toGatewayURL, Token }
