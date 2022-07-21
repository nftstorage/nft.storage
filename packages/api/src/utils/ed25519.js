import { base58btc } from 'multiformats/bases/base58'
import * as ed from '@noble/ed25519'

/**
 * Verifies an Ed25519 signature over a given `message`.
 *
 *
 * @param {Uint8Array} message the message that was signed
 * @param {Uint8Array} sig the signature bytes
 * @param {Uint8Array} pubkey the Ed25519 public key that can verify the signature
 * @returns {Promise<boolean>} true if the signature is valid, false if invalid
 */
export async function verifyEd25519Signature(message, sig, pubkey) {
  try {
    return await ed.verify(sig, message, pubkey)
  } catch (_e) {
    return false
  }
}

/**
 * Extracts an Ed25519 public key from a `did:key` decentralized identifier string.
 *
 * @param {string} did - a "did:key" formatted DID string
 * @returns {Uint8Array} - the decoded public key
 * @throws if DID is invalid or does not contain a valid Ed25519 public key
 */
export function keyFromDID(did) {
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
