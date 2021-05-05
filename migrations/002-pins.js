/**
 * This migration populates the PINS table using data in the NFTS table. It also
 * adds records to the FOLLOWUPS table if any pins need to be followed up on
 * because they are not yet pinned or have no size.
 */

import dotenv from 'dotenv'
import { Cloudflare } from './cloudflare.js'
import { findNs } from './utils.js'

dotenv.config()

async function main() {
  const env = process.env.ENV || 'dev'
  const cf = new Cloudflare({
    accountId: process.env.CF_ACCOUNT,
    apiToken: process.env.CF_TOKEN,
  })
  console.log(`🐶 fetching KV namespaces`)
  const namespaces = await cf.fetchKVNamespaces()
  const nftsTable = findNs(namespaces, env, 'NFTS')
  const pinsTable = findNs(namespaces, env, 'PINS')
  const followupsTable = findNs(namespaces, env, 'FOLLOWUPS')

  console.log(`🎯 Populating ${pinsTable.title} from ${nftsTable.title}`)
  let total = 0
  for await (const keys of cf.fetchKVKeys(nftsTable.id)) {
    const seen = new Set()
    const bulkWrites = { pins: [], followups: [] }
    keys.filter(Boolean).forEach((k) => {
      const cid = k.name.split(':').pop()
      if (seen.has(cid)) return
      seen.add(cid)
      if (!isPinnedOrFailed(k.metadata.pinStatus) || !k.metadata.size) {
        bulkWrites.followups.push({
          key: cid,
          value: '',
          metadata: {
            status: k.metadata.pinStatus,
            size: k.metadata.size,
            created: k.metadata.created,
          },
        })
      }
      bulkWrites.pins.push({
        key: cid,
        value: '',
        metadata: {
          status: k.metadata.pinStatus,
          size: k.metadata.size,
          created: k.metadata.created,
        },
      })
    })
    if (bulkWrites.pins.length) {
      console.log(`🗂 writing pin values for ${bulkWrites.pins.length} NFTs`)
      await cf.writeMultiKV(pinsTable.id, bulkWrites.pins)
    }
    if (bulkWrites.followups.length) {
      console.log(
        `🔁 writing followup values for ${bulkWrites.followups.length} pins`
      )
      await cf.writeMultiKV(followupsTable.id, bulkWrites.followups)
    }
    total += keys.length
    console.log(`🦄 processed ${total} NFTs`)
  }
  console.log('✅ done')
}

main().catch(console.error)

function isPinnedOrFailed(status) {
  return status === 'pinned' || status === 'failed'
}
