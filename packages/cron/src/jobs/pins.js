import debug from 'debug'
import { DBError } from '../../../api/src/utils/db-client.js'

const log = debug('pins:updatePinStatuses')

/**
 * @typedef {{
 *   db: import('../../../api/src/utils/db-client').DBClient
 *   cluster1: import('@nftstorage/ipfs-cluster').Cluster
 *   cluster2: import('@nftstorage/ipfs-cluster').Cluster
 *   cluster3: import('@nftstorage/ipfs-cluster').Cluster
 * }} Config
 * @typedef {import('../../../api/src/utils/db-types').definitions} definitions
 * @typedef {Pick<definitions['pin'], 'id'|'status'|'content_cid'|'service'|'inserted_at'|'updated_at'>} Pin
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<Pin>} PinQuery
 */

/**
 * Updates pin status and size by retrieving updated status from cluster.
 *
 * @param {Config} conf
 */
export async function updatePendingPinStatuses(conf) {
  const countPins = async () => {
    const { count, error: countError } = await conf.db.client
      .from('pin')
      .select('*', { count: 'exact', head: true })
      .in('service', ['IpfsCluster', 'IpfsCluster2', 'IpfsCluster3'])
      .neq('status', 'Pinned')
      .neq('status', 'PinError')
      .range(0, 1)
    if (countError) {
      throw new DBError(countError)
    }
    if (count == null) {
      throw new Error('failed to count pins')
    }
    return count
  }

  /**
   * @param {number} offset
   * @param {number} limit
   */
  const fetchPins = async (offset, limit) => {
    /** @type {PinQuery} */
    const query = conf.db.client.from('pin')
    const { data: pins, error } = await query
      .select('id,status,content_cid,service')
      .in('service', ['IpfsCluster', 'IpfsCluster2'])
      .neq('status', 'Pinned')
      .neq('status', 'PinError')
      .range(offset, offset + limit - 1)
    if (error) {
      throw new DBError(error)
    }
    if (!pins) {
      throw new Error('failed to fetch pins')
    }
    return pins
  }

  await updatePinStatuses({ ...conf, countPins, fetchPins })
}

/**
 * Check on failed pins < 1 month old to see if their status changed from failed
 * to pinned.
 *
 * @param {Config & { after: Date }} config
 */
export async function checkFailedPinStatuses(config) {
  const { db, after } = config

  const countPins = async () => {
    const { count, error: countError } = await db.client
      .from('pin')
      .select('*', { count: 'exact', head: true })
      .in('service', ['IpfsCluster', 'IpfsCluster2', 'IpfsCluster3'])
      .eq('status', 'PinError')
      .gt('inserted_at', after.toISOString())
      .range(0, 1)
    if (countError) {
      throw new DBError(countError)
    }
    if (count == null) {
      throw new Error('failed to count pins')
    }
    return count
  }

  /**
   * @param {number} offset
   * @param {number} limit
   */
  const fetchPins = async (offset, limit) => {
    /** @type {PinQuery} */
    const query = db.client.from('pin')
    const { data: pins, error } = await query
      .select('id,status,content_cid,service')
      .in('service', ['IpfsCluster', 'IpfsCluster2', 'IpfsCluster3'])
      .eq('status', 'PinError')
      .gt('inserted_at', after.toISOString())
      .range(offset, offset + limit - 1)
    if (error) {
      throw new DBError(error)
    }
    if (!pins) {
      throw new Error('failed to fetch pins')
    }
    return pins
  }

  log(`⏰ Checking pins created after ${after.toISOString()}`)
  await updatePinStatuses({ ...config, countPins, fetchPins })
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
  const { countPins, fetchPins, db, cluster1, cluster2, cluster3 } = config
  if (!log.enabled) {
    console.log('ℹ️ Enable logging by setting DEBUG=pins:updatePinStatuses')
  }

  const count = await countPins()
  log(`🎯 Updating ${count} pin statuses`)

  let offset = 0
  const limit = 1000
  while (true) {
    const pins = await fetchPins(offset, limit)
    if (!pins.length) {
      break
    }

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
      // bulk upsert
      const { error: updateError } = await db.client
        .from('pin')
        .upsert(updatedPins, { count: 'exact', returning: 'minimal' })

      if (updateError) {
        throw Object.assign(new Error(), updateError)
      }
    }

    log(`🗂 ${pins.length} processed, ${updatedPins.length} updated`)
    log(`ℹ️ ${offset + pins.length} of ${count} processed in total`)

    offset += limit
  }

  log('✅ Done')
}
