/**
 * @typedef {import('../../../api/src/utils/db-types').definitions} definitions
 * @typedef {Pick<definitions['pin'], 'id'|'status'|'content_cid'|'service'|'updated_at'>} Pin
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<Pin>} PinQuery
 */

/**
 * Updates pin status and size in the PINS table by consuming records in the
 * FOLLOWUPS table and retrieving updated status from cluster.
 *
 * @param {{
 *   env: string
 *   db: import('../../../api/src/utils/db-client').DBClient
 *   cluster: import('@nftstorage/ipfs-cluster').Cluster
 *   ipfs: import('../lib/ipfs').IPFS
 * }} config
 */
export async function updatePinStatuses({ db, cluster }) {
  const { count, error: countError } = await db.client
    .from('pin')
    .select('id,status,content_cid,service', { count: 'exact', head: true })
    .eq('service', 'IpfsCluster')
    .neq('status', 'Pinned')
    .neq('status', 'PinError')

  if (countError) {
    throw countError
  }

  let from = 0
  const pageSize = 10000
  while (true) {
    /** @type {PinQuery} */
    const query = db.client.from('pin')
    const { data: pins, error } = await query
      .select('id,status,content_cid,service')
      .eq('service', 'IpfsCluster')
      .neq('status', 'Pinned')
      .neq('status', 'PinError')
      .range(from, from + pageSize - 1)

    if (error) {
      throw error
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

      /** @type {"Pinned" | "PinError" | "PinQueued" | "Pinning"} */
      let status = 'PinError'
      if (pinInfos.some((i) => i.status === 'pinned')) {
        status = 'Pinned'
      } else if (pinInfos.some((i) => i.status === 'pinning')) {
        status = 'Pinning'
      } else if (pinInfos.some((i) => i.status === 'pin_queued')) {
        status = 'PinQueued'
      }

      if (status !== pin.status) {
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
        .update(updatedPins, { count: 'exact', returning: 'minimal' })

      if (updateError) {
        throw updateError
      }
    }

    console.log(`Overall there's ${count} pins to be processed.`)
    console.log(
      `In this run, ${pins.length} were processed and ${updatedPins.length} updated to new status.`
    )

    from += pageSize
  }
}
