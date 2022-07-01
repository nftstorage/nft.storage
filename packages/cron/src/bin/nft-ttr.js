#!/usr/bin/env node
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fetch from '@web-std/fetch'
import {
  basicAuthorizationHeaderValue,
  measureNftTimeToRetrievability,
  httpImageFetcher,
  createStoreMetricsLogger,
  createRetrievalMetricsLogger,
} from '../jobs/measureNftTimeToRetrievability.js'
import process from 'process'
import { createRandomImage, createRandomImageBlob } from '../lib/random.js'
import assert from 'assert'
import {
  createPushgateway,
  createRetrievalDurationMetric,
  createStoreDurationMetric,
} from '../lib/metrics.js'
import sade from 'sade'
import { hasOwnProperty } from '../lib/utils.js'
import { File } from '@web-std/file'

/**
 * @param {number} [count] - count of images to iterate before finishing
 * @param {number} [minImageSizeBytes] - minimum byte size of each image
 * @returns {AsyncIterable<File>}
 */
export async function* createTestImages(count = 1, minImageSizeBytes = 1) {
  while (count--) {
    const blob = await createRandomImageBlob(
      createRandomImage({
        bytes: { min: minImageSizeBytes },
      })
    )
    yield new File([blob], 'image.jpg', blob)
  }
}

const dirname = path.dirname(fileURLToPath(import.meta.url))
global.fetch = fetch

/**
 * @typedef {import('../jobs/measureNftTimeToRetrievability').MeasureTtrOptions} MeasureTtrOptions
 */

/**
 * @param {Record<string,string|undefined>} env
 * @returns {MeasureTtrOptions['secrets']}
 */
export function createMeasureSecretsFromEnv(env) {
  assert.ok(
    typeof env.NFT_STORAGE_API_KEY === 'string',
    'expected env.NFT_STORAGE_API_KEY to be a string'
  )
  const metricsPushGatewayAuthorization = env.PUSHGATEWAY_BASIC_AUTH
    ? parseBasicAuth(env.PUSHGATEWAY_BASIC_AUTH)
    : 'bearer no-auth'
  const nftStorageToken = env.NFT_STORAGE_API_KEY
  return {
    metricsPushGatewayAuthorization,
    nftStorageToken,
  }
}

/**
 * @param {unknown} sadeOptions
 * @param {Pick<MeasureTtrOptions['secrets'], 'metricsPushGatewayAuthorization'>} secrets
 * @param {Console} console
 * @returns {Omit<MeasureTtrOptions, "secrets"> & { metricsLabels: Record<string,string> }}
 */
export function createMeasureOptionsFromSade(sadeOptions, secrets, console) {
  // build gateways
  assert.ok(
    hasOwnProperty(sadeOptions, 'gateway'),
    'expected sadeOptions to have gateway'
  )
  const gatewayArgv = sadeOptions.gateway
  assert.ok(Array.isArray(gatewayArgv) || typeof gatewayArgv === 'string')
  const gatewaysArgvsArray = Array.isArray(gatewayArgv)
    ? gatewayArgv.map(String)
    : [...gatewayArgv.split(' ')]
  const gateways = gatewaysArgvsArray.map((g) => {
    try {
      return new URL(g)
    } catch (error) {
      console.warn(`Unable to parse gateway to URL`, g)
      throw error
    }
  })

  // build minImageSizeBytes
  const minImageSizeBytesArgv =
    hasOwnProperty(sadeOptions, 'minImageSizeBytes') &&
    sadeOptions.minImageSizeBytes
  assert.ok(
    typeof minImageSizeBytesArgv === 'string' ||
      typeof minImageSizeBytesArgv === 'number',
    `expected minImageSizeBytes to be a string or number, but got ${typeof minImageSizeBytesArgv}`
  )
  const minImageSizeBytes =
    typeof minImageSizeBytesArgv === 'string'
      ? parseInt(minImageSizeBytesArgv, 10)
      : minImageSizeBytesArgv
  assert.ok(!isNaN(minImageSizeBytes))

  // build metricsPushGateway
  const metricsPushGatewayArgv =
    hasOwnProperty(sadeOptions, 'metricsPushGateway') &&
    sadeOptions.metricsPushGateway
  assert.ok(
    typeof metricsPushGatewayArgv === 'string' ||
      typeof metricsPushGatewayArgv === 'undefined'
  )
  const metricsPushGateway = metricsPushGatewayArgv
    ? new URL(metricsPushGatewayArgv)
    : undefined

  // build metricsPushGatewayJobName
  const metricsPushGatewayJobName =
    hasOwnProperty(sadeOptions, 'metricsPushGatewayJobName') &&
    sadeOptions.metricsPushGatewayJobName
  assert.ok(typeof metricsPushGatewayJobName === 'string')

  const metricsLabelsJson = hasOwnProperty(sadeOptions, 'metricsLabelsJson')
    ? String(sadeOptions.metricsLabelsJson)
    : undefined
  const metricsLabels = metricsLabelsJson
    ? /** @type {Record<string,string>} */ (JSON.parse(metricsLabelsJson))
    : {}

  /** @type {import('../jobs/measureNftTimeToRetrievability.js').RetrievalMetricsLogger} */
  const pushRetrieveMetrics = metricsPushGateway
    ? createRetrievalMetricsLogger(
        createPushgateway(
          metricsPushGateway,
          secrets.metricsPushGatewayAuthorization
        ),
        createRetrievalDurationMetric,
        metricsPushGatewayJobName,
        metricsLabels,
        console
      )
    : () => Promise.resolve()

  /** @type {import('../jobs/measureNftTimeToRetrievability.js').StoreMetricsLogger} */
  const pushStoreMetrics = metricsPushGateway
    ? createStoreMetricsLogger(
        createPushgateway(
          metricsPushGateway,
          secrets.metricsPushGatewayAuthorization
        ),
        createStoreDurationMetric,
        metricsPushGatewayJobName,
        metricsLabels,
        console
      )
    : () => Promise.resolve()

  const logConfigAndExit = Boolean(
    hasOwnProperty(sadeOptions, 'logConfigAndExit') &&
      sadeOptions.logConfigAndExit
  )

  // build final options
  const options = {
    ...defaultMeasureOptions(),
    gateways,
    images: createTestImages(1, minImageSizeBytes),
    logConfigAndExit,
    metricsPushGateway,
    metricsPushGatewayJobName,
    minImageSizeBytes,
    pushRetrieveMetrics,
    pushStoreMetrics,
    metricsLabels,
  }
  return options
}

