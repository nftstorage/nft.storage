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
  const pinsTable = findNs(namespaces, env, 'PINS')

  console.log(`🎯 Populating ${pinsTable.title} from ${nftsTable.title}`)
  let total = 0
  for await (const keys of cf.fetchKVKeys(nftsTable.id)) {
    const bulkWrites = []
    keys.filter(Boolean).forEach((k) => {
      const cid = k.name.split(':').pop()
      const seen = bulkWrites.some((w) => w.key === cid)
      if (seen) return
      bulkWrites.push({
        key: `${k.metadata.pinStatus}:${cid}`,
        value: '',
        metadata: {
          status: k.metadata.pinStatus,
          size: k.metadata.size,
          created: k.metadata.created,
        },
      })
    })
    if (bulkWrites.length) {
      console.log(`🗂 writing pin values for ${bulkWrites.length} NFTs`)
      await cf.writeMultiKV(pinsTable.id, bulkWrites)
    }
    total += keys.length
    console.log(`🦄 processed ${total} NFTs`)
  }
  console.log('✅ done')
}

main().catch(console.error)
