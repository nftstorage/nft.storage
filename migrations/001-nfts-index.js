import dotenv from 'dotenv'
import { Cloudflare } from './cloudflare.js'

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
  const indexTables = namespaces.filter((ns) => ns.title.includes('NFTS_IDX'))
  const tables = indexTables
    .map((idxTable) => {
      const title = idxTable.title.replace('NFTS_IDX', 'NFTS')
      return {
        table: namespaces.find((t) => t.title === title),
        index: idxTable,
      }
    })
    .filter((t) => {
      if (env === 'production') {
        return (
          !t.table.title.includes('dev') && !t.table.title.includes('staging')
        )
      }
      return t.table.title.includes(env)
    })

  for (const { table, index } of tables) {
    console.log(`🎯 Populating ${index.title} from ${table.title}`)
    let total = 0
    for await (const keys of cf.fetchKVKeys(table.id)) {
      const bulkWrites = { table: [], index: [] }
      await Promise.all(
        keys.map(async (k) => {
          const [sub, cid] = k.name.split(':')
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
            bulkWrites.table.push({ key: k.name, value, metadata })
          }
          let { created } = metadata
          if (!created) {
            console.log(
              `📖 reading ${k.name} to fix missing created date in metadata`
            )
            const value = await cf.readKV(table.id, k.name)
            console.log(`📗 read ${k.name}`)
            created = value.created
            bulkWrites.table.push({
              key: k.name,
              value,
              metadata: { ...metadata, created },
            })
          }
          const indexKey = encodeIndexKey({
            user: { sub },
            created: new Date(created),
            cid,
          })
          bulkWrites.index.push({
            key: indexKey,
            value: '',
            metadata: { key: k.name },
          })
        })
      )
      if (bulkWrites.table.length) {
        console.log(`🧸 fixing metadata for ${bulkWrites.table.length} NFTs`)
        await cf.writeMultiKV(table.id, bulkWrites.table)
      }
      if (bulkWrites.index.length) {
        console.log(
          `🗂 writing index entries for NFTs ${total} -> ${
            total + bulkWrites.index.length
          }`
        )
        await cf.writeMultiKV(index.id, bulkWrites.index)
      }
      total += bulkWrites.index.length
    }
  }
}

main().catch(console.error)
