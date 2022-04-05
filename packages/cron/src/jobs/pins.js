import debug from 'debug'
import { consume, transform, pipeline } from 'streaming-iterables'

const log = debug('pins:updatePinStatuses')
const CONCURRENCY = 5
/**
 * 8k max request length to cluster for statusAll, we hit this at around 126 CIDs
 * http://nginx.org/en/docs/http/ngx_http_core_module.html#large_client_header_buffers
 */
const MAX_CLUSTER_STATUS_CIDS = 120
const CLUSTERS = ['IpfsCluster', 'IpfsCluster2', 'IpfsCluster3']

/**
 * @typedef {import('pg').Client} Client
 * @typedef {{
 *   pg: Client
 *   cluster1: import('@nftstorage/ipfs-cluster').Cluster
 *   cluster2: import('@nftstorage/ipfs-cluster').Cluster
 *   cluster3: import('@nftstorage/ipfs-cluster').Cluster
 * }} Config
 * @typedef {import('../../../api/src/utils/db-types').definitions} definitions
 * @typedef {Pick<definitions['pin'], 'id'|'status'|'service'|'inserted_at'|'updated_at'> & { source_cid: string }} Pin
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<Pin>} PinQuery
 */

const CLUSTER_LIST = CLUSTERS.map((c) => `'${c}'`).toString()
const COUNT_PENDING_PINS = `SELECT COUNT(*) FROM pin WHERE service IN (${CLUSTER_LIST}) AND status != 'Pinned' AND status != 'PinError'`
const FETCH_PENDING_PINS = `
SELECT p.id, p.service, p.status, u.source_cid, p.inserted_at, p.updated_at
  FROM pin p
  JOIN upload u
    ON p.content_cid = u.content_cid
 WHERE p.service IN (${CLUSTER_LIST})
   AND p.status != 'Pinned'
   AND p.status != 'PinError'
OFFSET $1
 LIMIT $2
`

/**
 * Updates pin status and size by retrieving updated status from cluster.
 *
 * @param {Config} config
 */
export async function updatePendingPinStatuses(config) {
  /**
   * @returns {Promise<number>}
   */
  const countPins = async () => {
    const { rows } = await config.pg.query(COUNT_PENDING_PINS)
    if (!rows.length) throw new Error('no rows returned counting pins')
    return rows[0].count
  }

  /**
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<Pin[]>}
   */
  const fetchPins = async (offset, limit) => {
    const { rows } = await config.pg.query(FETCH_PENDING_PINS, [offset, limit])
    return rows
  }

  await updatePinStatuses({ ...config, countPins, fetchPins })
}

const COUNT_FAILED_PINS = `SELECT COUNT(*) FROM pin WHERE service IN (${CLUSTER_LIST}) AND status = 'PinError' AND inserted_at > $1`
const FETCH_FAILED_PINS = `
SELECT p.id, p.service, p.status, u.source_cid, p.inserted_at, p.updated_at
  FROM pin p
  JOIN upload u
    ON p.content_cid = u.content_cid
 WHERE p.service IN (${CLUSTER_LIST})
   AND p.status = 'PinError'
   AND p.inserted_at > $1
OFFSET $2
 LIMIT $3`

// If Cluster reports PinError, set the status to Pinning when it is still a new
// pin i.e. less than 24 hours old. Cluster will continue trying to pin the data
// indefinitely so the PinError status may be temporary and we should not set
// _our_ status to PinError yet. If we do set our status to PinError it won't be
// re-checked for up to a week (pins-failed cron), so set to Pinning instead and
// keep checking up on this pin in this cron job.
const PIN_ERROR_GRACE_PERIOD = 1000 * 60 * 60 * 24

/**
 * Check on failed pins < 1 month old to see if their status changed from failed
 * to pinned.
 *
 * @param {Config & { after: Date }} config
 */
