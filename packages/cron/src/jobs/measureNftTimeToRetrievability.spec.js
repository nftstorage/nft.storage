import {
  createPromClientRetrievalMetricsLogger,
  createStubbedImageFetcher,
  createStubbedRetrievalMetricsLogger,
  createStubStoreFunction,
  measureNftTimeToRetrievability,
} from './measureNftTimeToRetrievability.js'
import { test } from '../lib/testing.js'
import { createTestImages } from '../bin/nft-ttr.js'
import all from 'it-all'
import { Writable } from 'node:stream'
import { Registry } from 'prom-client'
import { createRetrievalDurationMetric } from '../lib/metrics.js'
import { withHttpServer } from '../lib/http.js'
import { Milliseconds } from '../lib/time.js'
import { Console } from 'node:console'

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
      logConfigAndExit: false,
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

test('createPromClientRetrievalMetricsLogger', async (t) => {
  const registry = new Registry()
  const metric = createRetrievalDurationMetric(registry)
  const metricsPushGatewayJobName =
    'test-job-createPromClientRetrievalMetricsLogger'
  const metricLabels = {
    instance: 'instance-createPromClientRetrievalMetricsLogger',
  }
  const pushGatewayAuthorization = 'bearer fake-auth'
  /** @type {import('http').IncomingMessage[]} */
  const fakePushGatewayRequests = []
  /** @type {import('http').RequestListener} */
  const fakePushGateway = (req, res) => {
    fakePushGatewayRequests.push(req)
    res.writeHead(200)
    res.end()
  }
  const silentConsole = new Console(new Writable())
  /** @type {import('./measureNftTimeToRetrievability.js').RetrieveLog} */
  const fakeRetrieve = {
    type: 'retrieve',
    image: 'fake-image',
    gateway: new URL('https://example.com/fake-gateway'),
    url: new URL('https://example.com/fake-gateway/fake-image'),
    contentLength: 1,
    startTime: new Date(),
    duration: new Milliseconds(1000),
  }
  await withHttpServer(fakePushGateway, async (pushGatewayUrl) => {
    const metricsLogger = createPromClientRetrievalMetricsLogger(
      registry,
      metric,
      metricsPushGatewayJobName,
      metricLabels,
      pushGatewayUrl,
      pushGatewayAuthorization
    )
    await metricsLogger({ console: silentConsole }, fakeRetrieve)
  })
  t.is(fakePushGatewayRequests.length, 1)
  const [firstRequest] = fakePushGatewayRequests
  t.assert(
    firstRequest.url?.startsWith(`/metrics/job/${metricsPushGatewayJobName}`)
  )
  for (const [label, value] of Object.entries(metricLabels)) {
    t.assert(
      firstRequest.url?.includes([label, value].join('/')),
      `expected metric push request url to contain label '${label}'`
    )
  }
})
