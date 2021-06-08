import * as Block from 'multiformats/block'
import * as Raw from 'multiformats/codecs/raw'
import { sha256 } from 'multiformats/hashes/sha2'
import * as CAR from '../../src/utils/car.js'

// @ts-ignore
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
