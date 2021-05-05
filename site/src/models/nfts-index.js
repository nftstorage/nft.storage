import { stores } from '../constants.js'

/**
 * @typedef {{
 *   key: string
 *   pinStatus?: import('../bindings').PinStatus
 *   size?: number
 *   name?: string
 *   meta?: Record<string, string>
 * }} IndexData
 * @typedef {{ user: { sub: string }, created: string, cid: string }} Key
 */

const FAR_FUTURE = new Date('3000-01-01T00:00:00.000Z').getTime()
const PAD_LEN = FAR_FUTURE.toString().length

/**
 * @param {Key} key
 */
function encodeIndexKey({ user, created, cid }) {
  const createdTime = new Date(created).getTime()
  const ts = (FAR_FUTURE - createdTime).toString().padStart(PAD_LEN, '0')
  return `${user.sub}:${ts}:${cid}`
}

/**
 * @param {string} key
 * @returns {Key}
 */
function decodeIndexKey(key) {
  const parts = key.split(':')
  const cid = parts.pop()
  const ts = parts.pop()
  if (!cid || !ts) throw new Error('invalid index key')
  const created = new Date(FAR_FUTURE - parseInt(ts)).toISOString()
  return { user: { sub: parts.join(':') }, created, cid }
}

/**
 * @param {Key} key
 * @param {IndexData} data
 * @returns {Promise<void>}
 */
export async function set(key, data) {
  await stores.nftsIndex.put(encodeIndexKey(key), '', { metadata: data })
}

/**
 * @param {Key} key
 */
export async function remove(key) {
  await stores.nftsIndex.delete(encodeIndexKey(key))
}

/**
 * @param {string} [prefix]
 * @returns {AsyncIterable<[Key, IndexData]>}
 */
export async function* entries(prefix) {
  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const list = await stores.nftsIndex.list({ prefix, cursor })
    for (const k of list.keys) {
      if (k == null) continue
      yield [decodeIndexKey(k.name), k.metadata]
    }
    cursor = list.cursor
    done = list.list_complete
  }
}
