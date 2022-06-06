import { test } from '../lib/testing.js'
import { main as binNftTtr } from './nft-ttr.js'
import { recordedLog } from '../lib/log.js'
import {
  createStubbedImageFetcher,
  createStubStoreFunction,
} from '../jobs/measureNftTimeToRetrievability.js'

const defaultTestMinImageSizeBytes = 10 * 1e6

test(`bin/nft-ttr works with --minImageSizeBytes=${defaultTestMinImageSizeBytes} and multiple gateways`, async (t) => {
  const { log, info } = recordedLog()
  const minImageSizeBytes = defaultTestMinImageSizeBytes
  const gateways = ['https://nftstorage.link', 'https://dweb.link']
  const command = [
    'fakeNodePath',
    'fakeScriptPath',
    'measure',
    `--minImageSizeBytes=${minImageSizeBytes}`,
    `--gateways=${gateways.join(' ')}`,
  ]
  await binNftTtr(command, {
    log,
    store: createStubStoreFunction(),
    fetchImage: createStubbedImageFetcher(minImageSizeBytes),
  })
  /** @type {import('../jobs/measureNftTimeToRetrievability').RetrieveLog[]} */
  const retrieves = info.flatMap((logs) =>
    logs[0]?.type === 'retrieve' ? [logs[0]] : []
  )
  t.is(retrieves.length, gateways.length)
  const gatewaysNeedingRetrieval = new Set(gateways)
  for (const retrieve of retrieves) {
    t.assert(retrieve)
    t.is(
      typeof retrieve.duration.size,
      'number',
      'expected retrieve duration size to be a number'
    )
    t.assert(retrieve.contentLength > minImageSizeBytes)
    for (const gateway of gatewaysNeedingRetrieval) {
      if (retrieve.url.toString().startsWith(gateway)) {
        gatewaysNeedingRetrieval.delete(gateway)
        break
      }
    }
  }
  t.is(gatewaysNeedingRetrieval.size, 0)
})
