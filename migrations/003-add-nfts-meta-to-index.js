/**
 * This migration adds the metadata stored in NFTS to the NFTS_IDX where it is
 * needed.
 *
 * Note: metadata in NFTS is no longer needed/used but we're just going to leave
 * it where it is.
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
  const nftsIdxTable = findNs(namespaces, env, 'NFTS_IDX')

  const nftsMeta = new Map()
  let i = 0
  for await (const keys of cf.fetchKVKeys(nftsTable.id)) {
    console.log(`💰 caching metadata for ${i} -> ${i + keys.length} NFTs`)
    keys.filter(Boolean).forEach((k) => nftsMeta.set(k.name, k.metadata))
    i += keys.length
  }

  console.log(`🎯 Updating ${nftsIdxTable.title} from ${nftsTable.title}`)
  let total = 0
  for await (const keys of cf.fetchKVKeys(nftsIdxTable.id)) {
    const bulkWrites = []
    keys.filter(Boolean).forEach((k) => {
      const { key } = k.metadata
      const meta = nftsMeta.get(key)
      if (!meta) {
        return console.warn(`❗️ missing metadata for ${key}`)
      }
      bulkWrites.push({ key, value: '', metadata: { ...k.metadata, ...meta } })
    })
    if (bulkWrites.length) {
      console.log(`🗂 updating index metadata for ${bulkWrites.length} NFTs`)
      await cf.writeMultiKV(nftsIdxTable.id, bulkWrites)
    }
    total += keys.length
    console.log(`🦄 processed ${total} NFTs`)
  }
  console.log('✅ done')
}

main().catch(console.error)
