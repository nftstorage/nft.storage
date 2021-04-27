import { stores } from '../constants.js'
import merge from 'merge-options'

/**
 * @typedef {{user: import('./users').User, cid: string}} Key
 * @typedef {import('../bindings').NFT} NFT
 */

const FAR_FUTURE = new Date('3000-01-01T00:00:00.000Z').getTime()
const PAD_LEN = FAR_FUTURE.toString().length

/**
 * @param {Key} key
 */
const encodeKey = ({ user, cid }) => `${user.sub}:${cid}`

/**
 * @param {{user: import('./users').User, created: Date, cid: string}} key
 */
export function encodeIndexKey({ user, created, cid }) {
  const ts = (FAR_FUTURE - created.getTime()).toString().padStart(PAD_LEN, '0')
  return `${user.sub}:${ts}:${cid}`
}

/**
 * @param {string} key
 * @returns {{ user: { sub: string }, created: Date, cid: string }}
 */
function decodeIndexKey(key) {
  const parts = key.split(':')
  const created = new Date(FAR_FUTURE - parseInt(parts[1]))
  return { user: { sub: parts[0] }, created, cid: parts[2] }
}

/**
 * @param {Key} key
 * @returns {Promise<boolean>}
 */
export const has = async (key) => {
  return null == (await stores.nfts.get(encodeKey(key)))
}

/**
 * @param {Key} key
 * @param {NFT} value
 * @param {any} [options]
 * @returns {Promise<NFT>}
 */
export const set = async (key, value, options) => {
  const savedValue = await get(key)
  if (savedValue === null) {
    const kvKey = encodeKey(key)
    await stores.nfts.put(kvKey, JSON.stringify(value))
    await stores.nftsIndex.put(
      encodeIndexKey({ ...key, created: new Date(value.created) }),
      '',
      { metadata: { key: kvKey } }
    )
    return value
  }
  const data = merge(savedValue, value)
  await stores.nfts.put(encodeKey(key), JSON.stringify(data), options)
  return data
}

/**
 * @param {Key} key
 * @returns {Promise<NFT|null>}
 */
export const get = async (key) => {
  const value = await stores.nfts.get(encodeKey(key))
  if (value == null) {
    return value
  } else {
    return JSON.parse(value)
  }
}

/**
 * @param {Key} key
 */
export const remove = async (key) => {
  const nft = await get(key)
  if (!nft) return
  await stores.nfts.delete(encodeKey(key))
  await stores.nftsIndex.delete(
    encodeIndexKey({ ...key, created: new Date(nft.created) })
  )
}

/**
 * @param {any} prefix
 * @param {{ limit?: number, before?: Date }} [options]
 * @returns {Promise<Array<KVValue<NFT>>>}
 */
export async function list(prefix, options) {
  options = options || {}

  const limit = Math.min(options.limit || 10, 100)
  if (isNaN(limit) || limit < 1) {
    throw new Error('invalid limit')
  }

  const before = options.before || new Date()
  if (!(before instanceof Date) || isNaN(before.getTime())) {
    throw new Error('invalid filter')
  }

  let done = false
  let cursor
  /** @type Promise<KVValue<NFT>>[] */
  const nfts = []

  while (!done) {
    // @ts-ignore
    const nftIdxList = await stores.nftsIndex.list({ prefix, cursor })

    for (const k of nftIdxList.keys) {
      const { created } = decodeIndexKey(k.name)
      if (created.getTime() < before.getTime()) {
        // @ts-ignore
        nfts.push(stores.nfts.get(k.metadata.key, 'json'))
        if (nfts.length >= limit) {
          break
        }
      }
    }

    if (nfts.length >= limit) {
      break
    }
    cursor = nftIdxList.cursor
    done = nftIdxList.list_complete
  }

  return Promise.all(nfts)
}
