import { base58btc } from 'multiformats/bases/base58'

/** @type {Record<string, HmacImportParams|EcKeyImportParams>} */
const algorithms = {
  HS256: {
    name: 'HMAC',
    hash: {
      name: 'SHA-256',
    },
  },

  // NODE-ED25519 exists only in the CloudFlare workers runtime API
  // see: https://developers.cloudflare.com/workers/runtime-apis/web-crypto#footnote%201
  'NODE-ED25519': {
    name: 'NODE-ED25519',
    namedCurve: 'NODE-ED25519',
  },
}

// Adapted from https://chromium.googlesource.com/chromium/blink/+/master/LayoutTests/crypto/subtle/hmac/sign-verify.html
var Base64URL = {
  stringify: function (/** @type {Uint8Array} */ a) {
    // @ts-ignore
    var base64string = btoa(String.fromCharCode.apply(0, a))
    return base64string
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  },
  parse: function (/** @type {string} */ s) {
    s = s.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '')
    return new Uint8Array(
      // @ts-ignore
      Array.prototype.map.call(atob(s), function (c) {
        return c.charCodeAt(0)
      })
    )
  },
}

/**
 * @param {any} s
 */
function isString(s) {
  return typeof s === 'string'
}

/**
 * @param {string | number | boolean} str
 */
function utf8ToUint8Array(str) {
  str = btoa(unescape(encodeURIComponent(str)))
  return Base64URL.parse(str)
}

/**
 * @param {null} arg
 */
function isObject(arg) {
  return arg !== null && typeof arg === 'object'
}

/**
 * @param {string} token
 * @param {string} secret
 * @param {string} alg
 */
export async function verifyJWT(token, secret, alg = 'HS256') {
  if (!isString(token)) {
    throw new Error('token must be a string')
  }

  if (!isString(secret)) {
    throw new Error('secret must be a string')
  }

  if (!isString(alg)) {
    throw new Error('alg must be a string')
  }

  var tokenParts = token.split('.')

  if (tokenParts.length !== 3) {
    return false
  }

  var importAlgorithm = algorithms[alg]

  if (!importAlgorithm) {
    throw new Error('algorithm not found')
  }

  const keyData = utf8ToUint8Array(secret)
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    importAlgorithm,
    false,
    ['sign']
  )
  const headerPayload = tokenParts.slice(0, 2).join('.')
  const signature = tokenParts[2]
  const signedHeaderPayload = await crypto.subtle.sign(
    importAlgorithm.name,
    key,
    utf8ToUint8Array(headerPayload)
  )

  return Base64URL.stringify(new Uint8Array(signedHeaderPayload)) === signature
}

/**
 * @param {string} token - an encoded JWT token from an x-web3auth header.
 * @returns {Promise<boolean>} - true if the token contains a valid solana public key and a valid signature from the key.
 */
export async function verifyMetaplexJWT(token) {
  if (!isString(token)) {
    throw new Error('token must be a string')
  }
  var tokenParts = token.split('.')

  if (tokenParts.length !== 3) {
    return false
  }

  const header = parseJWTHeader(token)
  const payload = parseJWT(token)

  if (header.alg !== 'EdDSA') {
    throw new Error('invalid algorithm for metaplex token')
  }

  if (header.typ !== 'JWT') {
    throw new Error('invalid token type')
  }

  if (!payload.iss) {
    return false
  }

  const pubkey = await keyFromDID(payload.iss)
  const sig = Base64URL.parse(tokenParts[2])
  const headerPayload = utf8ToUint8Array(tokenParts[0] + '.' + tokenParts[1])

  if (!crypto || !crypto.subtle) {
    return verifyEd25519SignatureWithJSCrypto(headerPayload, sig, pubkey)
  }

  try {
    return verifyEd25519SignatureWithNativeCrypto(headerPayload, sig, pubkey)
  } catch (e) {
    if (e instanceof DOMException && e.name === 'NotSupportedError') {
      return verifyEd25519SignatureWithJSCrypto(headerPayload, sig, pubkey)
    }
    throw e
  }
}

/**
 *
 * @param {Uint8Array} message
 * @param {Uint8Array} sig
 * @param {Uint8Array} pubkey
 * @returns {Promise<boolean>}
 */
