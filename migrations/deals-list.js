import dotenv from 'dotenv'
import { Cloudflare } from './cloudflare.js'

dotenv.config()

async function main() {
  const env = process.env.ENV || 'dev'
  const cf = new Cloudflare({
    accountId: process.env.CF_ACCOUNT,
    apiToken: process.env.CF_TOKEN,
  })
  console.log(`🐶 fetching KV namespaces`)
  const namespaces = await cf.fetchKVNamespaces()
  const table = namespaces.find((t) => {
    const isDeals = t.title.includes('DEALS')
    if (!isDeals) return false
    if (env === 'production') {
      return !t.title.includes('dev') && !t.title.includes('staging')
    }
    return t.table.title.includes(env)
  })

  let i = 0
  for await (const keys of cf.fetchKVKeys(table.id)) {
    i += keys.length
    keys.forEach((k) => console.log(`${k.name}: ${JSON.stringify(k.metadata)}`))
  }
  console.log(`${i} total`)
}

main().catch(console.error)
