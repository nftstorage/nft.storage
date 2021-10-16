import { pack } from 'ipfs-car/pack'
import { MemoryBlockStore } from 'ipfs-car/blockstore/memory'
import { CarReader } from '@ipld/car'

/**
 * Encodes given content into a car file with a single root corresponding
 * to the file with given content.
 *
 * @param {Blob} content
 */
export const fromBlob = async (content) => {
  const { out, root } = await pack({
    input: [content],
    blockstore: new MemoryBlockStore(),
    wrapWithDirectory: false,
    // As per web3.storage client
    // @see https://github.com/web3-storage/web3.storage/blob/4d3f1b17821f4f2b7bac8bbb7078f3fea85a67d7/packages/client/src/lib.js#L112-L113
    maxChunkSize: 1048576,
    maxChildrenPerNode: 1024,
  })
  const car = await CarReader.fromIterable(out)
  let size = 0
  for await (const block of car.blocks()) {
    size += block.bytes.byteLength
  }

  return { root, size, car }
}
