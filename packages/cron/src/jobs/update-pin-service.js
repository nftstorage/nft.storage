import { consume, transform, pipeline } from 'streaming-iterables'
import retry from 'p-retry'
import fs from 'fs'

const MAX_CLUSTER_STATUS_CIDS = 120
const CONCURRENCY = 5

/**
 * @typedef {import('pg').Client} Client
 * @typedef {{
 *   pg: Client
 *   cluster3: import('@nftstorage/ipfs-cluster').Cluster
 * }} Config
 * @typedef {{ id: number, content_cid: string, source_cid: string, service: 'IpfsCluster'|'IpfsCluster2' }} PinRow
 */

const COUNT_PINS =
  "SELECT COUNT(*) FROM pin WHERE service IN ('IpfsCluster', 'IpfsCluster2')"
const FETCH_PINS = `
    SELECT p.id, p.content_cid, u.source_cid, p.service
      FROM pin p
INNER JOIN upload u
        ON p.content_cid = u.content_cid
     WHERE p.service IN ('IpfsCluster', 'IpfsCluster2')
    OFFSET $1
     LIMIT $2
`

/**
 * @param {Array<{ id: number, service: string, updated_at: string }>} pins
 */
function getUpdatePinStatusesSql(pins) {
  return `
UPDATE pin AS p
   SET service = c.service,
       updated_at = c.updated_at
  FROM (VALUES ${pins.map(
    (p) =>
      `(${p.id}, '${p.service}'::service_type, '${p.updated_at}'::timestamp)`
  )}) AS c(id, service, updated_at) 
 WHERE c.id = p.id`.trim()
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
    const { rows } = await config.pg.query(COUNT_PINS)
    if (!rows.length) throw new Error('no rows returned counting v0 CIDs')
    return rows[0].count
  }

  /**
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<PinRow[]>}
   */
  const fetchPins = async (offset, limit) => {
    const { rows } = await config.pg.query(FETCH_PINS, [offset, limit])
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
  const { countPins, fetchPins, cluster3 } = config

  console.log('🧮 Counting pins with old cluster service')
  const count = await countPins()
  console.log(`🎯 Updating ${count} pin services`)

  const problemStream = fs.createWriteStream(
    `./problem-cids-${Date.now()}.ndjson`
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
      const updatedPins = []
      for (const p of pins) {
        const statuses = Object.values(statusByCid[p.source_cid].peerMap)
          .filter((s) => s.status !== 'remote')
          .filter((s) => s.status !== 'unpinned')
          .map((s) => s.status)

        // if there's some statuses then cluster is tracking the CID
        if (statuses.length) {
          // much success! update in DB
          updatedPins.push({
            id: p.id,
            service: 'IpfsCluster3',
            updated_at: new Date().toISOString(),
          })
        } else {
          await new Promise((resolve) =>
            problemStream.write(
              `${JSON.stringify({ cid: p.source_cid, statuses })}\n`,
              resolve
            )
          )
        }
      }

      if (updatedPins.length) {
        // const updateSql = getUpdatePinStatusesSql(updatedPins)
        // await pg.query(updateSql)
      }

      console.log(`🗂 ${pins.length} processed, ${updatedPins.length} updated`)
    }),
    consume
  )

  await new Promise((resolve) => problemStream.end(resolve))
  console.log('✅ Done')
}
