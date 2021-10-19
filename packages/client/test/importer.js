import { CarReader } from '@ipld/car'

/**
 * @param {Uint8Array} content
 */
export const importCar = async (content) => {
  const car = await CarReader.fromBytes(content)
  const [cid] = await car.getRoots()
  if (!cid) {
    throw new Error(`Import failed`)
  }
  return { cid }
}
