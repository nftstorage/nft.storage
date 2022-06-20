import { test } from '../lib/testing.js'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  cli as binNftTtr,
  createMeasureOptionsFromSade,
  createMeasureSecretsFromEnv,
} from './nft-ttr.js'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  createStubbedImageFetcher,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  createStubStoreFunction,
} from '../jobs/measureNftTimeToRetrievability.js'

test('createMeasureOptionsFromSade', (t) => {
  const sampleSade = {
    _: [],
    minImageSizeBytes: 1,
    metricsPushGateway:
      'https://pushgateway.k8s.locotorp.info/metrics/job/nftstorage_ci/instance/github_action',
    url: 'https://nft.storage',
    metricsPushGatewayJobName: 'nft-ttr',
    gateway: ['https://nftstorage.link/', 'https://dweb.link/'],
  }
  const options = createMeasureOptionsFromSade(sampleSade, {
    metricsPushGatewayAuthorization: '',
  })
  t.assert(options)
  t.is(options.gateways.length, 2)
  t.is(options.gateways[0].toString(), sampleSade.gateway[0])
  t.is(options.gateways[1].toString(), sampleSade.gateway[1])
  t.is(options.metricsPushGateway?.toString(), sampleSade.metricsPushGateway)
  t.is(options.metricsPushGatewayJobName, sampleSade.metricsPushGatewayJobName)
})

test('createMeasureSecretsFromEnv', (t) => {
  t.throws(createMeasureSecretsFromEnv.bind(null, {}), {
    message: 'expected env.NFT_STORAGE_API_KEY to be a string',
  })
  const sampleStorageKey = 'foo'
  t.is(
    createMeasureSecretsFromEnv({ NFT_STORAGE_API_KEY: sampleStorageKey })
      .nftStorageToken,
    sampleStorageKey
  )
  const sampleUserColonPass = 'user:pass'
  t.is(
    createMeasureSecretsFromEnv({
      NFT_STORAGE_API_KEY: sampleStorageKey,
      PUSHGATEWAY_BASIC_AUTH: sampleUserColonPass,
    }).metricsPushGatewayAuthorization,
    'Basic dXNlcjpwYXNz'
  )
})
