import concat from 'uint8arrays/concat'

import stores from './stores.js'

export async function clearStores() {
  for (const store of Object.values(stores)) {
    await store.clear()
  }
}

/**
 * @template T
 * @param {AsyncIterable<T>} iterable
 * @returns {Promise<Array<T>>}
 */
export async function collect(iterable) {
  const chunks = []
  for await (const chunk of iterable) {
    chunks.push(chunk)
  }
  return chunks
}

/**
 * @param {AsyncIterable<Uint8Array>} iterable
 * @returns {Promise<Uint8Array>}
 */
export async function collectBytes(iterable) {
  const chunks = await collect(iterable)

  return concat(chunks)
}

/**
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {AsyncIterable<T>}
 */
export function toAsyncIterable(iterable) {
  return (async function* () {
    for (const item of iterable) {
      yield item
    }
  })()
}

/**
 * @param {number} min
 * @param {number} max
 */
export function randomInt(min, max) {
  return Math.random() * (max - min) + min
}
