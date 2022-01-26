import debug from 'debug'
import { consume, transform, pipeline } from 'streaming-iterables'

const log = debug('pins:updatePinStatuses')
const CONCURRENCY = 5
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
 * @typedef {Pick<definitions['pin'], 'id'|'status'|'content_cid'|'service'|'inserted_at'|'updated_at'>} Pin
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<Pin>} PinQuery
 */

const CLUSTER_LIST = CLUSTERS.map((c) => `'${c}'`).toString()
const COUNT_PENDING_PINS = `SELECT COUNT(*) FROM pin WHERE service IN (${CLUSTER_LIST}) AND status != 'Pinned' AND status != 'PinError'`
const FETCH_PENDING_PINS = `SELECT * FROM pin WHERE service IN (${CLUSTER_LIST}) AND status != 'Pinned' AND status != 'PinError' OFFSET $1 LIMIT $2`

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
const FETCH_FAILED_PINS = `SELECT * FROM pin WHERE service IN (${CLUSTER_LIST}) AND status = 'PinError' AND inserted_at > $1 OFFSET $2 LIMIT $3`

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
 *   fetchPins: (offset:number, limit: number) => Promise<Pin[]>
 * }} config
 */
async function updatePinStatuses(config) {
  const { countPins, fetchPins, pg, cluster2, cluster3 } = config
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
    transform(CONCURRENCY, async (pins) => {
      /** @type {Pin[]} */
      const updatedPins = []
      for (const pin of pins) {
        /** @type {import('@nftstorage/ipfs-cluster/dist/src/interface').StatusResponse} */
        let statusRes

        switch (pin.service) {
          case 'IpfsCluster':
            statusRes = await cluster3.status(pin.content_cid)
            break
          case 'IpfsCluster2':
            statusRes = await cluster2.status(pin.content_cid)
            break
          case 'IpfsCluster3':
            statusRes = await cluster3.status(pin.content_cid)
            break
          default:
            throw new Error(`Service ${pin.service} not supported.`)
        }

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

        if (status !== pin.status) {
          log(`📌 ${pin.content_cid} ${pin.status} => ${status}`)
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
