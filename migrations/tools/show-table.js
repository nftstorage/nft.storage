/**
 * Utility to list a KV namespace's keys, values and metadata.
 *
 * Usage:
 *     node show-table.js NFTS
 *     node show-table.js DEALS --only-meta
 */
import dotenv from 'dotenv'
import { Cloudflare } from '../cloudflare.js'
import { findNs } from '../utils.js'

dotenv.config()

async function main() {
  const env = process.env.ENV || 'dev'
  const tableName = process.argv[2]
  const onlyMeta = process.argv[3] === '--only-meta'
  const cf = new Cloudflare({
    accountId: process.env.CF_ACCOUNT,
    apiToken: process.env.CF_TOKEN,
  })
  const namespaces = await cf.fetchKVNamespaces()
  const table = findNs(namespaces, env, tableName)
  console.log(`🪑 ${table.title}`)

  let i = 0
  for await (const keys of cf.fetchKVKeys(table.id)) {
    i += keys.length
    for (const k of keys) {
      if (onlyMeta) {
        console.log(
          `${k.name}\t${k.metadata ? JSON.stringify(k.metadata) : ''}`
        )
      } else {
        const value = await cf.readKV(table.id, k.name)
        console.log(
          `${k.name}\t${JSON.stringify(value)}\t${
            k.metadata ? JSON.stringify(k.metadata) : ''
          }`
        )
      }
    }
  }
  console.log(`${i} total`)
}

main().catch(console.error)
