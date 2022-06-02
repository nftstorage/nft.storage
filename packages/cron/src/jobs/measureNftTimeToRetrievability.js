import * as assert from 'assert'
import fetch from '@web-std/fetch'
import { NFTStorage } from 'nft.storage'
import { Milliseconds, now } from '../lib/time.js'
import { File } from '@web-std/file'
import { createRandomImage, createRandomImageBlob } from '../lib/random.js'

export const EXAMPLE_NFT_IMG_URL = new URL(
  'https://bafybeiarmhq3d7msony7zfq67gmn46syuv6jrc6dagob2wflunxiyaksj4.ipfs.dweb.link/1681.png'
)

/**
 * @typedef RetrieveLog
 * @property {string}       image
 * @property {"retrieve"}   type
 * @property {URL}          url
 * @property {number}       contentLength
 * @property {Date}         startTime
 * @property {Milliseconds} duration
 */

/**
 * @typedef {import('prom-client').Pushgateway} Pushgateway
 */

/**
 * @typedef {import('nft.storage/dist/src/token').TokenInput} TokenInput
 */

/**
 * @template {TokenInput} T
 * @typedef {import('nft.storage').TokenType<T>} TokenType
 */

/**
 * @typedef {(token: TokenInput) => Promise<Pick<TokenType<TokenInput>, 'ipnft'>>} StoreFunction
 */

/**
 * @returns {AsyncIterable<File>}
 */
export async function* createTestImages(count = 1) {
  while (count--) {
    const blob = await createRandomImageBlob(
      createRandomImage({
        bytes: { min: 1 },
      })
    )
    yield new File([blob], 'image.jpg', blob)
  }
}

/**
 * @typedef HttpAuthorization
 * @property {string} authorization
 */

/**
 * @typedef {object} MeasureTtrSecrets
 * @property {string} nftStorageToken - API Token for nft.storage
 * @property {HttpAuthorization} metricsPushGatewayAuthorization - authorization header value for metricsPushGateway
 */

/**
 * @typedef {import('../lib/metrics.js').RetrievalDurationSecondsMetric} TimeToRetrievabilityMetric
 */

/**
 * @typedef MeasureTtrMetrics
 * @property {TimeToRetrievabilityMetric} timeToRetrievability
 */

/**
 * @typedef {object} MeasureTtrOptions
 * @property {{
 *   timeToRetrievability: import('../lib/metrics').MetricDescriptor
 * }} metrics - metrics
 * @property {RetrievalMetricsLogger} pushRetrieveMetrics - fn to push metrics
 * @property {AsyncIterable<Blob>} images - images to upload/retrieve
 * @property {StoreFunction} [store] - function to store nft
 * @property {string} [url] - URL to nft.storage to measure
 * @property {boolean} [logConfigAndExit] - if true, log config and exit
 * @property {string} [metricsPushGateway] - Server to send metrics to. should be a https://github.com/prometheus/pushgateway
 * @property {URL[]} gateways - IPFS Gateway to test retrieval from
 * @property {import('../lib/log.js').LogFunction} log - logger
 * @property {MeasureTtrSecrets} secrets
 * @property {string} metricsPushGatewayJobName
 */

/**
 * OptionsParts - ReturnValue of readMeasureTtrOptions
 * @template Config
 * @template Secrets
 * @typedef OptionsParts<{secrets: Secrets} & Config>
 * @property {Config} config
 * @property {Secrets} secrets
 */

/**
 * @template Secrets
 * @template {{secrets: Secrets}} Options
 * @param {Options} options
 * @returns {OptionsParts<Omit<Options,'secrets'>, Secrets>}
 */
function readMeasureTtrOptions(options) {
  const secrets = options.secrets
  const config = { ...options, secrets: undefined }
  return { secrets, config }
}

/**
 * Job that tests/measures steps
 * * prepare a sample image
 * * upload to nft.storage
 * * retrieve image through ipfs gateway
 * @template {import('nft.storage/dist/src/lib/interface').TokenInput} T
 * @param {MeasureTtrOptions} options
 */
