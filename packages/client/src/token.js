import { pack } from 'ipfs-car/pack'
import { CID } from 'multiformats/cid'
import * as Block from 'multiformats/block'
import { sha256 } from 'multiformats/hashes/sha2'
import * as dagCbor from '@ipld/dag-cbor'
import { Blob, FormData, Blockstore } from './platform.js'
import { toGatewayURL, GATEWAY } from './gateway.js'
import { BlockstoreCarReader } from './bs-car-reader.js'

/**
 * @typedef {import('./gateway.js').GatewayURLOptions} EmbedOptions
 * @typedef {import('./lib/interface.js').TokenInput} TokenInput
 * @typedef {import('ipfs-car/blockstore').Blockstore} Blockstore
 */

/**
 * @template T
 * @typedef {import('./lib/interface.js').Encoded<T, [[Blob, URL]]>} EncodedBlobUrl
 */

/**
 * @template G
 * @typedef {import('./lib/interface.js').Encoded<G, [[Blob, Blob]]>} EncodedBlobBlob
 */

/**
 * @template {import('./lib/interface.js').TokenInput} T
 * @typedef {import('./lib/interface.js').Token<T>} TokenType
 */

/**
 * @template {TokenInput} T
 * @implements {TokenType<T>}
 */
export class Token {
  /**
   * @param {import('./lib/interface.js').CIDString} ipnft
   * @param {import('./lib/interface.js').EncodedURL} url
   * @param {import('./lib/interface.js').Encoded<T, [[Blob, URL]]>} data
   */
  constructor(ipnft, url, data) {
    /** @readonly */
    this.ipnft = ipnft
    /** @readonly */
    this.url = url
    /** @readonly */
    this.data = data

    Object.defineProperties(this, {
      ipnft: { enumerable: true, writable: false },
      url: { enumerable: true, writable: false },
      data: { enumerable: false, writable: false },
    })
  }
  /**
   * @returns {import('./lib/interface.js').Encoded<T, [[Blob, URL]]>}
   */
  embed() {
    return Token.embed(this)
  }

  /**
   * @template {TokenInput} T
   * @param {{data: import('./lib/interface.js').Encoded<T, [[Blob, URL]]>}} token
   * @returns {import('./lib/interface.js').Encoded<T, [[Blob, URL]]>}
   */
  static embed({ data }) {
    return embed(data, { gateway: GATEWAY })
  }

  /**
   * Takes token input, encodes it as a DAG, wraps it in a CAR and creates a new
   * Token instance from it. Where values are discovered `Blob` (or `File`)
   * objects in the given input, they are replaced with IPFS URLs (an `ipfs://`
   * prefixed CID with an optional path).
   *
   * @example
   * ```js
   * const cat = new File(['...'], 'cat.png')
   * const kitty = new File(['...'], 'kitty.png')
   * const { token, car } = await Token.encode({
   *   name: 'hello'
   *   image: cat
   *   properties: {
   *     extra: {
   *       image: kitty
   *     }
   *   }
   * })
   * ```
   *
   * @template {TokenInput} T
   * @param {T} input
   * @returns {Promise<{ cid: CID, token: TokenType<T>, car: import('./lib/interface.js').CarReader }>}
   */
  static async encode(input) {
    const blockstore = new Blockstore()
    const [blobs, meta] = mapTokenInputBlobs(input)
    /** @type {EncodedBlobUrl<T>} */
    const data = JSON.parse(JSON.stringify(meta))
    /** @type {import('./lib/interface.js').Encoded<T, [[Blob, CID]]>} */
    const dag = JSON.parse(JSON.stringify(meta))

    for (const [dotPath, blob] of blobs.entries()) {
      /** @type {string|undefined} */
      // @ts-ignore blob may be a File!
      const name = blob.name || 'blob'
      /** @type {import('./platform.js').ReadableStream} */
      const content = blob.stream()
      const { root: cid } = await pack({
        input: [{ path: name, content }],
        blockstore,
        wrapWithDirectory: true,
      })

      const href = new URL(`ipfs://${cid}/${name}`)
      const path = dotPath.split('.')
      setIn(data, path, href)
      setIn(dag, path, cid)
    }

    const { root: metadataJsonCid } = await pack({
      input: [{ path: 'metadata.json', content: JSON.stringify(data) }],
      blockstore,
      wrapWithDirectory: false,
    })

    const block = await Block.encode({
      value: {
        ...dag,
        'metadata.json': metadataJsonCid,
        type: 'nft',
      },
      codec: dagCbor,
      hasher: sha256,
    })
    await blockstore.put(block.cid, block.bytes)

    return {
      cid: block.cid,
      token: new Token(
        block.cid.toString(),
        `ipfs://${block.cid}/metadata.json`,
        data
      ),
      car: new BlockstoreCarReader(1, [block.cid], blockstore),
    }
  }
}

