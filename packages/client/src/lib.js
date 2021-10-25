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
import pRetry from 'p-retry'
import { TreewalkCarSplitter } from 'carbites/treewalk'
import * as API from './lib/interface.js'
import * as Token from './token.js'
import { fetch, File, Blob, FormData } from './platform.js'
import { toGatewayURL } from './gateway.js'

const MAX_STORE_RETRIES = 5
const MAX_CONCURRENT_UPLOADS = 3
const MAX_CHUNK_SIZE = 1024 * 1024 * 10 // chunk to ~10MB CARs

/** @typedef {import('multiformats/block').BlockDecoder<any, any>} AnyBlockDecoder */

/**
 * @implements API.Service
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
   * @param {{token: string, endpoint?:URL}} options
   */
  constructor({ token, endpoint = new URL('https://api.nft.storage') }) {
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
  }

  /**
   * @hidden
   * @param {string} token
   */
  static auth(token) {
    if (!token) throw new Error('missing token')
    return { Authorization: `Bearer ${token}` }
  }
  /**
   * @param {API.Service} service
   * @param {Blob} blob
   * @returns {Promise<API.CIDString>}
   */
  static async storeBlob({ endpoint, token }, blob) {
    const url = new URL(`upload/`, endpoint)

    if (blob.size === 0) {
      throw new Error('Content size is 0, make sure to provide some content')
    }

    const request = await fetch(url.toString(), {
      method: 'POST',
      headers: NFTStorage.auth(token),
      body: blob,
    })
    const result = await request.json()

    if (result.ok) {
      return result.value.cid
    } else {
      throw new Error(result.error.message)
    }
  }
  /**
   * @param {API.Service} service
   * @param {Blob|API.CarReader} car
   * @param {{
   *   onStoredChunk?: (size: number) => void
   *   decoders?: AnyBlockDecoder[]
   * }} [options]
   * @returns {Promise<API.CIDString>}
   */
  static async storeCar(
    { endpoint, token },
    car,
    { onStoredChunk, decoders } = {}
  ) {
    const targetSize = MAX_CHUNK_SIZE
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
        const carFile = new Blob(carParts, {
          type: 'application/car',
        })
        const res = await pRetry(
          () => NFTStorage.storeBlob({ endpoint, token }, carFile),
          { retries: MAX_STORE_RETRIES }
        )
        onStoredChunk && onStoredChunk(carFile.size)
        return res
      }
    )

    let root
    for await (const cid of upload(splitter.cars())) {
      root = cid
    }

    return /** @type {API.CIDString} */ (root)
  }
  /**
   * @param {API.Service} service
   * @param {Iterable<File>} files
   * @returns {Promise<API.CIDString>}
   */
  static async storeDirectory({ endpoint, token }, files) {
    const url = new URL(`upload/`, endpoint)
    const body = new FormData()
    let size = 0
    for (const file of files) {
      body.append('file', file, file.name)
      size += file.size
    }

    if (size === 0) {
      throw new Error(
        'Total size of files should exceed 0, make sure to provide some content'
      )
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: NFTStorage.auth(token),
      body,
    })
    const result = await response.json()

    if (result.ok) {
      return result.value.cid
    } else {
      throw new Error(result.error.message)
    }
  }

  /**
   * @template {API.TokenInput} T
   * @param {API.Service} service
   * @param {T} metadata
   * @returns {Promise<API.Token<T>>}
   */
  static async store({ endpoint, token }, metadata) {
    validateERC1155(metadata)

    const url = new URL(`store/`, endpoint)
    const body = Token.encode(metadata)
    const paths = new Set(body.keys())

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: NFTStorage.auth(token),
      body,
    })

    /** @type {API.StoreResponse<T>} */
    const result = await response.json()

    if (result.ok === true) {
      const { value } = result
      return Token.decode(value, paths)
    } else {
      throw new Error(result.error.message)
    }
  }
  /**
   * @param {API.Service} service
   * @param {string} cid
   * @returns {Promise<API.StatusResult>}
   */
  static async status({ endpoint, token }, cid) {
    const url = new URL(`${cid}/`, endpoint)
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: NFTStorage.auth(token),
    })
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
   * @param {API.PublicService} service
   * @param {string} cid
   * @returns {Promise<API.CheckResult>}
   */
  static async check({ endpoint }, cid) {
    const url = new URL(`check/${cid}/`, endpoint)
    const response = await fetch(url.toString())
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
   * @param {API.Service} service
   * @param {string} cid
   * @returns {Promise<void>}
   */
  static async delete({ endpoint, token }, cid) {
    const url = new URL(`${cid}/`, endpoint)
    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: NFTStorage.auth(token),
    })
    const result = await response.json()
    if (!result.ok) {
      throw new Error(result.error.message)
    }
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
   */
  storeBlob(blob) {
    return NFTStorage.storeBlob(this, blob)
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
   * @param {Blob|API.CarReader} car
   * @param {object} [options]
   * @param {(size: number) => void} [options.onStoredChunk] Callback called
   * after each chunk of data has been uploaded. By default, data is split into
   * chunks of around 10MB. It is passed the actual chunk size in bytes.
   * @param {AnyBlockDecoder[]} [options.decoders] Additional IPLD block
   * decoders. Used to interpret the data in the CAR file and split it into
   * multiple chunks. Note these are only required if the CAR file was not
   * encoded using the default encoders: `dag-pb`, `dag-cbor` and `raw`.
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
   * @param {Iterable<File>} files
   */
  storeDirectory(files) {
    return NFTStorage.storeDirectory(this, files)
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
   */
  status(cid) {
    return NFTStorage.status(this, cid)
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
   */
  delete(cid) {
    return NFTStorage.delete(this, cid)
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
   */
  check(cid) {
    return NFTStorage.check(this, cid)
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
   * @template {API.TokenInput} T
   * @param {T} token
   * @returns {Promise<API.Token<T>>}
   */
  store(token) {
    return NFTStorage.store(this, token)
  }
}

/**
 * @param {API.TokenInput} metadata
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
 * @param {API.Deal[]} deals
 * @returns {API.Deal[]}
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
 * @param {API.Pin} pin
 * @returns {API.Pin}
 */
const decodePin = (pin) => ({ ...pin, created: new Date(pin.created) })

const TokenModel = Token.Token
export { TokenModel as Token }
export { NFTStorage, File, Blob, FormData, toGatewayURL }

/**
 * Just to verify API compatibility.
 * @type {API.API}
 */
const api = NFTStorage
void api
