import { stores } from '../constants.js'
import { get as getDeals } from '../models/deals.js'

const MAX_AGE_SECS = 60 * 10 // max age of a metrics response in seconds

/**
 * TODO: basic auth
 * @param {FetchEvent} event
 */
export async function metrics(event) {
  const cacheKey = new Request(new URL(event.request.url).toString(), event.request)
  const cache = caches.default

  let res = await cache.match(cacheKey)
  if (res) return res

  const [userMetrics, nftMetrics] = await Promise.all([getUserMetrics(), getNftMetrics()])
  res = new Response(exportPromMetrics({ userMetrics, nftMetrics }))
  // Cache the response for 60s
  res.headers.append('Cache-Control', `s-maxage=${MAX_AGE_SECS}`)
  event.waitUntil(cache.put(cacheKey, res.clone()))
  return res
}

// TODO: keep running total?
async function getUserMetrics () {
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
  constructor () {
    this.proposing = { total: 0 }
    this.accepted = { total: 0 }
    this.failed = { total: 0 }
    this.published = { total: 0 }
    this.active = { total: 0 }
    this.terminated = { total: 0 }
  }
}

class NftMetrics {
  constructor () {
    this.total = 0 // Total number of NFTs stored on nft.storage
    this.totalBytes = 0 // Total bytes of all NFTs
    this.storage = {
      ipfs: {
        total: 0 // Total number of NFTs pinned on IPFS
      },
      filecoin: {
        total: 0, // Total number of NFTs stored on Filecoin in active deals
        totalQueued: 0, // Total number of NFTs queued for the next deal batch
        deals: {
          mainnet: new DealTotals(),
          nerpanet: new DealTotals()
        }
      }
    }
  }
}

// TODO: keep running totals?
async function getNftMetrics () {
  const metrics = new NftMetrics()
  const seenDeals = new Set()
  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const nftList = await stores.nfts.list({ cursor, limit: 100 })
    metrics.total += nftList.keys.length
    // TODO: store cid & size in metadata so we don't have to query for each.
    // @ts-ignore
    const nftDatas = await Promise.all(nftList.keys.map(k => stores.nfts.get(k.name)))
    // @ts-ignore
    const nfts = await Promise.all(nftDatas.filter(Boolean).map(async d => {
      const nft = JSON.parse(d)
      nft.deals = await getDeals(nft.cid)
      return nft
    }))

    for (const nft of nfts) {
      metrics.totalBytes += nft.size || 0
      if (nft.pin.status === 'pinned') {
        metrics.storage.ipfs.total++
      }
      for (const d of nft.deals) {
        const ntwk = d.network || 'unknown'
        // TODO: @riba will add a "key" to deals that is essentially this - switch to using it
        const key = `${ntwk}/${d.miner}/${d.batchRootCid}`
        if (seenDeals.has(key)) continue
        seenDeals.add(key)
        if (d.status === 'queued') {
          metrics.storage.filecoin.totalQueued++
        } else {
          // @ts-ignore
          const dealTotals = metrics.storage.filecoin.deals[ntwk] = metrics.storage.filecoin.deals[ntwk] || new DealTotals()
          dealTotals[d.status] = dealTotals[d.status] || { total: 0 }
          dealTotals[d.status].total++
        }
      }
    }
    cursor = nftList.cursor
    done = nftList.list_complete
  }
  metrics.storage.filecoin.total = Object.values(metrics.storage.filecoin.deals)
      .reduce((total, dealTotals) => total + dealTotals.active.total, 0)
  return metrics
}

/**
 * Exports metrics in prometheus exposition format.
 * https://prometheus.io/docs/instrumenting/exposition_formats/
 * @param {{ userMetrics: { total: number }, nftMetrics: NftMetrics }} metrics
 * @returns {string}
 */
function exportPromMetrics ({ userMetrics, nftMetrics }) {
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
    '# HELP nftstorage_nfts_storage_filecoin_queued_total Total number of NFTs stored on Filecoin in active deals.',
    '# TYPE nftstorage_nfts_storage_filecoin_queued_total counter',
    `nftstorage_nfts_storage_filecoin_queued_total ${nftMetrics.storage.filecoin.totalQueued}`,
    ...Object.entries(nftMetrics.storage.filecoin.deals).map(([ntwk, totals]) => [
      `# HELP nftstorage_nfts_storage_filecoin_deals_${ntwk}_total Total number of NFTs participating in Filecoin deals for ${ntwk}.`,
      `# TYPE nftstorage_nfts_storage_filecoin_deals_${ntwk}_total counter`,
      ...Object.entries(totals).map(([status, { total }]) => (
        `nftstorage_nfts_storage_filecoin_deals_${ntwk}_total{status="${status}"} ${total}`
      ))
    ].join('\n'))
  ].join('\n')
}
