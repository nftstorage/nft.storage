import { NFTStorage } from 'nft.storage'
import { Milliseconds, now } from '../lib/time.js'
import { createRandomImage, createRandomImageBlob } from '../lib/random.js'
import { pipeline, parallelMerge, flatten } from 'streaming-iterables'
import { createPushgatewayMetricLogger } from '../lib/metrics.js'

export const EXAMPLE_NFT_IMG_URL = new URL(
  'https://bafybeiarmhq3d7msony7zfq67gmn46syuv6jrc6dagob2wflunxiyaksj4.ipfs.dweb.link/1681.png'
)

/**
 * @typedef {import('prom-client').Registry} Registry
 */

/**
 * @typedef RetrieveLog
 * @property {string}       image
 * @property {"retrieve"}   type
 * @property {URL}          gateway
 * @property {URL}          url
 * @property {number}       contentLength
 * @property {Date}         startTime
 * @property {Milliseconds} duration
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
 * @returns {StoreFunction}
 */
export function createStubStoreFunction() {
  return () => {
    return Promise.resolve({
      ipnft: 'fake-ret-from-createStubStoreFunction',
    })
  }
}

/**
 * @typedef {string} HttpAuthorizationHeaderValue
 */

/**
 * @typedef {object} MeasureTtrSecrets
 * @property {string} nftStorageToken - API Token for nft.storage
 * @property {HttpAuthorizationHeaderValue} metricsPushGatewayAuthorization - authorization header value for metricsPushGateway
 */

/**
 * @typedef {import('../lib/metrics.js').RetrievalDurationMetric} TimeToRetrievabilityMetric
 */

/**
 * @typedef MeasureTtrMetrics
 * @property {TimeToRetrievabilityMetric} timeToRetrievability
 */

/**
 * @typedef {object} MeasureTtrOptions
 * @property {RetrieveImageOptions['fetchImage']} fetchImage
 * @property {RetrievalMetricsLogger} pushRetrieveMetrics - fn to push metrics about retrieving stored image
 * @property {StoreMetricsLogger} pushStoreMetrics - fn to push metrics about storing an image
 * @property {AsyncIterable<Blob>} images - images to upload/retrieve
 * @property {StoreFunction} [store] - function to store nft
 * @property {string} [url] - URL to nft.storage to measure
 * @property {boolean} logConfigAndExit - if true, log config and exit
 * @property {URL} [metricsPushGateway] - Server to send metrics to. should reference a https://github.com/prometheus/pushgateway
 * @property {URL[]} gateways - IPFS Gateway to test retrieval from
 * @property {Console} console - logger
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
 * @param {MeasureTtrOptions} options
 * @returns {OptionsParts<Omit<MeasureTtrOptions,'secrets'>, MeasureTtrOptions['secrets']>}
 */
function readMeasureTtrOptions(options) {
  const secrets = options.secrets
  const config = { ...options, secrets: undefined }
  return { secrets, config }
}

/**
 * @template {string} Type
 * @typedef Activity
 * @property {Type} type
 */

/**
 * @typedef StoreStartLog
 * @property {"store/start"} type
 * @property {string} image
 * @property {Date} startTime
 */

/**
 * @typedef StoreLog
 * @property {"store"} type
 * @property {string} image
 * @property {Date} startTime
 * @property {Milliseconds} duration
 */

/**
 * Job that tests/measures steps
 * * prepare a sample image
 * * upload to nft.storage
 * * retrieve image through ipfs gateway
 * @param {MeasureTtrOptions} options
 * @returns {AsyncIterable<
 *   | StoreStartLog
 *   | StoreLog
 *   | Activity<"start"|"finish">
 *   | RetrieveLog
 * >}
 */
export async function* measureNftTimeToRetrievability(options) {
  // separate secrets and config to avoid logging secrets
  const { secrets, config } = readMeasureTtrOptions(options)
  if (config.logConfigAndExit) {
    config.console.log(config)
    return
  }
  /** @type {Activity<"start">} */
  const start = {
    type: 'start',
  }
  yield start
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
    /** @type {StoreStartLog} */
    const storeStartLog = {
      type: 'store/start',
      image: imageId,
      startTime: new Date(),
    }
    yield storeStartLog
    const metadata = await store(nft)
    const storeEndAt = now()
    /** @type {StoreLog} */
    const storeLog = {
      type: 'store',
      image: imageId,
      startTime: storeStartedDate,
      duration: Milliseconds.subtract(storeEndAt, storeStartedAt),
    }
    yield storeLog
    await options.pushStoreMetrics(storeLog)
    yield* pipeline(
      () =>
        parallelMerge(
          config.gateways.map(async function* (gateway) {
            /** @type {RetrieveLog} */
            let retrieval
            try {
              retrieval = await retrieve(
                { ...options, gateway },
                {
                  id: imageId,
                  url: createGatewayRetrievalUrl(gateway, metadata.ipnft),
                }
              )
            } catch (error) {
              console.error('error retrieving', error)
              throw error
            }
            yield retrieval
            await options.pushRetrieveMetrics(retrieval)
          })
        ),
      flatten
    )
  }
  /** @type {Activity<"finish">} */
  yield { type: 'finish' }
}

