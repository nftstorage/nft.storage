import debug from 'debug'

const log = debug('pinata:pinToPinata')

/**
 * @typedef {import('../../../api/src/utils/db-types').definitions} definitions
 * @typedef {Pick<definitions['pin'], 'id'|'status'|'content_cid'|'service'|'updated_at'>} Pin
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<Pin>} PinQuery
 */

/**
 * Sends pin requests to Pinata.
 *
 * @param {{
 *   db: import('../../../api/src/utils/db-client').DBClient
 *   pinata: import('../lib/pinata').Pinata
 * }} config
 */
export async function pinToPinata({ db, pinata }) {
  if (!log.enabled) {
    console.log('ℹ️ Enable logging by setting DEBUG=pinata:pinToPinata')
  }

  const { count, error: countError } = await db.client
    .from('pin')
    .select('*', { count: 'exact', head: true })
    .eq('service', 'Pinata')
    .neq('status', 'Pinned')
    .neq('status', 'PinError')

  if (countError) {
    throw Object.assign(new Error(), countError)
  }

  log(`🎯 Updating pin ${count} statuses`)

  let from = 0
  const pageSize = 1000
  while (true) {
    /** @type {PinQuery} */
    const query = db.client.from('pin')
    const { data: pins, error } = await query
      .select('id,status,content_cid,service')
      .eq('service', 'Pinata')
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

    /** @type {PinUpdate[]} */
    const updatedPins = []
    for (const pin of pins) {
      try {
        const pinataOptions = {} // TODO: add origins
        await pinata.pinByHash(pin.content_cid, { pinataOptions })
        log(
          `📌 ${pin.content_cid} submitted to Pinata! ${pins.findIndex(pin)}/${
            pins.length
          }`
        )
        updatedPins.push({
          ...pin,
          status: 'Pinned', // FIXME: not really pinned, queued
          updated_at: new Date().toISOString(),
        })
      } catch (err) {
        log(`💥 failed to pin ${pin.content_cid}`, err)
      }
    }

    if (updatedPins.length) {
      const { error: updateError } = await db.client
        .from('pin')
        .upsert(updatedPins, { count: 'exact', returning: 'minimal' })

      if (updateError) {
        throw Object.assign(new Error(), updateError)
      }
    }

    log(`🗂 ${pins.length} processed, ${updatedPins.length} updated`)
    log(`ℹ️ ${from + pins.length} of ${count} processed in total`)

    from += pageSize
  }

  log('✅ Done')
}
