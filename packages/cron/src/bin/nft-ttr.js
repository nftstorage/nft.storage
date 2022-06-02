#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fetch from '@web-std/fetch'
import {
  basicAuthorizationHeaderValue,
  measureNftTimeToRetrievability,
  createStubbedRetrievalMetricsLogger,
  createPromClientRetrievalMetricsLogger,
} from '../jobs/measureNftTimeToRetrievability.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { EnvironmentLoader } from 'safe-env-vars'
import { createConsoleLog, createJSONLogger } from '../lib/log.js'
import process from 'process'
import { createRandomImage, createRandomImageBlob } from '../lib/random.js'
import assert from 'assert'
import PromClient from 'prom-client'

const env = new EnvironmentLoader()

const dirname = path.dirname(fileURLToPath(import.meta.url))
global.fetch = fetch

/** @type {import('../lib/log.js').LogFunction} */
const defaultLog = (level, ...loggables) => {
  createJSONLogger(createConsoleLog())(level, ...loggables)
}

/**
 * @param {string[]} argv
 * @param {object} [options]
 * @param {import('../lib/log.js').LogFunction} options.log
 */
export async function main(argv, options = { log: defaultLog }) {
  const [command, ...commandArgv] = argv
  /**
   * @param  {string[]} commandArgv
   */
  const measureArgs = async (...commandArgv) => {
    const commandArgs = await yargs(commandArgv).options({
      url: {
        type: 'string',
        default: 'https://nft.storage',
      },
      metricsPushGateway: {
        type: 'string',
      },
      metricsPushGatewayJobName: {
        type: 'string',
        default: 'nft-ttr',
        require: true,
      },
      minImageSizeBytes: {
        type: 'number',
        default: 1000,
      },
      logConfigAndExit: {
        type: 'boolean',
        default: false,
      },
      gateways: {
        alias: 'gateway',
        type: 'string',
        array: true,
        default: 'https://nftstorage.link',
      },
      stubMetricsPushTarget: {
        type: 'boolean',
        default: false,
      },
    }).argv
    /** @type {AsyncIterable<Blob>} */
    const images = (async function* () {
      let count = 1
      while (count--) {
        /** @type {Blob} */
        const blob = await createRandomImageBlob(
          createRandomImage({
            bytes: {
              min: commandArgs.minImageSizeBytes,
            },
          })
        )
        yield blob
      }
    })()
    const { gateways: gatewaysYargs } = commandArgs
    /** @type {URL[]} */
    const gateways = (
      Array.isArray(gatewaysYargs) ? gatewaysYargs : [gatewaysYargs]
    ).map((s) => new URL(s))
    const PUSHGATEWAY_BASIC_AUTH = env.optional.string.get(
      'PUSHGATEWAY_BASIC_AUTH'
    )
    const metricsPushGatewayAuthorization = PUSHGATEWAY_BASIC_AUTH
      ? parseBasicAuth(PUSHGATEWAY_BASIC_AUTH)
      : { authorization: 'bearer no-auth' }
    /**
     * @param {object} options
     * @param {string} [options.metricsPushGateway]
     * @param {import('../jobs/measureNftTimeToRetrievability.js').HttpAuthorization} options.metricsPushGatewayAuthorization
     * @param {string} [options.metricsPushGatewayJobName]
     * @returns {PromClient.Registry}
     */
    function createPushgatewayRegistry(options) {
      const registry = new PromClient.Registry()
      if (options.metricsPushGateway) {
        const pushgateway = new PromClient.Pushgateway(
          options.metricsPushGateway,
          {
            headers: {
              authorization:
                options.metricsPushGatewayAuthorization.authorization,
            },
          },
          registry
        )
        if (options.metricsPushGatewayJobName) {
          pushgateway.pushAdd({
            jobName: options.metricsPushGatewayJobName,
          })
        }
      }
      return registry
    }
    const promClientRegistry = createPushgatewayRegistry({
      metricsPushGatewayAuthorization,
      metricsPushGateway: commandArgs.metricsPushGateway,
    })
    /** @type {import('../jobs/measureNftTimeToRetrievability.js').RetrievalMetricsLogger} */
    const pushRetrieveMetrics = commandArgs.stubMetricsPushTarget
      ? createStubbedRetrievalMetricsLogger()
      : createPromClientRetrievalMetricsLogger(
          promClientRegistry,
          new PromClient.Histogram({
            name: 'retrieval_duration_seconds',
            help: 'How long, in seconds, it took to retrieve an nft image after uploading',
            registers: [promClientRegistry],
            labelNames: ['byteLength'],
          })
        )
    /** @type {import('../jobs/measureNftTimeToRetrievability.js').MeasureTtrOptions} */
    const args = {
      ...commandArgs,
      pushRetrieveMetrics,
      gateways,
      log: options.log,
      images,
      secrets: {
        nftStorageToken: env.string.get('NFT_STORAGE_API_KEY'),
        metricsPushGatewayAuthorization,
      },
    }
    return args
  }
  switch (command) {
    case 'measure':
      await measureNftTimeToRetrievability(await measureArgs(...commandArgv))
      break
    default:
      throw new Error(`unexpected command ${command}`)
  }
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
  main(hideBin(process.argv))
}
