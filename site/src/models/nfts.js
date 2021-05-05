import { stores } from '../constants.js'
import merge from 'merge-options'
import * as nftsIndex from './nfts-index.js'

/**
 * @typedef {{user: import('./users').User, cid: string}} Key
 * @typedef {import('../bindings').NFT} NFT
 */

/**
 * @param {Key} key
 */
const encodeKey = ({ user, cid }) => `${user.sub}:${cid}`

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
    await stores.nfts.put(kvKey, JSON.stringify(value), options)
    await nftsIndex.set({ ...key, created: value.created }, { key: kvKey })
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
  await nftsIndex.remove({ ...key, created: nft.created })
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

  /** @type Promise<KVValue<NFT>>[] */
  const nfts = []
  for await (const [key, data] of nftsIndex.entries(prefix)) {
    if (new Date(key.created).getTime() < before.getTime()) {
      // @ts-ignore
      nfts.push(stores.nfts.get(data.key, 'json'))
      if (nfts.length >= limit) {
        break
      }
    }
  }

  return Promise.all(nfts)
}
