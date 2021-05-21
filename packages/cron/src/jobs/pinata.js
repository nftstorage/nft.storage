import debug from 'debug'
import { findNs } from '../lib/utils.js'

const log = debug('pinata:syncPinata')

/**
 * Syncs our pinset with Pinata.
 *
 * @param {import('../types').Config & {
 *   pinata: import('../lib/pinata').Pinata
 *   hostNodes: string[]
 * }} config
 */
export async function syncPinata({ cf, env, pinata, hostNodes }) {
  const namespaces = await cf.fetchKVNamespaces()
  const pinsNs = findNs(namespaces, env, 'PINS')
  log(`🎯 Syncing ${pinsNs.title} to Pinata`)

  let i = 0
  for await (const keys of cf.fetchKVKeys(pinsNs.id)) {
    log(`📥 Processing ${i} -> ${i + keys.length}`)

    /** @type {import('../lib/cloudflare.js').BulkWritePair[]} */
    const bulkWrites = []

    await Promise.all(
      keys.map(async (k) => {
        const { name: cid, metadata: pin } = k

        // if not pinned by us or already pinned on Pinata
        if (pin.status !== 'pinned' || pin.pinataStatus === 'pinned') {
          return
        }

        const pinned = await pinata.isPinned(cid)
        // if pinata has finally pinned it then update status in our KV
        if (pinned) {
          log(`📌 ${cid} became pinned on Pinata!`)
          const metadata = { ...pin, pinataStatus: 'pinned' }
          return bulkWrites.push({ key: cid, value: '', metadata })
        }

        // submit to Pinata
        log(`🙏 asking Pinata to pin ${cid}`)
        return pinata.pinByHash(cid, { pinataOptions: { hostNodes } })
      })
    )

    if (bulkWrites.length) {
      log(`🗂 updating pinata status for ${bulkWrites.length} pins`)
      await cf.writeKVMulti(pinsNs.id, bulkWrites)
    }

    i += keys.length
  }
}
