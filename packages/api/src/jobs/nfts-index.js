import * as pins from '../models/pins.js'
import { stores } from '../constants.js'
import * as nftsIndex from '../models/nfts-index.js'

/**
 * Adds and updates NFT metadata in the NFTS_IDX table. The metadata extracted
 * is used by the Pinning Services API pins listing.
 *
 * @param {import('../bindings.js').CronContext} ctx
 */
export async function updateNftsIndexMeta({ sentry }) {
  for await (const [key, data] of nftsIndex.entries()) {
    try {
      if (isPinnedOrFailed(data.pinStatus)) {
        continue
      }
      const pin = await pins.get(key.cid)
      if (!pin) {
        throw new Error(`missing pin for ${key.cid}`)
      }
      // no change
      if (pin.status === data.pinStatus) {
        continue
      }
      /** @type import('../bindings.js').NFT | null */
      const nft = await stores.nfts.get(data.key, 'json')
      if (!nft) {
        throw new Error(`missing nft for ${data.key}`)
      }
      await nftsIndex.set(key, {
        ...data, // key (in NFTS)
        ...(nft.pin || {}), // name/meta
        pinStatus: pin.status,
        size: pin.size,
      })
    } catch (err) {
      err.message = `updating NFTS_IDX meta for ${nftsIndex.encodeIndexKey(
        key
      )}: ${err.message}`
      sentry.captureException(err)
    }
  }
}

/**
 * @param {string} [status]
 */
function isPinnedOrFailed(status) {
  return status ? ['pinned', 'failed'].includes(status) : false
}
