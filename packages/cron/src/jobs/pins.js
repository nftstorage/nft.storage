import debug from 'debug'
import { findNs } from '../lib/utils.js'

const log = debug('pins:updatePinStatuses')

/**
 * Updates pin status and size in the PINS table by consuming records in the
 * FOLLOWUPS table and retrieving updated status from cluster.
 *
 * @param {import('../types').Config & {
 *   cluster: import('@nftstorage/ipfs-cluster').Cluster
 *   ipfs: import('../lib/ipfs').IPFS
 * }} config
 */
export async function updatePinStatuses({ cf, env, cluster, ipfs }) {
  const namespaces = await cf.fetchKVNamespaces()
  const followupsNs = findNs(namespaces, env, 'FOLLOWUPS')
  const pinsNs = findNs(namespaces, env, 'PINS')
  log(`🎯 Updating ${pinsNs.title} from ${followupsNs.title}`)

  let i = 0
  for await (const keys of cf.fetchKVKeys(followupsNs.id)) {
    log(`📥 Processing ${i} -> ${i + keys.length}`)

    /**
     * @typedef {import('../lib/cloudflare.js').BulkWritePair} BulkWritePair
     * @type {{ pins: BulkWritePair[], followups: BulkWritePair[] }}
     */
    const bulkWrites = { pins: [], followups: [] }
    /**
     * @type {{ followups: string[] }}
     */
    const bulkDeletes = { followups: [] }

    await Promise.all(
      keys.map(async (k) => {
        const { name: cid, metadata: pin } = k
        try {
          const pinStatus = toPSAStatus(await cluster.status(cid))
          if (pinStatus === pin.status) return // not changed since last check

          const prevPin = { ...pin }
          pin.status = pinStatus
          // for successful pin we can update the size
          if (pinStatus === 'pinned') {
            pin.size = await ipfs.dagSize(cid, { timeout: 45 * 60000 })
          }

          bulkWrites.pins.push({ key: cid, value: '', metadata: pin })
          // remove followup or update if still in progress
          if (isPinnedOrFailed(pinStatus)) {
            bulkDeletes.followups.push(cid)
          } else {
            bulkWrites.followups.push({ key: cid, value: '', metadata: pin })
          }

          log(
            `${cid}: status ${prevPin.status} => ${pin.status}, size ${prevPin.size} => ${pin.size}`
          )
        } catch (err) {
          err.message = `following up on ${cid}: ${err.message}`
          console.error(err)
        }
      })
    )

    if (bulkWrites.pins.length) {
      log(`🗂 updating statuses for ${bulkWrites.pins.length} pins`)
      await cf.writeKVMulti(pinsNs.id, bulkWrites.pins)
    }
    if (bulkDeletes.followups.length) {
      log(`🗑 removing ${bulkDeletes.followups.length} followups`)
      await cf.deleteKVMulti(followupsNs.id, bulkDeletes.followups)
    }
    if (bulkWrites.followups.length) {
      log(`🗂 updating ${bulkWrites.pins.length} followups`)
      await cf.writeKVMulti(followupsNs.id, bulkWrites.followups)
    }

    i += keys.length
  }
}

/**
 * @param {string} status
 */
function isPinnedOrFailed(status) {
  return ['pinned', 'failed'].includes(status)
}

/**
 * Best effort conversion from cluster status to pinning service API status.
 * @param {import('@nftstorage/ipfs-cluster').StatusResponse} status
 * @returns {import('nft.storage/src/lib/interface').PinStatus}
 */
export function toPSAStatus(status) {
  const pinInfos = Object.values(status.peerMap)
  if (pinInfos.some((i) => i.status === 'pinned')) return 'pinned'
  if (pinInfos.some((i) => i.status === 'pinning')) return 'pinning'
  if (pinInfos.some((i) => i.status === 'queued')) return 'queued'
  return 'failed'
}
