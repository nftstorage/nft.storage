import { consume, transform, pipeline } from 'streaming-iterables'
import retry from 'p-retry'
import fs from 'fs'

const MAX_CLUSTER_STATUS_CIDS = 120
const CONCURRENCY = 5

/**
 * @typedef {import('pg').Pool} Client
 * @typedef {{
 *   roPg: Client
 *   rwPg: Client
 *   cluster3: import('@nftstorage/ipfs-cluster').Cluster
 * }} Config
 * @typedef {{ id: number, content_cid: string, source_cid: string, service: 'IpfsCluster'|'IpfsCluster2', status: string }} PinRow
 */

const COUNT_PINS =
  "SELECT COUNT(*) FROM pin WHERE service IN ('IpfsCluster', 'IpfsCluster2')"
const FETCH_PINS = `
    SELECT p.id, p.content_cid, u.source_cid, p.service, p.status
      FROM pin p
INNER JOIN upload u
        ON p.content_cid = u.content_cid
     WHERE p.service IN ('IpfsCluster', 'IpfsCluster2')
    OFFSET $1
     LIMIT $2
`
const UPDATE_PIN_SERVICE =
  "UPDATE pin SET service = 'IpfsCluster3', updated_at = NOW() WHERE id = $1"
const DELETE_PIN = 'DELETE FROM pin WHERE id = $1'

/**
 * @param {number[]} ids
 */
function getUpdatePinServiceSql(ids) {
  return `
UPDATE pin
   SET service = 'IpfsCluster3',
       updated_at = NOW()
 WHERE id IN (${ids})`
}

/**
 * Updates pin status and size by retrieving updated status from cluster.
 *
 * @param {Config} config
 */
export async function updatePinService(config) {
  /**
   * @returns {Promise<number>}
   */
  const countPins = async () => {
    const { rows } = await config.roPg.query(COUNT_PINS)
    if (!rows.length) throw new Error('no rows returned counting v0 CIDs')
    return rows[0].count
  }

  /**
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<PinRow[]>}
   */
  const fetchPins = async (offset, limit) => {
    const { rows } = await config.roPg.query(FETCH_PINS, [offset, limit])
    return rows
  }

  await doUpdatePinService({ ...config, countPins, fetchPins })
}

/**
 * @param {Config & {
 *   countPins: () => Promise<number>
 *   fetchPins: (offset: number, limit: number) => Promise<PinRow[]>
 * }} config
 */
async function doUpdatePinService(config) {
  const { countPins, fetchPins, cluster3, rwPg } = config

  console.log('🧮 Counting pins with old cluster service')
  const count = await countPins()
  console.log(`🎯 Updating ${count} pin services`)

  const problemStream = fs.createWriteStream(
    `./problem-cids-${Date.now()}.ndjson`
  )

  /**
   * @param {PinRow} pin
   * @param {string[]} clusterStatuses
   */
  const logProblem = (pin, clusterStatuses) =>
    new Promise((resolve) =>
      problemStream.write(
        `${JSON.stringify({
          sourceCid: pin.source_cid,
          contentCid: pin.content_cid,
          status: pin.status,
          clusterStatuses,
        })}\n`,
        resolve
      )
    )

  await pipeline(
    async function* () {
      let offset = 0
      const limit = 1000
      while (true) {
        console.log(
          `🐶 fetching pins ${offset} -> ${offset + limit} of ${count}`
        )
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
        // Split into chunks of MAX_CLUSTER_STATUS_CIDS
        while (pins.length) {
          yield pins.slice(0, MAX_CLUSTER_STATUS_CIDS)
          pins = pins.slice(MAX_CLUSTER_STATUS_CIDS)
        }
      }
    },
    transform(CONCURRENCY, async (pins) => {
      const statusRes = await retry(() =>
        cluster3.statusAll({ cids: pins.map((p) => p.source_cid) })
      )
      const statusByCid = Object.fromEntries(statusRes.map((s) => [s.cid, s]))
      const updatablePinIds = []
      for (const p of pins) {
        const statuses = Object.values(statusByCid[p.source_cid].peerMap)
          .filter((s) => s.status !== 'remote')
          .filter((s) => s.status !== 'unpinned')
          .map((s) => s.status)

        // if there's some statuses then cluster is tracking the CID
        if (statuses.length) {
          // log a problem if we think it is pinned but it is not pinned on any cluster node
          if (p.status === 'Pinned' && !statuses.some((s) => s === 'pinned')) {
            await logProblem(p, statuses)
          } else {
            updatablePinIds.push(p.id)
          }
        } else {
          await logProblem(p, statuses)
        }
      }

      let numUpdated = 0
      let numDeleted = 0
      if (updatablePinIds.length) {
        try {
          await rwPg.query(getUpdatePinServiceSql(updatablePinIds))
          numUpdated = updatablePinIds.length
        } catch (/** @type {any} */ err) {
          if (err.constraint === 'pin_content_cid_service_key') {
            for (const id of updatablePinIds) {
              try {
                await rwPg.query(UPDATE_PIN_SERVICE, [id])
                numUpdated++
              } catch (/** @type {any} */ err) {
                if (err.constraint === 'pin_content_cid_service_key') {
                  console.warn(
                    `⛔️ deleting pin ${id}: there already exists a pin with this CID and service IpfsCluster3`
                  )
                  await rwPg.query(DELETE_PIN, [id])
                  numDeleted++
                } else {
                  throw err
                }
              }
            }
          } else {
            throw err
          }
        }
      }

      console.log(
        `🗂 ${pins.length} processed, ${numUpdated} updated, ${numDeleted} deleted`
      )
    }),
    consume
  )

  await new Promise((resolve) => problemStream.end(resolve))
  console.log('✅ Done')
}
