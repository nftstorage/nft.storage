import {
  createStubbedImageFetcher,
  createStubStoreFunction,
  measureNftTimeToRetrievability,
} from './measureNftTimeToRetrievability.js'
import { test } from '../lib/testing.js'
import { createTestImages } from '../bin/nft-ttr.js'
import all from 'it-all'
import { Writable } from 'node:stream'
import { Registry } from 'prom-client'
import {
  createPushgateway,
  createPushgatewayMetricLogger,
} from '../lib/metrics.js'
import { withHttpServer } from '../lib/http.js'
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

  let pushRetrieveCallCount = 0
  const retrieveMetricsPusher = {
    /** @type {import('./measureNftTimeToRetrievability.js').RetrievalMetricsLogger} */
    push() {
      pushRetrieveCallCount++
      return Promise.resolve()
    },
  }

  let pushStoreMetricsCallCount = 0
  const storeMetricsPusher = {
    /** @type {import('./measureNftTimeToRetrievability.js').StoreMetricsLogger} */
    push: () => {
      pushStoreMetricsCallCount++
      return Promise.resolve()
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
      pushStoreMetrics: (...args) => storeMetricsPusher.push(...args),
      pushRetrieveMetrics: (...args) => retrieveMetricsPusher.push(...args),
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

  t.is(pushStoreMetricsCallCount, 1)

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
  t.is(pushRetrieveCallCount, 1)

  const finish = results.find((log) => log.type === 'finish')
  t.assert(finish)
})

test('createPushgatewayMetricLogger', async (t) => {
  const registry = new Registry()
  const jobName = 'test-job-createPushgatewayMetricLogger'
  const metricLabels = {
    instance: 'instance-createPushgatewayMetricLogger',
  }
  /** @type {import('http').IncomingMessage[]} */
  const fakePushGatewayRequests = []
  /** @type {import('http').RequestListener} */
  const fakePushGateway = (req, res) => {
    fakePushGatewayRequests.push(req)
    res.writeHead(200)
    res.end()
  }
  const silentConsole = new Console(new Writable())

  /** @type {import('../lib/metrics.js').Metric<number, {}>} */
  const metric = {
    name: 'sample_metric',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    observe() {},
  }

  await withHttpServer(fakePushGateway, async (pushGatewayUrl) => {
    const metricsLogger = createPushgatewayMetricLogger(
      createPushgateway(pushGatewayUrl, 'baerer fake-auth', registry),
      metric,
      jobName,
      metricLabels,
      silentConsole
    )
    await metricsLogger(1, {})
  })
  t.is(fakePushGatewayRequests.length, 1)
  const [firstRequest] = fakePushGatewayRequests
  t.assert(firstRequest.url?.startsWith(`/metrics/job/${jobName}`))
  for (const [label, value] of Object.entries(metricLabels)) {
    t.assert(
      firstRequest.url?.includes([label, value].join('/')),
      `expected metric push request url to contain label '${label}'`
    )
  }
})
