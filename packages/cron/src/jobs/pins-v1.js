import debug from 'debug'

const log = debug('pins:updatePinStatuses')

/**
 * @typedef {import('../../../api/src/utils/db-types').definitions} definitions
 * @typedef {Pick<definitions['pin'], 'id'|'status'|'content_cid'|'service'|'updated_at'>} Pin
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<Pin>} PinQuery
 */

/**
 * Updates pin status and size by retrieving updated status from cluster.
 *
 * @param {{
 *   db: import('../../../api/src/utils/db-client').DBClient
 *   cluster: import('@nftstorage/ipfs-cluster').Cluster
 * }} config
 */
export async function updatePinStatuses({ db, cluster }) {
  if (!log.enabled) {
    console.log('ℹ️ Enable logging by setting DEBUG=pins:updatePinStatuses')
  }

  const { count, error: countError } = await db.client
    .from('pin')
    .select('*', { count: 'exact', head: true })
    .eq('service', 'IpfsCluster')
    .neq('status', 'Pinned')
    .neq('status', 'PinError')

  if (countError) {
    throw countError
  }

  log(`🎯 Updating pin ${count} statuses`)

  let offset = 0
  const limit = 1000
  while (true) {
    /** @type {PinQuery} */
    const query = db.client.from('pin')
    const { data: pins, error } = await query
      .select('id,status,content_cid,service')
      .eq('service', 'IpfsCluster')
      .neq('status', 'Pinned')
      .neq('status', 'PinError')
      .range(offset, offset + limit - 1)

    if (error) {
      throw Object.assign(new Error(), error)
    }

    if (!pins) {
      throw new Error('no pins found')
    }

    if (!pins.length) {
      break
    }

    /** @type {Pin[]} */
    const updatedPins = []
    for (const pin of pins) {
      const statusRes = await cluster.status(pin.content_cid)
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
