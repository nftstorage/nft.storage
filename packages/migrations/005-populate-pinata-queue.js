/**
 * This migration adds the existing pins to the Pinata queue to ensure they are
 * pinned and none were missed due to the Pinata rate limit.
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
  const pinsTable = findNs(namespaces, env, 'PINS')
  const pinataQueueTable = findNs(namespaces, env, 'PINATA_QUEUE')

  console.log(`🎯 Populating ${pinataQueueTable.title} from ${pinsTable.title}`)
  let total = 0
  for await (const keys of cf.fetchKVKeys(pinsTable.id)) {
    const bulkWrites = keys
      .filter(Boolean)
      .filter((k) => k.metadata.status === 'pinned')
      .map((k) => ({ key: k.name, value: '', metadata: {} }))

    if (bulkWrites.length) {
      console.log(`🗂 queueing ${bulkWrites.length} CIDs for pinning to Pinata`)
      await cf.writeKVMulti(pinataQueueTable.id, bulkWrites)
    }

    total += keys.length
    console.log(`🦄 processed ${total} pins`)
  }
  console.log('✅ done')
}

main().catch(console.error)