export async function measureNftTimeToRetrievability(options) {
  // separate secrets and config to avoid logging secrets
  const { secrets, config } = readMeasureTtrOptions(options)
  if (config.logConfigAndExit) {
    config.log('info', config)
    return
  }
  const start = {
    type: 'start',
    job: 'measureNftTimeToRetrievability',
  }
  config.log('info', start)
  for await (const image of config.images) {
    const imageId = Number(new Date()).toString()
    const nft = {
      image: /** @type {Blob} */ (image), // use image Blob as `image` field
      name: 'Example NFT',
      description: 'Example NFT used by nft.storage cron nft-ttr',
    }
    const client = new NFTStorage({
      token: secrets.nftStorageToken,
    })
    const storeStartedDate = new Date()
    const storeStartedAt = now()
    /** @type {StoreFunction} */
    const store = config.store || ((nft) => client.store(nft))
    const metadata = await store(nft)
    const storeEndAt = now()
    const storeLog = {
      type: 'store',
      image: imageId,
      startTime: storeStartedDate,
      duration: Milliseconds.subtract(storeEndAt, storeStartedAt),
    }
    config.log('info', storeLog)
    const { gateways } = config
    const retrievals = await Promise.allSettled(
      config.gateways.map(async (g) => {
        try {
          await retrieve(options, {
            id: imageId,
            url: createGatewayRetrievalUrl(g, metadata.ipnft),
          })
        } catch (error) {
          console.error('error retrieving', error)
          throw error
        }
      })
    )
    config.log('debug', { type: 'retrievalsSummary', gateways, retrievals })
  }
  config.log('info', { type: 'finish' })
}

/**
 * retrieve from gateway and log
 * @param {MeasureTtrOptions} options
 * @param {object} image
 * @param {string} image.id
 * @param {URL}   image.url
 */
async function retrieve(options, image) {
  const retrieveFetchDate = new Date()
  const retrieveFetchStart = now()
  const retrieveImageResponse = await fetch(image.url.toString())
  const retrievedImage = await retrieveImageResponse.blob()
  const retrieveReadEnd = now()
  const retrievalDuration = new Milliseconds(
    retrieveReadEnd.toNumber() - retrieveFetchStart.toNumber()
  )
  /** @type {RetrieveLog} */
  const retrieveLog = {
    type: 'retrieve',
    url: image.url,
    image: image.id,
    contentLength: retrievedImage.size,
    startTime: retrieveFetchDate,
    duration: retrievalDuration,
  }
  options.log('info', retrieveLog)
  const { metricsPushGateway } = options
  const { metricsPushGatewayAuthorization } = options.secrets
  if (metricsPushGateway) {
    assert.ok(
      metricsPushGatewayAuthorization,
      'expected metricsPushGatewayAuthorization'
    )
    /** @type {RetrievalMetricsLogger} */
    const pushRetrieveMetrics = options.pushRetrieveMetrics.bind(options)
    await pushRetrieveMetrics(
      {
        ...options,
        metricsPushGateway,
        metricsPushGatewayAuthorization,
      },
      retrieveLog
    )
  } else {
    options.log(
      'debug',
      'skipping pushRetrieveMetrics because no metricsPushGateway is configured'
    )
  }
}

/**
 * @param {URL} gatewayUrl
 * @param {import('nft.storage').CIDString} ipnftCid
 * @returns {URL}
 */
function createGatewayRetrievalUrl(gatewayUrl, ipnftCid) {
  return new URL(`/ipfs/${ipnftCid}/image/blob`, gatewayUrl.toString())
}

/**
 * @typedef RetrievalMetricsLoggerOptions
 * @property {import('../lib/log.js').LogFunction} log - logger
 * @property {string} metricsPushGateway
 * @property {HttpAuthorization} metricsPushGatewayAuthorization
 * @property {string} metricsPushGatewayJobName
 */

/**
 * @typedef {(
 *    options: RetrievalMetricsLoggerOptions,
 *    retrieval: RetrieveLog,
 * ) => Promise<void>} RetrievalMetricsLogger
 */

