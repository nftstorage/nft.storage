import { stores } from '../constants.js'

/**
 * @typedef {{user: import('./users').User, cid: import('multiformats').CID|string}} Key
 * @typedef {import('../../../client/src/api').StatusResult} NFT
 */

/**
 * @param {Key} key
 */
const encodeKey = ({user, cid}) => `${user.sub}:${cid}`


/**
 * @param {Key} key 
 * @returns {Promise<boolean>}
 */
export const has = async (key) => {
  return null == await stores.nfts.get(encodeKey(key))
}

/**
 * @param {Key} key
 * @param {NFT} value
 * @returns {Promise<void>}
 */
export const set = async (key, value) => {
  await stores.nfts.put(encodeKey(key), JSON.stringify(value))
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