export async function checkFailedPinStatuses(config) {
  const { pg, after } = config

  /**
   * @returns {Promise<number>}
   */
  const countPins = async () => {
    const { rows } = await pg.query(COUNT_FAILED_PINS, [after.toISOString()])
    if (!rows.length) throw new Error('no rows returned counting pins')
    return rows[0].count
  }

  /**
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<Pin[]>}
   */
  const fetchPins = async (offset, limit) => {
    const { rows } = await config.pg.query(FETCH_FAILED_PINS, [
      after.toISOString(),
      offset,
      limit,
    ])
    return rows
  }

  log(`⏰ Checking pins created after ${after.toISOString()}`)
  await updatePinStatuses({ ...config, countPins, fetchPins })
}

/**
 * @param {Pin[]} pins
 */
function getUpdatePinStatusesSql(pins) {
  return `
UPDATE pin AS p
   SET status = c.status,
       updated_at = c.updated_at
  FROM (VALUES ${pins.map(
    (p) =>
      `(${p.id}, '${p.status}'::pin_status_type, '${p.updated_at}'::timestamp)`
  )}) AS c(id, status, updated_at) 
 WHERE c.id = p.id`.trim()
}

/**
 * Updates pin status and size by retrieving updated status from cluster.
 *
 * @param {Config & {
 *   countPins: () => Promise<number>
 *   fetchPins: (offset: number, limit: number) => Promise<Pin[]>
 * }} config
 */
async function updatePinStatuses(config) {
  const { countPins, fetchPins, pg, cluster3 } = config
  if (!log.enabled) {
    console.log('ℹ️ Enable logging by setting DEBUG=pins:updatePinStatuses')
  }

  const count = await countPins()
  log(`🎯 Updating ${count} pin statuses`)

  await pipeline(
    async function* () {
      let offset = 0
      const limit = 1000
      while (true) {
        log(`🐶 fetching pins ${offset} -> ${offset + limit} of ${count}`)
        const pins = await fetchPins(offset, limit)
        if (!pins.length) {
          return
        }
        yield pins
        offset += limit
      }
    },
    async function* (source) {
      for await (let pins of source) {
        // TODO: remove filter when nft2 has finished copying to nft3
        pins = pins.filter((p) => p.service !== 'IpfsCluster2')
        // Split into chunks of MAX_CLUSTER_STATUS_CIDS
        while (pins.length) {
          yield pins.slice(0, MAX_CLUSTER_STATUS_CIDS)
          pins = pins.slice(MAX_CLUSTER_STATUS_CIDS)
        }
      }
    },
    transform(CONCURRENCY, async (pins) => {
      /** @type {Pin[]} */
      const updatedPins = []
      const cids = pins.map((p) => p.source_cid)
      const statuses = await cluster3.statusAll({ cids })
      const statusByCid = Object.fromEntries(statuses.map((s) => [s.cid, s]))

      for (const pin of pins) {
        const statusRes = statusByCid[pin.source_cid]
        const pinInfos = Object.values(statusRes.peerMap)

        /** @type {Pin['status']} */
        let status = 'PinError'
        if (pinInfos.some((i) => i.status === 'pinned')) {
          status = 'Pinned'
        } else if (pinInfos.some((i) => i.status === 'pinning')) {
          status = 'Pinning'
        } else if (pinInfos.some((i) => i.status === 'pin_queued')) {
          status = 'PinQueued'
        }

        // Only set to PinError if Cluster was not able to pin the data after
        // the PIN_ERROR_GRACE_PERIOD.
        const pinAge = Date.now() - new Date(pin.inserted_at).getTime()
        if (status === 'PinError' && pinAge < PIN_ERROR_GRACE_PERIOD) {
          log(`ℹ️ ${pin.source_cid} is ${status} in grace period`)
          status = 'Pinning'
        }

        if (status !== pin.status) {
          log(`📌 ${pin.source_cid} ${pin.status} => ${status}`)
          updatedPins.push({
            ...pin,
            status,
            updated_at: new Date().toISOString(),
          })
        }
      }

      if (updatedPins.length) {
        const updateSql = getUpdatePinStatusesSql(updatedPins)
        await pg.query(updateSql)
      }

      log(`🗂 ${pins.length} processed, ${updatedPins.length} updated`)
    }),
    consume
  )

  log('✅ Done')
}
