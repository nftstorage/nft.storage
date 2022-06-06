import {
  createStubbedImageFetcher,
  createStubbedRetrievalMetricsLogger,
  measureNftTimeToRetrievability,
} from './measureNftTimeToRetrievability.js'
import { test } from '../lib/testing.js'
import { recordedLog } from '../lib/log.js'
import { createTestImages } from '../bin/nft-ttr.js'

test('measureNftTimeToRetrievability', async (t) => {
  /** this is meant to be a test that doesn't use the network (e.g. inject stubs) */
  const { info, log } = recordedLog()

  let storeCallCount = 0
  const storer = {
    /** @param {import('nft.storage/dist/src/token').TokenInput} nft */
    store: async (nft) => {
      storeCallCount++
      return {
        ipnft: 'bafybeiarmhq3d7msony7zfq67gmn46syuv6jrc6dagob2wflunxiyaksj4',
        nft,
      }
    },
  }

  let pushCallCount = 0
  const metricsPusher = {
    /** @type {import('./measureNftTimeToRetrievability.js').RetrievalMetricsLogger} */
    push(...args) {
      pushCallCount++
      return createStubbedRetrievalMetricsLogger()(...args)
    },
  }

  await measureNftTimeToRetrievability({
    log,
    images: createTestImages(1),
    gateways: [new URL('https://nftstorage.link')],
    store: (n) => storer.store(n),
    metricsPushGatewayJobName: 'integration-tests',
    pushRetrieveMetrics: (...args) => metricsPusher.push(...args),
    secrets: {
      nftStorageToken: 'TODO',
      metricsPushGatewayAuthorization: { authorization: 'bearer todo' },
    },
    fetchImage: createStubbedImageFetcher(),
  })
  t.is(storeCallCount, 1)
  const start = info.find((logs) => logs[0]?.type === 'start')[0]
  t.assert(start)
  const storeLog = info.find((logs) => logs[0]?.type === 'store')[0]
  t.assert(storeLog)
  const retrieve = info.find((logs) => logs[0]?.type === 'retrieve')[0]
  t.assert(retrieve)
  t.is(
    typeof retrieve?.duration?.size,
    'number',
    'expected retrieve duration size to be a number'
  )
  // did call pushRetrieveMetrics
  t.is(pushCallCount, 1)
  const finish = info.find((logs) => logs[0]?.type === 'finish')[0]
  t.assert(finish)
})
