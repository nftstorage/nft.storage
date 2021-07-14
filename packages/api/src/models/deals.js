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
  if (data == null) return []
  const deals = JSON.parse(data)
  return Array.isArray(deals) ? deals : []
}
