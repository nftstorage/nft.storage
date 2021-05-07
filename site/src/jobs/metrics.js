import { stores } from '../constants.js'
import * as metrics from '../models/metrics.js'
import * as pins from '../models/pins.js'
import * as nftsIndex from '../models/nfts-index.js'

/**
 * @typedef {{
 *   queued: number,
 *   proposing: number,
 *   accepted: number,
 *   failed: number,
 *   published: number,
 *   active: number,
 *   terminated: number
 * }} DealsSummary
 */

// TODO: keep running total?
export async function updateUserMetrics() {
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
  await metrics.set('users:total', total)
}

// TODO: keep running totals?
export async function updateNftMetrics() {
  let total = 0
  let totalBytes = 0
  let totalPins = 0
  for await (const [, data] of nftsIndex.entries()) {
    total++
    totalBytes += data.size
    if (data.pinStatus === 'pinned') {
      totalPins++
    }
  }
  await Promise.all([
    // Total number of NFTs stored on nft.storage
    metrics.set('nfts:total', total),
    // Total bytes of all NFTs
    metrics.set('nfts:totalBytes', totalBytes),
    // Total number of NFTs pinned on IPFS
    metrics.set('nfts:pins:total', totalPins),
  ])
}

export async function updatePinMetrics() {
  let total = 0
  let totalBytes = 0
  let statusTotals = { queued: 0, failed: 0, pinning: 0, pinned: 0 }
  for await (const [, pin] of pins.entries()) {
    total++
    totalBytes += pin.size
    statusTotals[pin.status]++
  }
  await Promise.all([
    // Total number of pins added to nft.storage
    metrics.set('pins:total', total),
    // Total bytes of all pins
    metrics.set('pins:totalBytes', totalBytes),
    // Total pins by status
    metrics.set('pins:status:queued:total', statusTotals.queued),
    metrics.set('pins:status:failed:total', statusTotals.failed),
    metrics.set('pins:status:pinning:total', statusTotals.pinning),
    metrics.set('pins:status:pinned:total', statusTotals.pinned),
  ])
}

// TODO: keep running totals?
export async function updateNftDealMetrics() {
  const totals = {
    queued: 0,
    proposing: 0,
    accepted: 0,
    failed: 0,
    published: 0,
    active: 0,
    terminated: 0,
    unknown: 0,
  }
  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const dealList = await stores.deals.list({ cursor, limit: 1000 })
    for (const k of dealList.keys) {
      /** @type {DealsSummary} */
      const summary = k.metadata
      if (summary == null) continue
      const status = getEffectiveStatus(summary)
      totals[status]++
    }
    cursor = dealList.cursor
    done = dealList.list_complete
  }
  await Promise.all([
    // Total number of NFTs stored on Filecoin in active deals
    metrics.set('nfts:deals:active:total', totals.active),
    metrics.set('nfts:deals:published:total', totals.published),
    metrics.set('nfts:deals:accepted:total', totals.accepted),
    metrics.set('nfts:deals:proposing:total', totals.proposing),
    // Total number of NFTs queued for the next deal batch
    metrics.set('nfts:deals:queued:total', totals.queued),
    metrics.set('nfts:deals:failed:total', totals.failed),
    metrics.set('nfts:deals:terminated:total', totals.terminated),
  ])
}

/**
 * @param {DealsSummary} summary
 * @returns {import('../bindings.js').Deal['status'] | 'unknown'}
 */
function getEffectiveStatus(summary) {
  /** @type import('../bindings.js').Deal['status'][] */
  const orderedStatues = [
    'active',
    'published',
    'accepted',
    'proposing',
    'queued',
    'failed',
    'terminated',
  ]
  for (const s of orderedStatues) {
    if (summary[s]) return s
  }
  return 'unknown'
}