/**
 * @template T
 * @param {EncodedBlobUrl<T>} input
 * @param {EmbedOptions} options
 * @returns {EncodedBlobUrl<T>}
 */
export const embed = (input, options) =>
  mapWith(input, isURL, embedURL, options)

/**
 * @template {TokenInput} T
 * @param {import('./lib/interface.js').EncodedToken<T>} value
 * @param {Set<string>} paths - Paths were to expect EncodedURLs
 * @returns {Token<T>}
 */
export const decode = ({ ipnft, url, data }, paths) =>
  new Token(ipnft, url, mapWith(data, isEncodedURL, decodeURL, paths))

/**
 * @param {any} value
 * @returns {value is URL}
 */
const isURL = (value) => value instanceof URL

/**
 * @template State
 * @param {State} state
 * @param {import('./lib/interface.js').EncodedURL} url
 * @returns {[State, URL]}
 */
const decodeURL = (state, url) => [state, new URL(url)]

/**
 * @param {EmbedOptions} context
 * @param {URL} url
 * @returns {[EmbedOptions, URL]}
 */
const embedURL = (context, url) => [context, toGatewayURL(url, context)]

/**
 * @param {any} value
 * @returns {value is object}
 */
const isObject = (value) => typeof value === 'object' && value != null

/**
 * @param {any} value
 * @param {Set<string>} assetPaths
 * @param {PropertyKey[]} path
 * @returns {value is import('./lib/interface.js').EncodedURL}
 */
const isEncodedURL = (value, assetPaths, path) =>
  typeof value === 'string' && assetPaths.has(path.join('.'))

/**
 * Takes token input and encodes it into
 * [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
 * object where form field values are discovered `Blob` (or `File`) objects in
 * the given token and field keys are `.` joined paths where they were discoverd
 * in the token. Additionally encoded `FormData` will also have a field
 * named `meta` containing JSON serialized token with blobs and file values
 * `null` set to null (this allows backend to injest all of the files from
 * `multipart/form-data` request and update provided "meta" data with
 * corresponding file ipfs:// URLs)
 *
 * @example
 * ```js
 * const cat = new File([], 'cat.png')
 * const kitty = new File([], 'kitty.png')
 * const form = encode({
 *   name: 'hello'
 *   image: cat
 *   properties: {
 *     extra: {
 *       image: kitty
 *     }
 *   }
 * })
 * [...form.entries()] //>
 * // [
 * //   ['image', cat],
 * //   ['properties.extra.image', kitty],
 * //   ['meta', '{"name":"hello",image:null,"properties":{"extra":{"kitty": null}}}']
 * // ]
 * ```
 *
 * @template {TokenInput} T
 * @param {EncodedBlobBlob<T>} input
 * @returns {FormData}
 */
export const encode = (input) => {
  const [map, meta] = mapValueWith(input, isBlob, encodeBlob, new Map(), [])
  const form = new FormData()
  for (const [k, v] of map.entries()) {
    form.set(k, v)
  }
  form.set('meta', JSON.stringify(meta))
  return form
}

/**
 * @param {Map<string, Blob>} data
 * @param {Blob} blob
 * @param {PropertyKey[]} path
 * @returns {[Map<string, Blob>, void]}
 */
const encodeBlob = (data, blob, path) => {
  data.set(path.join('.'), blob)
  return [data, undefined]
}

/**
 * @param {any} value
 * @returns {value is Blob}
 */
const isBlob = (value) => value instanceof Blob

/**
 * @template {TokenInput} T
 * @param {EncodedBlobBlob<T>} input
 */
const mapTokenInputBlobs = (input) => {
  return mapValueWith(input, isBlob, encodeBlob, new Map(), [])
}