/**
 * @returns {Pick<MeasureTtrOptions, 'fetchImage'|'console'>}
 */
function defaultMeasureOptions() {
  const fetchImage = httpImageFetcher(fetch)
  return {
    fetchImage,
    console,
  }
}

/**
 * @param {string[]} argv
 * @param {object} [options]
 * @param {Record<string,string|undefined>} options.env
 * @param {Console} options.console
 * @param {import('../jobs/measureNftTimeToRetrievability.js').StoreFunction} [options.store]
 * @param {import('../jobs/measureNftTimeToRetrievability.js').ImageFetcher} [options.fetchImage]
 */
export async function* cli(
  argv,
  options = { console: console, env: process.env }
) {
  if (argv.length < 3) {
    throw new Error(
      'nft-ttr argv must be at least length 3: [node, script, ...nftTtrArgv]'
    )
  }
  const secrets = createMeasureSecretsFromEnv(options.env)
  const argParser = sade('nft-ttr')
  /** @type {undefined|ReturnType<typeof measureNftTimeToRetrievability>} */
  let iterable
  argParser
    .command('measure')
    .describe('measure the time to retrievability of an upload to nft.storage')
    .option('--url', 'URL to nft.storage', 'https://nft.storage')
    .option(
      '--metricsPushGateway',
      'URL to prometheus pushgateway that metrics should be pushed to'
    )
    .option(
      '--metricsPushGatewayJobName',
      'name to use to identify this client when pushing metrics to prometheus pushgateway',
      'nft-ttr'
    )
    .option(
      '--logConfigAndExit',
      'if provided, this job will log the config and exit without doing much else. Intended for debugging',
      false
    )
    .option(
      '--gateway',
      'IPFS gateway to use to measure time to retrieval of the upload',
      'https://nftstorage.link'
    )
    .option(
      '--minImageSizeBytes',
      'min byte size of sample images used to test upload/retrieval',
      1000
    )
    .action((opts) => {
      iterable = measureNftTimeToRetrievability({
        secrets,
        ...createMeasureOptionsFromSade(opts, secrets, options.console),
        console: options.console,
      })
    })
  argParser.parse(argv)
  assert.ok(iterable, 'expected argument parsing to result in an iterable')
  yield* iterable
}

/**
 * Parse PUSHGATEWAY_BASIC_AUTH auth value
 * @param {string} basicAuthEnvVarString
 * @returns {import('../jobs/measureNftTimeToRetrievability.js').HttpAuthorizationHeaderValue}
 */
function parseBasicAuth(basicAuthEnvVarString) {
  assert.ok(basicAuthEnvVarString)
  const [username, ...passwordParts] = basicAuthEnvVarString.split(':')
  const password = passwordParts.join(':')
  return basicAuthorizationHeaderValue({ username, password })
}

/**
 * @param {string[]} argv
 */
async function main(argv) {
  // eslint-disable-next-line no-empty,@typescript-eslint/no-unused-vars,no-unused-vars
  for await (const _ of cli(argv, { console, env: process.env })) {
    console.debug(_)
  }
}

const isProcessEntrypoint = process.argv[1] === fileURLToPath(import.meta.url)
if (isProcessEntrypoint) {
  // invoke main script
  dotenv.config({ path: path.join(dirname, '../../../../.env') })
  await main(process.argv)
}
