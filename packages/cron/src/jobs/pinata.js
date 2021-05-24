import debug from 'debug'
import { findNs } from '../lib/utils.js'

const log = debug('pinata:pinToPinata')

/**
 * Sends pin requests to Pinata.
 *
 * @param {import('../types').Config & {
 *   pinata: import('../lib/pinata').Pinata
 *   hostNodes: string[]
 * }} config
 */
export async function pinToPinata({ cf, env, pinata, hostNodes }) {
  const namespaces = await cf.fetchKVNamespaces()
  const pinsNs = findNs(namespaces, env, 'PINS')
  log(`🎯 Syncing ${pinsNs.title} to Pinata`)

  let total = 0
  for await (const keys of cf.fetchKVKeys(pinsNs.id)) {
    log(`📥 Processing ${total} -> ${total + keys.length}`)

    /** @type {import('../lib/cloudflare.js').BulkWritePair[]} */
    const bulkWrites = []
    let i = 0

    await Promise.all(
      keys.map(async (k) => {
        const { name: cid, metadata: pin } = k

        // if not pinned by us or already pinned on Pinata
        if (pin.status !== 'pinned' || pin.pinataStatus === 'pinned') {
          return
        }

        // submit to Pinata
        await pinata.pinByHash(cid, { pinataOptions: { hostNodes } })
        log(`📌 ${cid} submitted to Pinata! ${++i}/${keys.length}`)

        const metadata = { ...pin, pinataStatus: 'pinned' }
        bulkWrites.push({ key: cid, value: '', metadata })
      })
    )

    if (bulkWrites.length) {
      log(`🗂 updating pinata status for ${bulkWrites.length} pins`)
      await cf.writeKVMulti(pinsNs.id, bulkWrites)
    }

    total += keys.length
  }
}