/**
 * @returns {RetrievalMetricsLogger}
 */
export const createRetrievalMetricsPusher =
  () => async (options, retrieval) => {
    return pushRetrieveMetricsViaFetch(options, retrieval)
  }

/**
 * @returns {RetrievalMetricsLogger}
 */
export function createStubbedRetrievalMetricsLogger() {
  /** @type {RetrievalMetricsLogger} */
  const push = async (options, retrieval) => {
    options.log('debug', { type: 'stubbedRetrievalMetricsLogger', retrieval })
  }
  return push
}

/**
 * @param {import('prom-client').PromClient} _registry
 * @param {import('../lib/metrics.js').RetrievalDurationSecondsMetric} retrievalDurationSeconds
 * @param {Pushgateway} pushgateway
 * @param {string} metricsPushGatewayJobName
 * @returns {RetrievalMetricsLogger}
 */
export function createPromClientRetrievalMetricsLogger(
  _registry,
  retrievalDurationSeconds,
  pushgateway,
  metricsPushGatewayJobName
) {
  /** @type {RetrievalMetricsLogger} */
  const push = async (options, retrieval) => {
    retrievalDurationSeconds.observe(retrieval.duration.toNumber() / 1000)
    const pushAddArgs = {
      jobName: metricsPushGatewayJobName,
    }
    await pushgateway.pushAdd(pushAddArgs)
    options.log('debug', { type: 'pushgateway.pushAdd', args: pushAddArgs })
  }
  return push
}

/**
 * Push retrieval metrics to a pushgateway
 * @param {RetrievalMetricsLoggerOptions} config
 * @param {RetrieveLog} retrieval
 */
export async function pushRetrieveMetricsViaFetch(config, retrieval) {
  /** @type [string, RequestInit] */
  const pushRequest = [
    config.metricsPushGateway,
    {
      method: 'post',
      headers: {
        authorization: config.metricsPushGatewayAuthorization.authorization,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'content-type': 'application/octet-stream',
      },
      body: formatRetrievalMetrics(retrieval),
    },
  ]
  const pushResponse = await fetch.apply(null, pushRequest)
  if (!pushResponse.ok) {
    config.log('warn', {
      type: 'error',
      message: 'unsuccessful metrics push',
      text: await pushResponse.text(),
    })
  }
  assert.equal(
    pushResponse.ok,
    true,
    'metrics push response code should indicate success'
  )
  config.log('info', {
    type: 'metricsPushed',
    target: config.metricsPushGateway,
  })
}

/**
 * @typedef BasicAuthOptions
 * @property {string} basicAuth - base64-encoded user:pass
 */

/**
 * @typedef UserPassOptions
 * @property {string} username - username
 * @property {string} password - password
 */

/**
 * @param {BasicAuthOptions|UserPassOptions} options
 * @returns {`Basic ${string}`} - http Authorization header value
 */
export function basicAuthorizationHeaderValue(options) {
  const basicAuthValue =
    'basicAuth' in options
      ? options.basicAuth
      : btoa(`${options.username}:${options.password}`)
  /** @type {`Basic ${string}`} */
  const headerValue = `Basic ${basicAuthValue}`
  return headerValue
}

/**
 * Format metrics about a retrieval into a format that a prometheus pushgateway expects.
 * Example output: https://github.com/web3-storage/web3.storage/blob/main/.github/workflows/cron-test.yml#L38
 * @param {RetrieveLog} retrieval
 * @returns {string} prometheus metrics string
 */
function formatRetrievalMetrics(retrieval) {
  const durationSeconds = retrieval.duration.size / 1000
  return (
    [
      '# TYPE nftstorage_retrieval_duration_seconds gauge',
      '# HELP nftstorage_retrieval_duration_seconds How long it took to retrieve an nft image',
      `nftstorage_retrieval_duration_seconds{byteLength="${retrieval.contentLength}"} ${durationSeconds}`,
    ].join('\n') + '\n'
  )
}
