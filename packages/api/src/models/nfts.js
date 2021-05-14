import { stores } from '../constants.js'
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
 * @param {NFT} nft
 * @param {import('./pins.js').Pin} pin
 * @returns {Promise<NFT>}
 */
export const set = async (key, nft, pin) => {
  const kvKey = encodeKey(key)
  await stores.nfts.put(kvKey, JSON.stringify(nft))
  await nftsIndex.set(
    { ...key, created: nft.created },
    {
      key: kvKey,
      ...(nft.pin || {}), // name/meta
      pinStatus: pin.status,
      size: pin.size,
    }
  )
  return nft
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
 * @returns {Promise<Array<import('../bindings').NFTResponse|null>>}
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

  /** @type {Array<{ nftPromise: Promise<NFT|null>, indexData: import('./nfts-index.js').IndexData }>} */
  const items = []
  for await (const [key, data] of nftsIndex.entries(prefix)) {
    if (new Date(key.created).getTime() < before.getTime()) {
      items.push({
        nftPromise: stores.nfts.get(data.key, 'json'),
        indexData: data,
      })
      if (items.length >= limit) {
        break
      }
    }
  }

  return Promise.all(
    items.map(async ({ nftPromise, indexData }) => {
      const nft = await nftPromise
      return nft
        ? {
            ...nft,
            size: indexData.size,
            pin: {
              cid: nft.cid,
              ...(nft.pin || {}),
              status: indexData.pinStatus,
              size: indexData.size,
              created: nft.created,
            },
            deals: [], // FIXME: how to get deals data?
          }
        : null
    })
  )
}
