import { CID } from 'multiformats'
import { CarWriter } from '@ipld/car'
import * as dagCbor from '@ipld/dag-cbor'
import { garbage } from 'ipld-garbage'
import { sha256 } from 'multiformats/hashes/sha2'

const MAX_BLOCK_SIZE = 1024 * 1024 * 4

function randomBlockSize() {
  const max = MAX_BLOCK_SIZE
  const min = max / 2
  return Math.random() * (max - min) + min
}

export async function randomBlock() {
  const bytes = dagCbor.encode(
    garbage(randomBlockSize(), { weights: { CID: 0 } })
  )
  const hash = await sha256.digest(bytes)
  const cid = CID.create(1, dagCbor.code, hash)
  return { cid, bytes }
}

/**
 * @param {number} targetSize
 * @returns {Promise<AsyncIterable<Uint8Array>>}
 */
export async function randomCar(targetSize) {
  const blocks = []
  let size = 0
  const seen = new Set()
  while (size < targetSize) {
    const { cid, bytes } = await randomBlock()
    if (seen.has(cid.toString())) continue
    seen.add(cid.toString())
    blocks.push({ cid, bytes })
    size += bytes.length
  }
  const rootBytes = dagCbor.encode(blocks.map((b) => b.cid))
  const rootHash = await sha256.digest(rootBytes)
  const rootCid = CID.create(1, dagCbor.code, rootHash)
  const { writer, out } = CarWriter.create([rootCid])
  writer.put({ cid: rootCid, bytes: rootBytes })
  blocks.forEach((b) => writer.put(b))
  writer.close()
  return out
}
