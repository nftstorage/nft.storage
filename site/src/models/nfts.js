import { stores } from '../constants.js'
import merge from 'merge-options'

/**
 * @typedef {{user: import('./users').User, cid: import('multiformats').CID|string}} Key
 * @typedef {import('../../../client/src/api').StatusResult} NFT
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
 * @returns {Promise<NFT>}
 */
export const set = async (key, value) => {
  const savedValue = await get(key)
  if (savedValue === null) {
    await stores.nfts.put(encodeKey(key), JSON.stringify(value))
    return value
  }
  const data = merge(savedValue, value)
  await stores.nfts.put(encodeKey(key), JSON.stringify(data))
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
export const remove = async (key) => stores.nfts.delete(encodeKey(key))

/**
 * @param {any} prefix
 */
export async function list(prefix) {
  const nfts = await stores.nfts.list({
    prefix,
  })
  if (nfts.keys.length > 0) {
    return await Promise.all(
      nfts.keys.map((key) => {
        return stores.nfts.get(key.name).then((v) => JSON.parse(v))
      })
    )
  }
  return []
}
