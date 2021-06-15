import debug from 'debug'
import { findNs } from '../lib/utils.js'
import { decodeIndexKey } from '../../../api/src/utils/nfts-index.js'

const log = debug('nfts-index:updateMeta')

/**
 * Adds and updates NFT metadata in the NFTS_IDX table. The metadata extracted
 * is used by the Pinning Services API pins listing.
 *
 * @param {import('../types').Config} config
 */
export async function updateMeta({ cf, env }) {
  const namespaces = await cf.fetchKVNamespaces()
  const nftsIdxNs = findNs(namespaces, env, 'NFTS_IDX')
  const nftsNs = findNs(namespaces, env, 'NFTS')
  const pinsNs = findNs(namespaces, env, 'PINS')

  log(`🎯 Updating ${nftsIdxNs.title} from ${pinsNs.title} and ${nftsNs.title}`)

  let total = 0
  for await (const keys of cf.fetchKVKeys(nftsIdxNs.id)) {
    log(`📥 Processing ${total} -> ${total + keys.length}`)

    /** @type {import('../lib/cloudflare.js').BulkWritePair[]} */
    const bulkWrites = []
    /** @type {string[]} */
    const bulkDeletes = []

    for (const { name, metadata } of keys) {
      try {
        if (isPinnedOrFailed(metadata.pinStatus)) {
          continue
        }
        const key = decodeIndexKey(name)
        const pin = await cf.readKVMeta(pinsNs.id, key.cid)
        if (!pin) {
          throw new Error(`missing pin for ${key.cid}`)
        }
        // no change
        if (pin.status === metadata.pinStatus) {
          continue
        }
        const nft = await cf.readKV(nftsNs.id, metadata.key)
        if (!nft) {
          bulkDeletes.push(name)
          throw new Error(`missing nft for ${metadata.key}`)
        }
        bulkWrites.push({
          key: name,
          value: '',
          metadata: {
            ...metadata, // key (in NFTS)
            ...(nft.pin || {}), // name/meta
            pinStatus: pin.status,
            size: pin.size,
          },
        })
        log(
          `📌 ${name}: status: ${metadata.pinStatus} -> ${pin.status}, size: ${metadata.size} -> ${pin.size}`
        )
      } catch (err) {
        err.message = `updating NFTS_IDX meta for ${name}: ${err.message}`
        log(err)
      }
    }

    if (bulkWrites.length) {
      log(`🗂 updating meta for ${bulkWrites.length} indexed NFTs`)
      await cf.writeKVMulti(nftsIdxNs.id, bulkWrites)
    }

    if (bulkDeletes.length) {
      log(`🗑 removing ${bulkDeletes.length} orphan index entries`)
      await cf.deleteKVMulti(nftsIdxNs.id, bulkDeletes)
    }

    total += keys.length
  }
}

/**
 * @param {string} [status]
 */
function isPinnedOrFailed(status) {
  return status ? ['pinned', 'failed'].includes(status) : false
}
