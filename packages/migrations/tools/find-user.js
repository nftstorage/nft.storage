/**
 * Given a NFT CID, find the user that uploaded it.
 *
 * Usage:
 *     node find-user.js bafkreiac5arnxx2myfasee3tnsdodoe5jua5xjwx7zqmgokijadzlpez4u
 */
import dotenv from 'dotenv'
import { Cloudflare } from '../cloudflare.js'
import { findNs } from '../utils.js'

dotenv.config()

async function main() {
  const env = process.env.ENV || 'dev'
  const cid = process.argv[2]
  const cf = new Cloudflare({
    accountId: process.env.CF_ACCOUNT,
    apiToken: process.env.CF_TOKEN,
  })
  const namespaces = await cf.fetchKVNamespaces()
  const nfts = findNs(namespaces, env, 'NFTS')
  const users = findNs(namespaces, env, 'USERS')
  console.log(`🪑 ${nfts.title}`)

  let key
  let i = 0
  for await (const keys of cf.fetchKVKeys(nfts.id)) {
    console.log(`🔎 Searching ${i} -> ${i + keys.length}`)
    key = keys.find((k) => k.name.endsWith(cid))
    if (key) break
    i += keys.length
  }

  if (!key) return console.log('Not found')
  console.log(`Key:`, key)
  const parts = key.name.split(':')
  parts.pop()
  const userKey = parts.join(':')
  console.log(`User:`, await cf.readKV(users.id, userKey))
}

main().catch(console.error)
