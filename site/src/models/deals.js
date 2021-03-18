import { stores } from '../constants.js'

/**
 * @typedef {import('../bindings').Deal} Deal
 */

/**
 * @param {string} cid CID of the NFT data
 * @returns {Promise<Deal[]>}
 */
export const get = async (cid) => {
  const data = await stores.deals.get(cid)
  return data == null ? [] : JSON.parse(data)
}
