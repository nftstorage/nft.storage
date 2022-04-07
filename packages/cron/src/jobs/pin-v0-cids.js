import { consume, transform, pipeline } from 'streaming-iterables'
import retry from 'p-retry'

const MAX_CLUSTER_STATUS_CIDS = 120
const CONCURRENCY = 5

/**
 * @typedef {import('pg').Client} Client
 * @typedef {{
 *   pg: Client
 *   cluster3: import('@nftstorage/ipfs-cluster').Cluster
 * }} Config
 */

const COUNT_CIDS =
  "SELECT COUNT(*) FROM upload WHERE type = 'Remote' AND source_cid != content_cid"
const FETCH_CIDS = `
SELECT source_cid
  FROM upload
 WHERE type = 'Remote'
   AND source_cid != content_cid
OFFSET $1
 LIMIT $2
`

/**
 * Updates pin status and size by retrieving updated status from cluster.
 *
 * @param {Config} config
 */
export async function pinV0Cids(config) {
  /**
   * @returns {Promise<number>}
   */
  const countCids = async () => {
    const { rows } = await config.pg.query(COUNT_CIDS)
    if (!rows.length) throw new Error('no rows returned counting v0 CIDs')
    return rows[0].count
  }

  /**
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<string[]>}
   */
  const fetchCids = async (offset, limit) => {
    const { rows } = await config.pg.query(FETCH_CIDS, [offset, limit])
    return rows.map((r) => r.source_cid)
  }

  await doPinV0s({ ...config, countCids, fetchCids })
}

/**
 * @param {Config & {
 *   countCids: () => Promise<number>
 *   fetchCids: (offset: number, limit: number) => Promise<string[]>
 * }} config
 */
async function doPinV0s(config) {
  const { countCids, fetchCids, cluster3 } = config

  console.log('🧮 Counting v0 CIDs')
  const count = await countCids()
  console.log(`🎯 Pinning ${count} v0 CIDs`)

  await pipeline(
    async function* () {
      let offset = 0
      const limit = 1000
      while (true) {
        console.log(
          `🐶 fetching CIDs ${offset} -> ${offset + limit} of ${count}`
        )
        const cids = await fetchCids(offset, limit)
        if (!cids.length) {
          return
        }
        yield cids
        offset += limit
      }
    },
    async function* (source) {
      for await (let cids of source) {
        // Split into chunks of MAX_CLUSTER_STATUS_CIDS
        while (cids.length) {
          yield cids.slice(0, MAX_CLUSTER_STATUS_CIDS)
          cids = cids.slice(MAX_CLUSTER_STATUS_CIDS)
        }
      }
    },
    transform(CONCURRENCY, async (cids) => {
      const statuses = await retry(() => cluster3.statusAll({ cids }))
      /** @type {string[]} */
      const pinCids = []
      for (const s of statuses) {
        const allUnpinned = Object.values(s.peerMap).every(
          (inf) => inf.status === 'unpinned'
        )
        if (allUnpinned) {
          pinCids.push(s.cid)
        }
      }
      console.log(`#️⃣ ${pinCids.length}/${cids.length} CIDs to pin...`)
      for (const cid of cids) {
        await retry(() => cluster3.pin(cid), {
          onFailedAttempt: (err) =>
            console.error(
              `failed pin ${cid}: ${err.message} (attempt ${
                err.attemptNumber
              }/${err.attemptNumber + err.retriesLeft})`
            ),
        })
        // console.log(`📌 pinned ${cid}`)
      }
    }),
    consume
  )

  console.log('✅ Done')
}
