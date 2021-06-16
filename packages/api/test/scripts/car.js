import * as dagCbor from '@ipld/dag-cbor'
import { CarWriter } from '@ipld/car'
import { garbage } from 'ipld-garbage'
import * as Block from 'multiformats/block'
import * as Raw from 'multiformats/codecs/raw'
import { sha256 } from 'multiformats/hashes/sha2'
import { CID } from 'multiformats/cid'
import { RootedCarSplitter } from 'carbites/rooted'
import * as CAR from '../../src/utils/car.js'

import { collectBytes, randomInt, toAsyncIterable } from './helpers'

/**
 * @param {string} str Data to encode into CAR file.
 */
export async function createCar(str) {
  const value = new TextEncoder().encode(str)
  const block = await Block.encode({
    value,
    codec: Raw,
    hasher: sha256,
  })
  const root = block.cid
  const car = await CAR.encode([root], [block])
  return { root, car }
}

/**
 * @param {object} [options]
 * @param {number} [options.carSize = 1000]
 * @param {number} [options.targetSize = 250]
 * @returns {Promise<RootedCarSplitter>}
 */
export async function createCarSplitter({
  carSize = 1000,
  targetSize = 250,
} = {}) {
  const bytes = await collectBytes(await randomCar(carSize))
  const splitter = new RootedCarSplitter(toAsyncIterable([bytes]), targetSize)

  return splitter
}

/**
 * @param {number} targetSize
 * @returns {Promise<AsyncIterable<Uint8Array>>}
 */
export async function randomCar(targetSize) {
  const blocks = []
  let size = 0
  while (size < targetSize) {
    const bytes = dagCbor.encode(garbage(randomInt(1, targetSize)))
    const hash = await sha256.digest(bytes)
    const cid = CID.create(1, dagCbor.code, hash)
    blocks.push({ cid, bytes })
    size += bytes.length
  }
  const { writer, out } = CarWriter.create(blocks.map((b) => b.cid))
  blocks.forEach((b) => writer.put(b))
  writer.close()
  return out
}

// export async function * createMultiCar() {
//   const root = CID.parse(multiCar[0].cid)
//   for (let i = 0; i < multiCar.length; i++) {
//     const block = {
//       cid: CID.parse(multiCar[i].cid),
//       bytes: multiCar[i].data
//     }
//     const car = await CAR.encode(i === 0 ? [root] : [], [block])

//     yield {
//       root,
//       cid: block.cid,
//       car
//     }
//   }
// }

// const multiCar = [
//   {
//     cid: 'bafybeibgbftx3hd3vrqptsmlcn5v5kd43u7qhp2ie6whnjsp4tlticpmge',
//     data: new Uint8Array([
//       18, 50, 10, 36, 1, 85, 18, 32, 202, 211, 5,
//       137, 34, 198, 96, 5, 84, 44, 59, 135, 150, 33,
//       130, 29, 222, 87, 106, 109, 45, 227, 211, 232, 18,
//       186, 94, 23, 130, 134, 5, 27, 18, 8, 102, 105,
//       108, 101, 46, 114, 97, 119, 24, 5, 10, 2, 8,
//       1
//     ])
//   },
//   {
//     cid: 'bafkreigk2mcysiwgmacvilb3q6lcdaq53zlwu3jn4pj6qev2lylyfbqfdm',
//     data: new Uint8Array([240, 159, 154, 152, 10])
//   },
//   {
//     cid: 'bafybeiczsscdsbs7ffqz55asqdf3smv6klcw3gofszvwlyarci47bgf354',
//     data: new Uint8Array([10, 2, 8, 1])
//   }
// ]
