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
    for await (const keys of cf.fetchKVKeys(table.id)) {
      await Promise.all(
        keys.map(async (k) => {
          const [sub, cid] = k.name.split(':')
          let { metadata } = k
          if (!metadata) {
            const value = await cf.readKV(table.id, k.name)
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
            console.log(`🧸 adding missing metadata for ${k.name}`)
            await cf.writeKV(table.id, k.name, value, metadata)
          }
          let { created } = metadata
          if (!created) {
            const value = await cf.readKV(table.id, k.name)
            created = value.created
            console.log(`🔧 fixing created date for ${k.name}`)
            await writeKV(table.id, k.name, value, { ...k.metadata, created })
          }
          const indexKey = encodeIndexKey({
            user: { sub },
            created: new Date(created),
            cid,
          })
          console.log(`🗂 writing index entry: ${indexKey}`)
          await cf.writeKV(index.id, indexKey, '', { key: k.name })
        })
      )
    }
  }
}

main().catch(console.error)