/**
 * Substitues values in the given `input` that match `p(value) == true` with
 * `f(value, context, path)` where `context` is whatever you pass (usually
 * a mutable state) and `path` is a array of keys / indexes where the value
 * was encountered.
 *
 * @template T, I, X, O, State
 * @param {import('./lib/interface.js').Encoded<T, [[I, X]]>} input - Arbitrary input.
 * @param {(input:any, state:State, path:PropertyKey[]) => input is X} p - Predicate function to determine
 * which values to swap.
 * @param {(state:State, input:X, path:PropertyKey[]) => [State, O]} f - Function
 * that swaps matching values.
 * @param {State} state - Some additional context you need in the process.
 * likey you'll start with `[]`.
 * @returns {import('./lib/interface.js').Encoded<T, [[I, O]]>}
 */
export const mapWith = (input, p, f, state) => {
  const [, output] = mapValueWith(input, p, f, state, [])
  return output
}

/**
 * @template T, I, X, O, State
 * @param {import('./lib/interface.js').Encoded<T, [[I, X]]>} input - Arbitrary input.
 * @param {(input:any, state:State, path:PropertyKey[]) => input is X} p - Predicate function to determine
 * which values to swap.
 * @param {(state:State, input:X, path:PropertyKey[]) => [State, O]} f - Function
 * that swaps matching values.
 * @param {State} state - Some additional context you need in the process.
 * @param {PropertyKey[]} path - Path where the value was encountered. Most
 * likey you'll start with `[]`.
 * @returns {[State, import('./lib/interface.js').Encoded<T, [[I, O]]>]}
 */
const mapValueWith = (input, p, f, state, path) =>
  p(input, state, path)
    ? f(state, input, path)
    : Array.isArray(input)
    ? mapArrayWith(input, p, f, state, path)
    : isObject(input)
    ? mapObjectWith(input, p, f, state, path)
    : [state, /** @type {any} */ (input)]

/**
 * Just like `mapWith` except
 *
 * @template State, T, I, X, O
 * @param {import('./lib/interface.js').Encoded<T, [[I, X]]>} input
 * @param {(input:any, state:State, path:PropertyKey[]) => input is X} p
 * @param {(state: State, input:X, path:PropertyKey[]) => [State, O]} f
 * @param {State} init
 * @param {PropertyKey[]} path
 * @returns {[State, import('./lib/interface.js').Encoded<T, [[I, O]]>]}
 */
const mapObjectWith = (input, p, f, init, path) => {
  let state = init
  const output =
    /** @type {import('./lib/interface.js').Encoded<T, [[I, O]]>} */ ({})
  for (const [key, value] of Object.entries(input)) {
    const [next, out] = mapValueWith(value, p, f, state, [...path, key])
    // @ts-ignore
    output[key] = out
    state = next
  }
  return [state, output]
}

/**
 * Just like `mapWith` except for Arrays.
 *
 * @template I, X, O, State
 * @template {any[]} T
 * @param {T} input
 * @param {(input:any, state:State, path:PropertyKey[]) => input is X} p
 * @param {(state: State, input:X, path:PropertyKey[]) => [State, O]} f
 * @param {State} init
 * @param {PropertyKey[]} path
 * @returns {[State, import('./lib/interface.js').Encoded<T, [[I, O]]>]}
 */
const mapArrayWith = (input, p, f, init, path) => {
  const output = /** @type {unknown[]} */ ([])

  let state = init
  for (const [index, element] of input.entries()) {
    const [next, out] = mapValueWith(element, p, f, state, [...path, index])
    output[index] = out
    state = next
  }

  return [
    state,
    /** @type {import('./lib/interface.js').Encoded<T, [[I, O]]>} */ (output),
  ]
}

/**
 * Sets a given `value` at the given `path` on a passed `object`.
 *
 * @example
 * ```js
 * const obj = { a: { b: { c: 1 }}}
 * setIn(obj, ['a', 'b', 'c'], 5)
 * obj.a.b.c //> 5
 * ```
 *
 * @template V
 * @param {any} object
 * @param {string[]} path
 * @param {V} value
 */
const setIn = (object, path, value) => {
  const n = path.length - 1
  let target = object
  for (let [index, key] of path.entries()) {
    if (index === n) {
      target[key] = value
    } else {
      target = target[key]
    }
  }
}