/**
 * @typedef {(url: URL) => Promise<Blob>} ImageFetcher
 */

/**
 * @returns {ImageFetcher}
 * @param {number} [minImageSizeBytes]
 */
export function createStubbedImageFetcher(minImageSizeBytes = 1) {
  return async () => {
    return createRandomImageBlob(
      createRandomImage({ bytes: { min: minImageSizeBytes } })
    )
  }
}

/**
 * @returns {ImageFetcher}
 * @param {Fetcher['fetch']} fetch
 */
export const httpImageFetcher = (fetch) => async (url) => {
  const response = fetch(url.toString())
  const blob = (await response).blob()
  return blob
}

/**
 * @typedef {object} RetrieveImageOptions
 * @property {URL} gateway
 * @property {ImageFetcher} fetchImage
 * @property {Console} console
 */

/**
 * retrieve from gateway and log
 * @param {RetrieveImageOptions} options
 * @param {object} image
 * @param {string} image.id
 * @param {URL}   image.url
 */
async function retrieve(options, image) {
  const retrieveFetchDate = new Date()
  const retrieveFetchStart = now()
  const retrievedImage = await options.fetchImage(image.url)
  const retrieveReadEnd = now()
  const retrievalDuration = new Milliseconds(
    retrieveReadEnd.toNumber() - retrieveFetchStart.toNumber()
  )
  /** @type {RetrieveLog} */
  const retrieveLog = {
    type: 'retrieve',
    gateway: options.gateway,
    url: image.url,
    image: image.id,
    /** length in bytes */
    contentLength: retrievedImage.size,
    startTime: retrieveFetchDate,
    duration: retrievalDuration,
  }
  return retrieveLog
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
 * @typedef {(
 *    retrieval: RetrieveLog,
 * ) => Promise<void>} RetrievalMetricsLogger
 */

/**
 * @typedef {(storeLog: StoreLog) => Promise<void>} StoreMetricsLogger
 */

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
 * Create a function that will take a StoreLog and push metrics about it to a prometheus Pushgateway
 * @param {import('prom-client').Pushgateway} pushgateway
 * @param {(registry: Registry) => import('../lib/metrics.js').StoreDurationMetric} createStoreDurationMetric
 * @param {string} jobName
 * @param {Record<string,string>} labels
 * @param {Console} console
 * @returns {StoreMetricsLogger}
 */
export function createStoreMetricsLogger(
  pushgateway,
  createStoreDurationMetric,
  jobName,
  labels,
  console
) {
  const pushStoreDuration = createPushgatewayMetricLogger(
    pushgateway,
    createStoreDurationMetric(pushgateway.registry),
    jobName,
    labels,
    console
  )
  return async (storeLog) => {
    await pushStoreDuration(storeLog.duration, {})
  }
}

/**
 * Create a function that will take a RetrieveLog and push metrics about it to a prometheus Pushgateway
 * @param {import('prom-client').Pushgateway} pushgateway
 * @param {(registry: Registry) => import('../lib/metrics.js').RetrievalDurationMetric} createRetrievalDurationMetric
 * @param {string} jobName
 * @param {Record<string,string>} labels
 * @param {Console} console
 * @returns {RetrievalMetricsLogger}
 */
export function createRetrievalMetricsLogger(
  pushgateway,
  createRetrievalDurationMetric,
  jobName,
  labels,
  console
) {
  const pushRetrievalDurationMetric = createPushgatewayMetricLogger(
    pushgateway,
    createRetrievalDurationMetric(pushgateway.registry),
    jobName,
    labels,
    console
  )
  return async (retrieval) => {
    await pushRetrievalDurationMetric(retrieval.duration, {
      gateway: retrieval.gateway.toString(),
    })
  }
}
