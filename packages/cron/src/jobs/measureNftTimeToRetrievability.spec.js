import {
  createStubbedImageFetcher,
  createStubbedRetrievalMetricsLogger,
  createStubStoreFunction,
  measureNftTimeToRetrievability,
} from './measureNftTimeToRetrievability.js'
import { test } from '../lib/testing.js'
import { createTestImages } from '../bin/nft-ttr.js'
import all from 'it-all'
import { Writable } from 'node:stream'

test('measureNftTimeToRetrievability', async (t) => {
  /** this is meant to be a test that doesn't use the network (e.g. inject stubs) */

  let storeCallCount = 0
  const storer = {
    /** @type {import('./measureNftTimeToRetrievability.js').StoreFunction} */
    store: (token) => {
      storeCallCount++
      return createStubStoreFunction()(token)
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

  const results = await all(
    measureNftTimeToRetrievability({
      console: new console.Console(new Writable(), new Writable()),
      images: createTestImages(1),
      gateways: [new URL('https://nftstorage.link')],
      store: (n) => storer.store(n),
      metricsPushGatewayJobName: 'integration-tests',
      pushRetrieveMetrics: (...args) => metricsPusher.push(...args),
      secrets: {
        nftStorageToken: 'TODO',
        metricsPushGatewayAuthorization: 'bearer todo',
      },
      fetchImage: createStubbedImageFetcher(),
    })
  )
  t.assert(results.length > 0)
  t.is(storeCallCount, 1)

  const start = results.find((log) => log.type === 'start')
  t.assert(start)

  const storeLog = results.find((log) => log.type === 'store')
  t.assert(storeLog)

  const retrieve = results.find(
    /** @returns {log is import('./measureNftTimeToRetrievability.js').RetrieveLog} */
    (log) => log.type === 'retrieve'
  )
  t.is(
    typeof retrieve?.duration?.size,
    'number',
    'expected retrieve duration size to be a number'
  )

  // did call pushRetrieveMetrics
  t.is(pushCallCount, 1)

  const finish = results.find((log) => log.type === 'finish')
  t.assert(finish)
})
