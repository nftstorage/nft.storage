/**
 * Utility to show a key, value and meta from a KV namespace.
 *
 * Usage:
 *     node show-key.js PINS bafybeihvfkq5srqqxnuagl5lifxwrjl5yrkwob7vqxb7vwhwm253ylx7p4
 */
import dotenv from 'dotenv'
import { Cloudflare } from '../cloudflare.js'
import { findNs } from '../utils.js'

dotenv.config()

async function main() {
  const env = process.env.ENV || 'dev'
  const tableName = process.argv[2]
  const key = process.argv[3]
  const cf = new Cloudflare({
    accountId: process.env.CF_ACCOUNT,
    apiToken: process.env.CF_TOKEN,
  })
  const namespaces = await cf.fetchKVNamespaces()
  const table = findNs(namespaces, env, tableName)
  console.log(`🪑 ${table.title}`)

  const value = await cf.readKV(table.id, key)
  const meta = await cf.readKVMeta(table.id, key)

  console.log(
    `${key}\t${JSON.stringify(value)}\t${meta ? JSON.stringify(meta) : ''}`
  )
}

main().catch(console.error)
