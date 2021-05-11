/**
 * Utility to count the number of rows in a KV namespace.
 *
 * Usage:
 *     node row-count.js NFTS
 *     node row-count.js DEALS
 */
import dotenv from 'dotenv'
import { Cloudflare } from '../cloudflare.js'
import { findNs } from '../utils.js'

dotenv.config()

async function main() {
  const env = process.env.ENV || 'dev'
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
    i += keys.length
    console.log(`${i} total`)
  }
}

main().catch(console.error)
