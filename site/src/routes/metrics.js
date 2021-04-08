import { stores } from '../constants.js'
import * as Pinata from '../pinata.js'

const MAX_AGE_SECS = 600 // max age of a metrics response in seconds
const STALE_WHILE_REVALIDATE_SECS = 3600

/**
 * Note: add a cache busting suffix if you change the code and want to see a
 * change immediately after deploy.
 * @param {string} url
 * @returns {string}
 */
function getCacheKey(url) {
  return `${new URL(url).origin}/metrics?v=4`
}

/**
 * TODO: basic auth
 * @param {FetchEvent} event
 */
export async function metrics(event) {
  const cache = caches.default
  const cacheKey = getCacheKey(event.request.url)

  let res = await cache.match(cacheKey)
  if (res) return res

  const [userMetrics, nftMetrics] = await Promise.all([
    getUserMetrics(),
    getNftMetrics(),
  ])
  res = new Response(exportPromMetrics({ userMetrics, nftMetrics }))
  // Cache the response for MAX_AGE_SECS
  res.headers.append(
    'Cache-Control',
    `public,max-age=${MAX_AGE_SECS},stale-while-revalidate=${STALE_WHILE_REVALIDATE_SECS}`
  )
  event.waitUntil(cache.put(cacheKey, res.clone()))
  return res
}

// TODO: keep running total?
async function getUserMetrics() {
  let total = 0
  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const users = await stores.users.list({ cursor })
    total += users.keys.length
    cursor = users.cursor
    done = users.list_complete
  }
  return { total }
}

class DealTotals {
  constructor() {
    this.proposing = { total: 0 }
    this.accepted = { total: 0 }
    this.failed = { total: 0 }
    this.published = { total: 0 }
    this.active = { total: 0 }
    this.terminated = { total: 0 }
  }
}

class NftMetrics {
  constructor() {
    this.total = 0 // Total number of NFTs stored on nft.storage
    this.totalBytes = 0 // Total bytes of all NFTs
    this.storage = {
      ipfs: {
        total: 0, // Total number of NFTs pinned on IPFS
      },
      filecoin: {
        total: 0, // Total number of NFTs stored on Filecoin in active deals
        totalQueued: 0, // Total number of NFTs queued for the next deal batch
        deals: {
          mainnet: new DealTotals(),
          nerpanet: new DealTotals(),
        },
      },
    }
  }
}

// TODO: keep running totals?
async function getNftMetrics() {
  const metrics = new NftMetrics()
  const seenDeals = new Set()
  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const nftList = await stores.nfts.list({ cursor, limit: 1000 })
    metrics.total += nftList.keys.length
    /** @type Array<{ cid: string, pinStatus: string, size: number, deals: any[] }> */
    const nftMetas = []
    for (const k of nftList.keys) {
      const cid = k.name.split(':')[1]
      // Look up size for pinned data via pinning service API
      // TODO: move this to cron job
      if (k.metadata == null || k.metadata.pinStatus !== 'pinned') {
        try {
          const res = await Pinata.pinInfo(cid)
          if (!res.ok) throw new Error('pinata file info request error')
          if (!res.value) continue // TODO: stop checking after some time and mark as failed
          const d = await stores.nfts.get(k.name)
          if (d == null) continue
          const nft = JSON.parse(d)
          nft.size = res.value.size
          await stores.nfts.put(k.name, JSON.stringify(nft), {
            metadata: { pinStatus: 'pinned', size: nft.size },
          })
          nftMetas.push({
            cid,
            pinStatus: nft.pin.status,
            size: nft.size,
            deals: [],
          })
        } catch (err) {
          console.error(`failed to update file size for ${cid}`, err)
        }
        continue
      }
      nftMetas.push({ cid, deals: [], ...k.metadata })
    }

    for (const meta of nftMetas) {
      metrics.totalBytes += meta.size || 0
      if (meta.pinStatus === 'pinned') {
        metrics.storage.ipfs.total++
      }
      for (const d of meta.deals) {
        const ntwk = d.network || 'unknown'
        // TODO: @riba will add a "key" to deals that is essentially this - switch to using it
        const key = `${ntwk}/${d.miner}/${d.batchRootCid}`
        if (seenDeals.has(key)) continue
        seenDeals.add(key)
        if (d.status === 'queued') {
          metrics.storage.filecoin.totalQueued++
        } else {
          // @ts-ignore
          const dealTotals = (metrics.storage.filecoin.deals[ntwk] =
            metrics.storage.filecoin.deals[ntwk] || new DealTotals())
          dealTotals[d.status] = dealTotals[d.status] || { total: 0 }
          dealTotals[d.status].total++
        }
      }
    }
    cursor = nftList.cursor
    done = nftList.list_complete
  }
  metrics.storage.filecoin.total = Object.values(
    metrics.storage.filecoin.deals
  ).reduce((total, dealTotals) => total + dealTotals.active.total, 0)
  return metrics
}

/**
 * Exports metrics in prometheus exposition format.
 * https://prometheus.io/docs/instrumenting/exposition_formats/
 * @param {{ userMetrics: { total: number }, nftMetrics: NftMetrics }} metrics
 * @returns {string}
 */
function exportPromMetrics({ userMetrics, nftMetrics }) {
  return [
    '# HELP nftstorage_users_total Total users registered.',
    '# TYPE nftstorage_users_total counter',
    `nftstorage_users_total ${userMetrics.total}`,
    '# HELP nftstorage_nfts_total Total number of NFTs stored.',
    '# TYPE nftstorage_nfts_total counter',
    `nftstorage_nfts_total ${nftMetrics.total}`,
    '# HELP nftstorage_nfts_bytes_total Total bytes of all NFTs.',
    '# TYPE nftstorage_nftstorage_nfts_bytes_total counter',
    `nftstorage_nfts_bytes_total ${nftMetrics.totalBytes}`,
    '# HELP nftstorage_nfts_storage_ipfs_total Total number of NFTs pinned on IPFS.',
    '# TYPE nftstorage_nfts_storage_ipfs_total counter',
    `nftstorage_nfts_storage_ipfs_total ${nftMetrics.storage.ipfs.total}`,
    '# HELP nftstorage_nfts_storage_filecoin_total Total number of NFTs stored on Filecoin in active deals.',
    '# TYPE nftstorage_nfts_storage_filecoin_total counter',
    `nftstorage_nfts_storage_filecoin_total ${nftMetrics.storage.filecoin.total}`,
    '# HELP nftstorage_nfts_storage_filecoin_queued_total Total number of NFTs queued for the next deal batch.',
    '# TYPE nftstorage_nfts_storage_filecoin_queued_total counter',
    `nftstorage_nfts_storage_filecoin_queued_total ${nftMetrics.storage.filecoin.totalQueued}`,
    ...Object.entries(nftMetrics.storage.filecoin.deals).map(([ntwk, totals]) =>
      [
        `# HELP nftstorage_nfts_storage_filecoin_deals_${ntwk}_total Total number of NFTs participating in Filecoin deals for ${ntwk}.`,
        `# TYPE nftstorage_nfts_storage_filecoin_deals_${ntwk}_total counter`,
        ...Object.entries(totals).map(
          ([status, { total }]) =>
            `nftstorage_nfts_storage_filecoin_deals_${ntwk}_total{status="${status}"} ${total}`
        ),
      ].join('\n')
    ),
  ].join('\n')
}
