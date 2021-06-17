import { CID } from 'multiformats'
import { CarWriter } from '@ipld/car'
import * as dagCbor from '@ipld/dag-cbor'
import { garbage } from 'ipld-garbage'
import { sha256 } from 'multiformats/hashes/sha2'

/**
 * @param {number} targetSize
 * @returns {Promise<AsyncIterable<Uint8Array>>}
 */
export async function randomCar(targetSize) {
  const blocks = []
  let size = 0
  const seen = new Set()
  while (size < targetSize) {
    const bytes = dagCbor.encode(
      garbage(randomInt(1, targetSize), { weights: { CID: 0 } })
    )
    const hash = await sha256.digest(bytes)
    const cid = CID.create(1, dagCbor.code, hash)
    if (seen.has(cid.toString())) continue
    seen.add(cid.toString())
    blocks.push({ cid, bytes })
    size += bytes.length
  }
  const rootBytes = dagCbor.encode(blocks.map((b) => b.cid))
  const rootHash = await sha256.digest(rootBytes)
  const rootCid = CID.create(1, dagCbor.code, rootHash)
  // @ts-ignore versions of multiformats...
  const { writer, out } = CarWriter.create([rootCid])
  // @ts-ignore versions of multiformats...
  writer.put({ cid: rootCid, bytes: rootBytes })
  // @ts-ignore versions of multiformats...
  blocks.forEach((b) => writer.put(b))
  writer.close()
  return out
}

/**
 * @param {number} min
 * @param {number} max
 */
function randomInt(min, max) {
  return Math.random() * (max - min) + min
}
