import * as uint8arrays from 'uint8arrays'
import { sha256 } from 'multiformats/hashes/sha2'

export async function toDenyListAnchor(cid) {
  const multihash = await sha256.digest(uint8arrays.fromString(`${cid}/`))
  const digest = multihash.bytes.subarray(2)
  return uint8arrays.toString(digest, 'hex')
}
