import { stores } from '../constants.js'
import * as cluster from '../cluster.js'

export async function updatePinStatuses() {
  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const nftList = await stores.nfts.list({ cursor, limit: 1000 })
    for (const k of nftList.keys) {
      const cid = k.name.split(':')[1]
      // Look up size for pinned data via pinning service API
      if (k.metadata == null || !isPinnedOrFailed(k.metadata.pinStatus)) {
        try {
          const pinStatus = cluster.toPSAStatus(await cluster.status(cid))
          if (!isPinnedOrFailed(pinStatus)) continue
          const d = await stores.nfts.getWithMetadata(k.name)
          if (d.value == null) throw new Error('missing NFT')
          /** @type import('../bindings').NFT */
          const nft = JSON.parse(d.value)
          const prevStatus = nft.pin.status
          nft.pin.status = pinStatus
          const prevSize = nft.size
          if (pinStatus === 'pinned') {
            // for successful pin we can update the size
            nft.size = nft.pin.size = nft.size || (await cluster.dagSize(cid))
          }
          // @ts-ignore
          const metadata = { ...(d.metadata || {}), pinStatus, size: nft.size }
          await stores.nfts.put(k.name, JSON.stringify(nft), { metadata })
          console.log(
            `${cid}: pin status ${prevStatus} => ${nft.pin.status}, size ${prevSize} => ${nft.size}`
          )
        } catch (err) {
          console.error(`${cid}: failed to update pin status and size`, err)
        }
      }
    }
    cursor = nftList.cursor
    done = nftList.list_complete
  }
}

/**
 * @param {string} status
 */
function isPinnedOrFailed(status) {
  return ['pinned', 'failed'].includes(status)
}
