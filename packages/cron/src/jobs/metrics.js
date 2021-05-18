import debug from 'debug'
import { findNs } from '../lib/utils.js'

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

/**
 * @param {import('../types').Config} config
 */
export async function updateUserMetrics({ cf, env }) {
  const log = debug('metrics:updateUserMetrics')
  const namespaces = await cf.fetchKVNamespaces()
  const usersNs = findNs(namespaces, env, 'USERS')
  const merticsNs = findNs(namespaces, env, 'METRICS')
  log(`🎯 Updating ${merticsNs.title} from ${usersNs.title}`)
  let total = 0
  for await (const keys of cf.fetchKVKeys(usersNs.id)) {
    log(`📥 Processing ${total} -> ${total + keys.length}`)
    total += keys.length
  }
  log(`${total} users:total`)
  await cf.writeKV(merticsNs.id, 'users:total', total)
  log('done')
}

/**
 * @param {import('../types').Config} config
 */
export async function updateNftMetrics({ cf, env }) {
  const log = debug('metrics:updateNftMetrics')
  const namespaces = await cf.fetchKVNamespaces()
  const nftsIndexNs = findNs(namespaces, env, 'NFTS_IDX')
  const merticsNs = findNs(namespaces, env, 'METRICS')
  log(`🎯 Updating ${merticsNs.title} from ${nftsIndexNs.title}`)
  let total = 0
  let totalBytes = 0
  let totalPins = 0
  for await (const keys of cf.fetchKVKeys(nftsIndexNs.id)) {
    log(`📥 Processing ${total} -> ${total + keys.length}`)
    keys.forEach((k) => {
      total++
      totalBytes += k.metadata.size
      if (k.metadata.pinStatus === 'pinned') {
        totalPins++
      }
    })
  }
  log(`${total} nfts:total`)
  log(`${totalBytes} nfts:totalBytes`)
  log(`${totalPins} nfts:pins:total`)
  await cf.writeKVMulti(merticsNs.id, [
    // Total number of NFTs stored on nft.storage
    { key: 'nfts:total', value: total },
    // Total bytes of all NFTs
    { key: 'nfts:totalBytes', value: totalBytes },
    // Total number of NFTs pinned on IPFS
    { key: 'nfts:pins:total', value: totalPins },
  ])
  log('done')
}

/**
 * @param {import('../types').Config} config
 */
export async function updatePinMetrics({ cf, env }) {
  const log = debug('metrics:updatePinMetrics')
  const namespaces = await cf.fetchKVNamespaces()
  const pinsNs = findNs(namespaces, env, 'PINS')
  const merticsNs = findNs(namespaces, env, 'METRICS')
  log(`🎯 Updating ${merticsNs.title} from ${pinsNs.title}`)
  let total = 0
  let totalBytes = 0
  let statusTotals = { queued: 0, failed: 0, pinning: 0, pinned: 0 }
  for await (const keys of cf.fetchKVKeys(pinsNs.id)) {
    log(`📥 Processing ${total} -> ${total + keys.length}`)
    keys.forEach((k) => {
      total++
      totalBytes += k.metadata.size
      /** @type import('nft.storage/src/lib/interface').PinStatus */
      const status = k.metadata.status
      statusTotals[status]++
    })
  }
  log(`${total} pins:total`)
  log(`${totalBytes} pins:totalBytes`)
  log(`${statusTotals.queued} nfts:status:queued:total`)
  log(`${statusTotals.failed} nfts:status:failed:total`)
  log(`${statusTotals.pinning} nfts:status:pinning:total`)
  log(`${statusTotals.pinned} nfts:status:pinned:total`)
  await cf.writeKVMulti(merticsNs.id, [
    // Total number of pins added to nft.storage
    { key: 'pins:total', value: total },
    // Total bytes of all pins
    { key: 'pins:totalBytes', value: totalBytes },
    // Total pins by status
    { key: 'pins:status:queued:total', value: statusTotals.queued },
    { key: 'pins:status:failed:total', value: statusTotals.failed },
    { key: 'pins:status:pinning:total', value: statusTotals.pinning },
    { key: 'pins:status:pinned:total', value: statusTotals.pinned },
  ])
  log('done')
}

/**
 * @param {import('../types').Config} config
 */
export async function updateDealMetrics({ cf, env }) {
  const log = debug('metrics:updateDealMetrics')
  const namespaces = await cf.fetchKVNamespaces()
  const dealsNs = findNs(namespaces, env, 'DEALS')
  const merticsNs = findNs(namespaces, env, 'METRICS')
  log(`🎯 Updating ${merticsNs.title} from ${dealsNs.title}`)
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
  let i = 0
  for await (const keys of cf.fetchKVKeys(dealsNs.id)) {
    log(`📥 Processing ${i} -> ${i + keys.length}`)
    keys.forEach((k) => {
      /** @type {DealsSummary} */
      const summary = k.metadata
      if (summary == null) return
      const status = getEffectiveStatus(summary)
      totals[status]++
    })
    i += keys.length
  }
  log(`${totals.active} nfts:deals:active:total`)
  log(`${totals.published} nfts:deals:published:total`)
  log(`${totals.accepted} nfts:deals:accepted:total`)
  log(`${totals.proposing} nfts:deals:proposing:total`)
  log(`${totals.queued} nfts:deals:queued:total`)
  log(`${totals.failed} nfts:deals:failed:total`)
  log(`${totals.terminated} nfts:deals:terminated:total`)
  await cf.writeKVMulti(merticsNs.id, [
    // Total number of NFTs stored on Filecoin in active deals
    { key: 'nfts:deals:active:total', value: totals.active },
    { key: 'nfts:deals:published:total', value: totals.published },
    { key: 'nfts:deals:accepted:total', value: totals.accepted },
    { key: 'nfts:deals:proposing:total', value: totals.proposing },
    // Total number of NFTs queued for the next deal batch
    { key: 'nfts:deals:queued:total', value: totals.queued },
    { key: 'nfts:deals:failed:total', value: totals.failed },
    { key: 'nfts:deals:terminated:total', value: totals.terminated },
  ])
  log('done')
}

/**
 * @param {DealsSummary} summary
 * @returns {import('nft.storage/src/lib/interface').Deal['status'] | 'unknown'}
 */
function getEffectiveStatus(summary) {
  /** @type {import('nft.storage/src/lib/interface').Deal['status'][]} */
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
