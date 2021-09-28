import path from 'path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { DBClient } from '../../api/src/utils/db-client.js'
import Cluster from '../utils/cluster.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
})

const db = new DBClient(process.env.DATABASE_URL, process.env.DATABASE_TOKEN)
const cluster = new Cluster(process.env.CLUSTER_TOKEN || '')

async function run() {
  const { count, error: countError } = await db.client
    .from('pin')
    .select('id,status,content_cid,service', { count: 'exact', head: true })
    .eq('service', 'IpfsCluster')
    .neq('status', 'Pinned')

  if (countError) {
    return console.log(countError)
  }
  const { data: pins, error } = await db.client
    .from('pin')
    .select('id,status,content_cid,service')
    .eq('service', 'IpfsCluster')
    .neq('status', 'Pinned')
    .limit(20)

  if (error) {
    return console.log(error)
  }

  const updatedPins = []
  for (const pin of pins) {
    const status = await cluster.status(pin.content_cid)
    if (status === 'PinError') {
      await cluster.recover(pin.content_cid)
    }
    console.log(status, pin.content_cid)
    if (status !== pin.status) {
      updatedPins.push({
        ...pin,
        status,
      })
    }
  }

  // bulk upsert
  const { error: upsertError } = await db.client
    .from('pin')
    .upsert(updatedPins, { count: 'exact', returning: 'minimal' })

  if (upsertError) {
    return console.log(upsertError)
  }

  console.log(`
Overall there's ${count} pins to be processed.
In this run, ${pins.length} were processed and ${updatedPins.length} updated to new status.
`)
}

run()
