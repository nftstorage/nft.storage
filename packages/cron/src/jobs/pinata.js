import debug from 'debug'
import { findNs } from '../lib/utils.js'

const log = debug('pinata:pinToPinata')
const MAX_ATTEMPTS = 100

/**
 * Sends pin requests to Pinata.
 *
 * @param {import('../types').Config & {
 *   pinata: import('../lib/pinata').Pinata
 * }} config
 */
export async function pinToPinata({ cf, env, pinata }) {
  const namespaces = await cf.fetchKVNamespaces()
  const pinataQueueNs = findNs(namespaces, env, 'PINATA_QUEUE')
  log(`🎯 Sending pins from ${pinataQueueNs.title} to Pinata`)

  let total = 0
  for await (const keys of cf.fetchKVKeys(pinataQueueNs.id)) {
    log(`📥 Processing ${total} -> ${total + keys.length}`)

    /** @type {import('../lib/cloudflare.js').BulkWritePair[]} */
    const bulkWrites = []
    /** @type {string[]} */
    const bulkDeletes = []
    let i = 0
    await Promise.all(
      keys.map(async (k) => {
        const cid = k.name
        const metadata = k.metadata || {}
        /** @type number[] */
        const attempts = metadata.attempts || []
        /** @type string[] */
        const origins = metadata.origins || []

        try {
          const pinataOptions = origins.length ? { hostNodes: origins } : {}
          await pinata.pinByHash(cid, { pinataOptions })
          log(`📌 ${cid} submitted to Pinata! ${++i}/${keys.length}`)
          bulkDeletes.push(cid)
        } catch (err) {
          attempts.push(Date.now())
          const retries = MAX_ATTEMPTS - attempts.length
          log(
            `💥 ${cid} failed to pin to Pinata: ${retries} attempts left`,
            err
          )
          if (retries) {
            bulkWrites.push({
              key: cid,
              value: '',
              metadata: { ...metadata, attempts },
            })
          } else {
            bulkDeletes.push(cid)
          }
        }
      })
    )

    if (bulkDeletes.length) {
      log(`🗑 removing ${bulkDeletes.length} completed items from the queue`)
      await cf.deleteKVMulti(pinataQueueNs.id, bulkDeletes)
    }
    if (bulkWrites.length) {
      log(`🗂 updating ${bulkWrites.length} failed items in the queue`)
      await cf.writeKVMulti(pinataQueueNs.id, bulkWrites)
    }

    total += keys.length
  }
}
