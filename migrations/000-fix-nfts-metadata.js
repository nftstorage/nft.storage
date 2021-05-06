/**
 * This migration ensures all the records in the NFTS table have appropriate
 * metadata set.
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
  const table = findNs(namespaces, env, 'NFTS')

  console.log(`🎯 Fixing ${table.title}`)
  let total = 0
  for await (const keys of cf.fetchKVKeys(table.id)) {
    const bulkWrites = []
    await Promise.all(
      keys.filter(Boolean).map(async (k) => {
        let { metadata } = k
        if (!metadata) {
          console.log(`📖 reading ${k.name} to fix missing metadata`)
          const value = await cf.readKV(table.id, k.name)
          console.log(`📗 read ${k.name}`)
          metadata = {
            pinStatus: value.pin.status,
            size: value.size,
            created: value.created,
          }
          // if pinned and no size, then set to pinning in meta so cron will
          // pick it up and update status and size.
          if (metadata.pinStatus === 'pinned' && !metadata.size) {
            metadata.pinStatus = 'pinning'
          }
          bulkWrites.push({ key: k.name, value, metadata })
          return
        }
        let { created } = metadata
        if (!created) {
          console.log(
            `📖 reading ${k.name} to fix missing created date in metadata`
          )
          const value = await cf.readKV(table.id, k.name)
          console.log(`📗 read ${k.name}`)
          created = value.created
          bulkWrites.push({
            key: k.name,
            value,
            metadata: { ...metadata, created },
          })
        }
      })
    )
    if (bulkWrites.length) {
      console.log(`💔 fixing metadata for ${bulkWrites.length} NFTs`)
      await cf.writeKVMulti(table.id, bulkWrites)
    }
    total += keys.length
    console.log(`🦄 processed ${total} NFTs`)
  }
  console.log('✅ done')
}

main().catch(console.error)
