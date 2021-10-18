import { pack } from 'ipfs-car/pack'
import { CID } from 'multiformats/cid'
import * as Block from 'multiformats/block'
import { sha256 } from 'multiformats/hashes/sha2'
import * as dagCbor from '@ipld/dag-cbor'
import * as API from './lib/interface.js'
import { Blob } from './platform.js'
import { toGatewayURL, GATEWAY } from './gateway.js'

/**
 * @typedef {import('./gateway.js').GatewayURLOptions} EmbedOptions
 * @typedef {import('./lib/interface.js').TokenInput} TokenInput
 * @typedef {import('ipfs-car/blockstore').Blockstore} Blockstore
 */

/**
 * @template T
 * @typedef {import('./lib/interface').Encoded<T, [[Blob, URL]]>} EncodedBlobUrl
 */

/**
 * @template G
 * @typedef {import('./lib/interface').Encoded<G, [[Blob, Blob]]>} EncodedBlobBlob
 */

/**
 * @template {import('./lib/interface.js').TokenInput} T
 * @implements {Token<T>}
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
 * @param {import('./lib/interface').EncodedToken<T>} value
 * @param {Set<string>} paths - Paths were to expect EncodedURLs
 * @returns {Token<T>}
 */
export const decode = ({ ipnft, url, data }, paths) =>
  new Token(ipnft, url, mapWith(data, isEncodedURL, decodeURL, paths))

/**
 * @param {any} value
 * @returns {value is URL}
 */
const isURL = value => value instanceof URL

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
const isObject = value => typeof value === 'object' && value != null

/**
 * @param {any} value
 * @param {Set<string>} assetPaths
 * @param {PropertyKey[]} path
 * @returns {value is import('./lib/interface.js').EncodedURL}
 */
const isEncodedURL = (value, assetPaths, path) =>
  typeof value === 'string' && assetPaths.has(path.join('.'))

/**
 * Takes token input and encodes it into a Token object. Where values are
 * discovered `Blob` (or `File`) objects in the given input, they are replaced
 * with IPFS URLs (an `ipfs://` prefixed CID with an optional path).
 *
 * The passed blockstore is used to store the DAG that is created. The root CID
 * of which is `token.ipnft`.
 *
 * @example
 * ```js
 * const cat = new File([], 'cat.png')
 * const kitty = new File([], 'kitty.png')
 * const token = await encode({
 *   name: 'hello'
 *   image: cat
 *   properties: {
 *     extra: {
 *       image: kitty
 *     }
 *   }
 * }, blockstore)
 * ```
 *
 * @template {TokenInput} T
 * @param {EncodedBlobBlob<T>} input
 * @param {Blockstore} blockstore
 * @returns {Promise<Token<T>>}
 */
export const encode = async (input, blockstore) => {
  const [blobs, meta] = mapValueWith(input, isBlob, encodeBlob, new Map(), [])
  /** @type {API.Encoded<T, [[Blob, URL]]>} */
  const data = JSON.parse(JSON.stringify(meta))
  /** @type {API.Encoded<T, [[Blob, CID]]>} */
  const dag = JSON.parse(JSON.stringify(meta))

  for (const [dotPath, blob] of blobs.entries()) {
    /** @type {string|undefined} */
    // @ts-ignore blob may be a File!
    const name = blob.name || 'blob'
    const { root: cid } = await pack({
      // @ts-ignore
      input: [{ path: name, content: blob.stream() }],
      blockstore,
      wrapWithDirectory: true,
    })

    const href = new URL(`ipfs://${cid}/${name}`)
    const path = dotPath.split('.')
    setIn(data, path, href)
    setIn(dag, path, cid)
  }

  const { root: metadataJsonCid } = await pack({
    // @ts-ignore
    input: [
      {
        path: 'metadata.json',
        content: new Blob([JSON.stringify(data)]).stream(),
      },
    ],
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

  return new Token(
    block.cid.toString(),
    `ipfs://${block.cid}/metadata.json`,
    data
  )
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
const isBlob = value => value instanceof Blob

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
