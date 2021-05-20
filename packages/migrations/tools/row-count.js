/**
 * Utility to count the number of rows in a KV namespace.
 *
 * Usage:
 *     node row-count.js NFTS
 *     node row-count.js DEALS
 *     node row-count.js NFTS some_key_prefix
 */
import dotenv from 'dotenv'
import { Cloudflare } from '../cloudflare.js'
import { findNs } from '../utils.js'

dotenv.config()

async function main() {
  const env = process.env.ENV || 'dev'
  const tableName = process.argv[2]
  const prefix = process.argv[3]
  const cf = new Cloudflare({
    accountId: process.env.CF_ACCOUNT,
    apiToken: process.env.CF_TOKEN,
  })
  const namespaces = await cf.fetchKVNamespaces()
  const table = findNs(namespaces, env, tableName)
  console.log(`🪑 ${table.title}`)

  let i = 0
  for await (const keys of cf.fetchKVKeys(table.id, { prefix })) {
    i += keys.length
    keys.forEach((k) => {
      if (!k.name.startsWith(`${prefix}:bafk`)) {
        console.log(k.name)
      }
    })
    console.log(`${i} total`)
  }
}

main().catch(console.error)
