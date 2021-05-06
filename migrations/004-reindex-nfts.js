/**
 * This is an optional migration that can be used to re-index data in NFTS_IDX
 * based on data in NFTS and PINS.
 */

import dotenv from 'dotenv'
import { Cloudflare } from './cloudflare.js'
import { findNs } from './utils.js'

dotenv.config()

const FAR_FUTURE = new Date('3000-01-01T00:00:00.000Z').getTime()
const PAD_LEN = FAR_FUTURE.toString().length

// TODO: can be imported when https://github.com/ipfs-shipyard/nft.storage/pull/65 is merged
function encodeIndexKey({ user, created, cid }) {
  const ts = (FAR_FUTURE - created.getTime()).toString().padStart(PAD_LEN, '0')
  return `${user.sub}:${ts}:${cid}`
}

async function main() {
  const env = process.env.ENV || 'dev'
  const cf = new Cloudflare({
    accountId: process.env.CF_ACCOUNT,
    apiToken: process.env.CF_TOKEN,
  })
  console.log(`🐶 fetching KV namespaces`)
  const namespaces = await cf.fetchKVNamespaces()
  const table = findNs(namespaces, env, 'NFTS')
  const index = findNs(namespaces, env, 'NFTS_IDX')
  const pins = findNs(namespaces, env, 'PINS')

  console.log(
    `🎯 Populating ${index.title} from ${table.title} and ${pins.title}`
  )
  let total = 0
  for await (const keys of cf.fetchKVKeys(table.id)) {
    const bulkWrites = []
    await Promise.all(
      keys.filter(Boolean).map(async (k) => {
        const parts = k.name.split(':')
        const cid = parts.pop()
        const sub = parts.join(':')
        console.log(`📖 reading NFT and pin for ${k.name}`)
        const [nft, pin] = await Promise.all([
          cf.readKV(table.id, k.name),
          cf.readKVMeta(pins.id, cid),
        ])
        if (!nft) throw new Error(`missing NFT ${k.name}`)
        if (!pin) throw new Error(`missing pin ${cid}`)
        const indexKey = encodeIndexKey({
          user: { sub },
          created: new Date(nft.created),
          cid,
        })
        bulkWrites.push({
          key: indexKey,
          value: '',
          metadata: {
            key: k.name,
            pinStatus: pin.status,
            size: pin.size,
            name: pin.name,
            meta: pin.meta,
          },
        })
      })
    )
    if (bulkWrites.length) {
      console.log(`🗂 writing index entries for ${bulkWrites.length} NFTs`)
      await cf.writeMultiKV(index.id, bulkWrites)
    }
    total += keys.length
    console.log(`🦄 processed ${total} NFTs`)
  }
  console.log('✅ done')
}

main().catch(console.error)
