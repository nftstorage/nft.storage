import { CID } from 'multiformats'
import { CarWriter } from '@ipld/car'

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
