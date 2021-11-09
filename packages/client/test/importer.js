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
  const rootBlock = await car.get(cid)
  if (!rootBlock) {
    throw new Error('missing root block')
  }
  if (new TextDecoder().decode(rootBlock.bytes) === 'throw an error') {
    throw new Error('throwing an error for tests')
  }
  return { cid }
}
