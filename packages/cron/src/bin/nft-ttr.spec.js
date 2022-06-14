import { test } from '../lib/testing.js'
import { cli as binNftTtr, createMeasureOptionsFromSade } from './nft-ttr.js'
import { recordedLog } from '../lib/log.js'
import {
  createStubbedImageFetcher,
  createStubStoreFunction,
} from '../jobs/measureNftTimeToRetrievability.js'
import all from 'it-all'

const defaultTestMinImageSizeBytes = 10 * 1e6

test('createMeasureOptionsFromSade', (t) => {
  const sampleSade = {
    _: [],
    minImageSizeBytes: 1,
    metricsPushGateway:
      'https://pushgateway.k8s.locotorp.info/metrics/job/nftstorage_ci/instance/github_action',
    url: 'https://nft.storage',
    metricsPushGatewayJobName: 'nft-ttr',
    gateways: 'https://nftstorage.link/',
  }
  const options = createMeasureOptionsFromSade(sampleSade, {
    metricsPushGatewayAuthorization: '',
  })
  t.assert(options)
  t.is(options.gateways.length, 1)
  t.is(options.gateways[0].toString(), sampleSade.gateways)
  t.is(options.metricsPushGateway?.toString(), sampleSade.metricsPushGateway)
  t.is(options.metricsPushGatewayJobName, sampleSade.metricsPushGatewayJobName)
})

test(`bin/nft-ttr works with --minImageSizeBytes=${defaultTestMinImageSizeBytes} and multiple gateways`, async (t) => {
  const { log } = recordedLog()
  const minImageSizeBytes = defaultTestMinImageSizeBytes
  const gateways = ['https://nftstorage.link', 'https://dweb.link']
  const command = [
    'fakeNodePath',
    'fakeScriptPath',
    'measure',
    `--minImageSizeBytes=${minImageSizeBytes}`,
    `--gateways=${gateways.join(' ')}`,
  ]
  const activities = await all(
    binNftTtr(command, {
      env: {
        NFT_STORAGE_API_KEY: '',
      },
      log,
      store: createStubStoreFunction(),
      fetchImage: createStubbedImageFetcher(minImageSizeBytes),
    })
  )
  let retrieveCount = 0
  const gatewaysNeedingRetrieval = new Set(gateways)
  for (const activity of activities) {
    if (activity.type !== 'retrieve') {
      continue
    }
    const retrieve = activity
    retrieveCount++
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
  t.is(retrieveCount, gateways.length)
})
