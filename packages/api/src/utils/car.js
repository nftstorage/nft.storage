import { CID } from 'multiformats/cid'
import { CarWriter } from '@ipld/car'
import { sha256 } from 'multiformats/hashes/sha2'
import { CarIndexer } from '@ipld/car/indexer'
import { MultihashIndexSortedWriter } from 'cardex'

/**
 * @typedef {import('multiformats/block').Block<unknown>} Block
 */

/**
 * @param {CID[]} roots
 * @param {AsyncIterable<Block>|Iterable<Block>} blocks
 * @returns {Promise<Blob & { type: 'application/car' }>}
 */
export const encode = async (roots, blocks) => {
  const { out, writer } = CarWriter.create(roots)
  for await (const block of blocks) {
    writer.put(block)
  }
  writer.close()

  const parts = []
  for await (const part of out) {
    parts.push(part)
  }

  return /** @type {Blob & {type: 'application/car'}} */ (
    new Blob(parts, {
      type: 'application/car',
    })
  )
}

/** multicodec code for CAR */
export const CAR_CODE = 0x202

/**
 * @param {Uint8Array} carBytes
 */
export async function createCarCid(carBytes) {
  return CID.createV1(CAR_CODE, await sha256.digest(carBytes))
}

/**
 * @param {Uint8Array} carBytes
 */
export async function createCarIndex(carBytes) {
  const indexer = await CarIndexer.fromBytes(carBytes)
  const { writer, out } = MultihashIndexSortedWriter.create()

  for await (const blockIndexData of indexer) {
    writer.put(blockIndexData)
  }
  writer.close()

  const chunks = []
  for await (const chunk of out) {
    chunks.push(chunk)
  }
  return new Uint8Array(await new Blob(chunks).arrayBuffer())
}