async function verifyEd25519SignatureWithNativeCrypto(message, sig, pubkey) {
  const key = await crypto.subtle.importKey(
    'raw',
    pubkey,
    algorithms['NODE-ED25519'],
    false,
    ['verify']
  )

  return crypto.subtle.verify(algorithms['NODE-ED25519'], key, sig, message)
}

/**
 *
 * @param {Uint8Array} message
 * @param {Uint8Array} sig
 * @param {Uint8Array} pubkey
 * @returns {Promise<boolean>}
 */
async function verifyEd25519SignatureWithJSCrypto(message, sig, pubkey) {
  console.warn(
    'using tweetnacl for ed25519 - you should not see this message when running in the CloudFlare worker runtime'
  )
  const { default: nacl } = await import('tweetnacl')
  return nacl.sign.detached.verify(message, sig, pubkey)
}

/**
 * @param {string} did - a "did:key" formatted DID string
 * @returns {Promise<Uint8Array>} - the decoded public key
 * @throws if DID is invalid or does not contain a valid Ed25519 public key
 */
async function keyFromDID(did) {
  const prefix = 'did:key:'
  if (!did.startsWith(prefix)) {
    throw new Error('invalid DID')
  }

  const keyStr = did.slice(prefix.length)
  const bytes = base58btc.decode(keyStr)

  // check multicodec == ed25519-pub (0xed encoded as a varint)
  if (bytes[0] !== 0xed || bytes[1] !== 0x01) {
    throw new Error(
      'invalid key multicodec. only ed25519-pub keys are supported'
    )
  }
  return bytes.slice(2)
}

/**
 * @param {any} payload
 * @param {string} secret
 * @param {string} alg
 */
export async function signJWT(payload, secret, alg = 'HS256') {
  if (!isObject(payload)) {
    throw new Error('payload must be an object')
  }

  if (!isString(secret)) {
    throw new Error('secret must be a string')
  }

  if (!isString(alg)) {
    throw new Error('alg must be a string')
  }

  var importAlgorithm = algorithms[alg]

  if (!importAlgorithm) {
    throw new Error('algorithm not found')
  }

  const payloadAsJSON = JSON.stringify(payload)
  const headerAsJSON = JSON.stringify({ alg: alg, typ: 'JWT' })
  const headerPayload =
    Base64URL.stringify(utf8ToUint8Array(headerAsJSON)) +
    '.' +
    Base64URL.stringify(utf8ToUint8Array(payloadAsJSON))
  const keyData = utf8ToUint8Array(secret)
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    importAlgorithm,
    false,
    ['sign']
  )
  const headerPayloadBuffer = utf8ToUint8Array(headerPayload)
  const signature = await crypto.subtle.sign(
    importAlgorithm.name,
    key,
    headerPayloadBuffer
  )
  return headerPayload + '.' + Base64URL.stringify(new Uint8Array(signature))
}

/**
 * @param {string} token
 */
export function decodeJWT(token) {
  return decodeBase64UrlToString(token.split('.')[1])
}

/**
 * @param {string} token
 * @returns
 */
function decodeJWTHeader(token) {
  return decodeBase64UrlToString(token.split('.')[0])
}

/**
 * @param {string} encoded
 * @returns {string}
 */
function decodeBase64UrlToString(encoded) {
  var output = encoded.replace(/-/g, '+').replace(/_/g, '/')
  switch (output.length % 4) {
    case 0:
      break
    case 2:
      output += '=='
      break
    case 3:
      output += '='
      break
    default:
      throw 'Illegal base64url string!'
  }

  var result = atob(output)

  try {
    return decodeURIComponent(escape(result))
  } catch (err) {
    return result
  }
}

/**
 * @typedef {{iss: string; sub:string, aud: string; exp: number; iat: number}} JWT
 *
 * @param {string} token
 * @returns {JWT}
 */
export function parseJWT(token) {
  // TODO: Handle when decodeJWT fails.
  // TODO: Handle when JSON.parse fails.
  return JSON.parse(decodeJWT(token))
}

/**
 * @typedef {{alg: string; typ: string}} JWTHeader
 * @param {string} token
 * @returns {JWTHeader}
 */
function parseJWTHeader(token) {
  return JSON.parse(decodeJWTHeader(token))
}
