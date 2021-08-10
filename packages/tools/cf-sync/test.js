import path from 'path'
import Store from './store.js'
import PQueue from 'p-queue'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import pkg from 'faunadb'
import { login } from '../utils/fauna.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
})

const { Call, Client } = pkg
const storeNFT = new Store(path.join(__dirname, '../../../.local/nft-meta'))

async function ingest() {
  const { loginOutput } = await login(
    'did:ethr:0x65007A739ab7AC5c537161249b81250E49e2853C',
    process.env.FAUNA_TOKEN || ''
  )
  const fauna = new Client({ secret: loginOutput.secret })
  const queue = new PQueue({
    concurrency: 10,
    interval: 1000,
    intervalCap: 100,
  })
  let count = 0
  queue.on('active', () => {
    console.log(`Queue: ${queue.size}. Count: ${count}`)
  })

  for await (const { value } of storeNFT.iterator()) {
    count++

    const run = async () => {
      try {
        await fauna.query(
          Call('createUpload', {
            type: 'BLOB',
            cid: value.data.cid,
            dagSize: value.size,
            files: [],
            key: '304908173497598476',
            pins: [
              {
                status: 'unknown',
                statusText: '',
                service: 'IPFS_CLUSTER',
              },
              {
                status: 'unknown',
                statusText: '',
                service: 'PINATA',
              },
            ],
          })
        )
      } catch (err) {
        console.error(err)
      }
    }
    queue.add(() => run())
    if (count === 10000) {
      return
    }
  }
  await queue.onIdle()
  console.log('DONE')
}

ingest()
