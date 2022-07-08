import { createTestConsole, test } from '../lib/testing.js'
import {
  createMeasureOptionsFromSade,
  createMeasureSecretsFromEnv,
} from './nft-ttr.js'

test('createMeasureOptionsFromSade', (t) => {
  const sampleGateways = ['https://nftstorage.link/', 'https://dweb.link/']
  const sampleSade = {
    _: [],
    minImageSizeBytes: 1,
    metricsPushGateway:
      'https://pushgateway.k8s.locotorp.info/metrics/job/nftstorage_ci/instance/github_action',
    url: 'https://nft.storage',
    metricsPushGatewayJobName: 'nft-ttr',
    gateway: sampleGateways,
    logConfigAndExit: true,
    metricsLabelsJson: '{"instance": "github_action"}',
  }
  const secrets = {
    metricsPushGatewayAuthorization: '',
  }
  const options = createMeasureOptionsFromSade(
    sampleSade,
    secrets,
    createTestConsole()
  )
  t.assert(options)
  t.is(options.gateways.length, 2)
  t.is(options.gateways[0].toString(), sampleGateways[0])
  t.is(options.gateways[1].toString(), sampleGateways[1])
  t.is(options.metricsPushGateway?.toString(), sampleSade.metricsPushGateway)
  t.is(options.metricsPushGatewayJobName, sampleSade.metricsPushGatewayJobName)
  t.is(options.logConfigAndExit, true)
  t.is(options.metricsLabels.instance, 'github_action')

  // ensure single gateway is parsed correctly
  const options2 = createMeasureOptionsFromSade(
    { ...sampleSade, gateway: sampleGateways[0] },
    secrets,
    createTestConsole()
  )
  t.is(options2.gateways.length, 1)
  t.is(options2.gateways[0].toString(), sampleGateways[0])
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
