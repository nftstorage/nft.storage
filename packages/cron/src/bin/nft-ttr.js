#!/usr/bin/env node
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/naming-convention */

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fetch from '@web-std/fetch'
import {
  basicAuthorizationHeaderValue,
  measureNftTimeToRetrievability,
  createStubbedRetrievalMetricsLogger,
  createPromClientRetrievalMetricsLogger,
  httpImageFetcher,
} from '../jobs/measureNftTimeToRetrievability.js'
import { createConsoleLog, createJSONLogger } from '../lib/log.js'
import process from 'process'
import { createRandomImage, createRandomImageBlob } from '../lib/random.js'
import assert from 'assert'
import * as promClient from 'prom-client'
import { createRetrievalDurationSecondsMetric } from '../lib/metrics.js'
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

/** @type {import('../lib/log.js').LogFunction<import('../lib/log.js').DefaultLogLevel>} */
const defaultLog = (level, ...loggables) => {
  createJSONLogger(createConsoleLog())(level, ...loggables)
}

/**
 * @typedef {import('../jobs/measureNftTimeToRetrievability').MeasureTtrOptions} MeasureTtrOptions
 */

/**
 * @param {Record<string,unknown>} env
 * @returns {MeasureTtrOptions['secrets']}
 */
function createMeasureSecretsFromEnv(env) {
  // env.PUSHGATEWAY_BASIC_AUTH
  const PUSHGATEWAY_BASIC_AUTH =
    'PUSHGATEWAY_BASIC_AUTH' in env ? env.PUSHGATEWAY_BASIC_AUTH : undefined
  if (typeof PUSHGATEWAY_BASIC_AUTH !== 'undefined') {
    assert.ok(
      typeof PUSHGATEWAY_BASIC_AUTH === 'string',
      'expected PUSHGATEWAY_BASIC_AUTH to be a string'
    )
  }
  // env.NFT_STORAGE_API_KEY
  assert.ok(
    typeof env.NFT_STORAGE_API_KEY === 'string',
    'expected env.NFT_STORAGE_API_KEY to be a string'
  )

  const metricsPushGatewayAuthorization = PUSHGATEWAY_BASIC_AUTH
    ? parseBasicAuth(PUSHGATEWAY_BASIC_AUTH)
    : { authorization: 'bearer no-auth' }

  const nftStorageToken = env.NFT_STORAGE_API_KEY

  return {
    nftStorageToken,
    metricsPushGatewayAuthorization,
  }
}

/**
 * @param {unknown} sadeOptions
 * @param {MeasureTtrOptions['secrets']} secrets
 * @returns {Omit<MeasureTtrOptions, "secrets">}
 */
function createMeasureOptionsFromSade(sadeOptions, secrets) {
  // build gateways
  assert.ok(
    hasOwnProperty(sadeOptions, 'gateways'),
    'expected sadeOptions to have gateways'
  )
  const gatewaysArgv = sadeOptions.gateways
  assert.ok(Array.isArray(gatewaysArgv) || typeof gatewaysArgv === 'string')
  const gatewaysArgvsArray = Array.isArray(gatewaysArgv)
    ? gatewaysArgv.map(String)
    : [...gatewaysArgv.split(' ')]
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

  // build pushRetrieveMetrics
  const promClientRegistry = new promClient.Registry()

  /** @type {import('../jobs/measureNftTimeToRetrievability.js').RetrievalMetricsLogger} */
  const pushRetrieveMetrics = !metricsPushGateway
    ? createStubbedRetrievalMetricsLogger()
    : createPromClientRetrievalMetricsLogger(
        promClientRegistry,
        createRetrievalDurationSecondsMetric(promClientRegistry),
        metricsPushGatewayJobName,
        metricsPushGateway,
        secrets.metricsPushGatewayAuthorization
      )

  // build final options
  const options = {
    ...defaultMeasureOptions(),
    gateways,
    images: createTestImages(1, minImageSizeBytes),
    metricsPushGateway,
    metricsPushGatewayJobName,
    minImageSizeBytes,
    pushRetrieveMetrics,
  }
  return options
}

/**
 * @returns {Pick<MeasureTtrOptions, 'fetchImage'|'log'>}
 */
function defaultMeasureOptions() {
  const fetchImage = httpImageFetcher(fetch)
  return {
    fetchImage,
    log: defaultLog,
  }
}

/**
 * @param {string[]} argv
 * @param {object} [options]
 * @param {import('../lib/log.js').LogFunction<import('../lib/log.js').DefaultLogLevel>} options.log
 * @param {import('../jobs/measureNftTimeToRetrievability.js').StoreFunction} [options.store]
 * @param {import('../jobs/measureNftTimeToRetrievability.js').ImageFetcher} [options.fetchImage]
 */
export async function* main(argv, options = { log: defaultLog }) {
  if (argv.length < 3) {
    throw new Error(
      'nft-ttr argv must be at least length 3: [node, script, ...nftTtrArgv]'
    )
  }
  const secrets = createMeasureSecretsFromEnv(process.env)
  const argParser = sade('nft-ttr')
  /** @type {undefined|ReturnType<typeof measureNftTimeToRetrievability>} */
  let measure
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
      '--gateways',
      'IPFS gateway(s) to use to measure time to retrieval of the upload',
      'https://nftstorage.link'
    )
    .option(
      '--minImageSizeBytes',
      'min byte size of sample images used to test upload/retrieval',
      1000
    )
    .action((opts) => {
      measure = measureNftTimeToRetrievability({
        secrets,
        ...createMeasureOptionsFromSade(opts, secrets),
        ...options,
      })
    })
  sadeParseWithoutExit(argParser, argv)
  if (measure) {
    console.log('yielding from measure', measure)
    yield* measure
  }
}

/**
 * Utility to use a sade instance to parse argv, but avoiding the behavior where sade may call process.exit
 * @param {sade.Sade} prog
 * @param {string[]} argv
 */
function sadeParseWithoutExit(prog, argv) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const origExit = process.exit
  /**
   * @type {any}
   * @param {number} [_code]
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fakeExit = (_code) => {
    // console.debug('fake process.exit() called with code', _code);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  process.exit = fakeExit
  const parsed = prog.parse(argv)
  process.exit = origExit
  return parsed
}

/**
 * Parse PUSHGATEWAY_BASIC_AUTH auth value
 * @param {string} basicAuthEnvVarString
 * @returns {import('../jobs/measureNftTimeToRetrievability.js').HttpAuthorization}
 */
function parseBasicAuth(basicAuthEnvVarString) {
  assert.ok(basicAuthEnvVarString)
  const [username, ...passwordParts] = basicAuthEnvVarString.split(':')
  const password = passwordParts.join(':')
  return {
    authorization: basicAuthorizationHeaderValue({ username, password }),
  }
}

const isProcessEntrypoint = process.argv[1] === fileURLToPath(import.meta.url)
if (isProcessEntrypoint) {
  // invoke main script
  dotenv.config({ path: path.join(dirname, '../../../../.env') })
  main(process.argv)
}
