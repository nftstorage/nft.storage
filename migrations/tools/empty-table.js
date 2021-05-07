/**
 * Utility to remove all content from a KV namespace.
 *
 * Usage:
 *     node empty-table.js NFTS_IDX
 */
import dotenv from 'dotenv'
import { Cloudflare } from '../cloudflare.js'
import { findNs } from '../utils.js'

dotenv.config()

async function main() {
  const env = process.env.ENV || 'dev'
  if (env === 'production') {
    throw new Error('refusing to empty production KV')
  }
  const tableName = process.argv[2]
  const cf = new Cloudflare({
    accountId: process.env.CF_ACCOUNT,
    apiToken: process.env.CF_TOKEN,
  })
  const namespaces = await cf.fetchKVNamespaces()
  const table = findNs(namespaces, env, tableName)
  console.log(`🪑 ${table.title}`)

  let i = 0
  for await (const keys of cf.fetchKVKeys(table.id)) {
    console.log(`🗑 removing keys ${i} -> ${i + keys.length}`)
    await cf.deleteKVMulti(
      table.id,
      keys.filter(Boolean).map((k) => k.name)
    )
    i += keys.length
  }
  console.log(`${i} total`)
}

main().catch(console.error)
