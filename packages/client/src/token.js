import * as API from './lib/interface.js'
import { Blob, FormData } from './platform.js'
import { toGatewayURL, GATEWAY } from './gateway.js'

/** @typedef {import('./gateway.js').GatewayURLOptions} EmbedOptions */

/**
 * @template {API.TokenInput} T
 * @implements {API.Token<T>}
 */
export class Token {
  /**
   * @param {API.CIDString} ipnft
   * @param {API.EncodedURL} url
   * @param {API.Encoded<T, [[Blob, URL]]>} data
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
   * @returns {API.Encoded<T, [[Blob, URL]]>}
   */
  embed() {
    return Token.embed(this)
  }

  /**
   * @template {API.TokenInput} T
   * @param {{data: API.Encoded<T, [[Blob, URL]]>}} token
   * @returns {API.Encoded<T, [[Blob, URL]]>}
   */
  static embed({ data }) {
    return embed(data, { gateway: GATEWAY })
  }
}

/**
 * @template T
 * @param {API.Encoded<T, [[Blob, URL]]>} input
 * @param {EmbedOptions} options
 * @returns {API.Encoded<T, [[Blob, URL]]>}
 */
export const embed = (input, options) =>
  mapWith(input, isURL, embedURL, options)

/**
 * @template {API.TokenInput} T
 * @param {API.EncodedToken<T>} value
 * @param {Set<string>} paths - Paths were to expcet EncodedURLs
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
 * @param {API.EncodedURL} url
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
 * @returns {value is API.EncodedURL}
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
 * @template {API.TokenInput} T
 * @param {API.Encoded<T, [[Blob, Blob]]>} input
 * @returns {FormData}
 */
export const encode = (input) => {
  const [form, meta] = mapValueWith(
    input,
    isBlob,
    encodeBlob,
    new FormData(),
    []
  )
  form.set('meta', JSON.stringify(meta))
  return form
}

/**
 * @param {FormData} data
 * @param {Blob} blob
 * @param {PropertyKey[]} path
 * @returns {[FormData, void]}
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
 * Substitues values in the given `input` that match `p(value) == true` with
 * `f(value, context, path)` where `context` is whatever you pass (usually
 * a mutable state) and `path` is a array of keys / indexes where the value
 * was encountered.
 *
 * @template T, I, X, O, State
 * @param {API.Encoded<T, [[I, X]]>} input - Arbitrary input.
 * @param {(input:any, state:State, path:PropertyKey[]) => input is X} p - Predicate function to determine
 * which values to swap.
 * @param {(state:State, input:X, path:PropertyKey[]) => [State, O]} f - Function
 * that swaps matching values.
 * @param {State} state - Some additional context you need in the process.
 * likey you'll start with `[]`.
 * @returns {API.Encoded<T, [[I, O]]>}
 */
export const mapWith = (input, p, f, state) => {
  const [, output] = mapValueWith(input, p, f, state, [])
  return output
}

/**
 * @template T, I, X, O, State
 * @param {API.Encoded<T, [[I, X]]>} input - Arbitrary input.
 * @param {(input:any, state:State, path:PropertyKey[]) => input is X} p - Predicate function to determine
 * which values to swap.
 * @param {(state:State, input:X, path:PropertyKey[]) => [State, O]} f - Function
 * that swaps matching values.
 * @param {State} state - Some additional context you need in the process.
 * @param {PropertyKey[]} path - Path where the value was encountered. Most
 * likey you'll start with `[]`.
 * @returns {[State, API.Encoded<T, [[I, O]]>]}
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
 * @param {API.Encoded<T, [[I, X]]>} input
 * @param {(input:any, state:State, path:PropertyKey[]) => input is X} p
 * @param {(state: State, input:X, path:PropertyKey[]) => [State, O]} f
 * @param {State} init
 * @param {PropertyKey[]} path
 * @returns {[State, API.Encoded<T, [[I, O]]>]}
 */
const mapObjectWith = (input, p, f, init, path) => {
  let state = init
  const output = /** @type {API.Encoded<T, [[I, O]]>} */ ({})
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
 * @returns {[State, API.Encoded<T, [[I, O]]>]}
 */
const mapArrayWith = (input, p, f, init, path) => {
  const output = /** @type {unknown[]} */ ([])

  let state = init
  for (const [index, element] of input.entries()) {
    const [next, out] = mapValueWith(element, p, f, state, [...path, index])
    output[index] = out
    state = next
  }

  return [state, /** @type {API.Encoded<T, [[I, O]]>} */ (output)]
}
