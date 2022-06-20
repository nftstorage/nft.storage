import { NFTStorage } from 'nft.storage'
import { Milliseconds, now } from '../lib/time.js'
import { Pushgateway } from 'prom-client'
import { createRandomImage, createRandomImageBlob } from '../lib/random.js'

export const EXAMPLE_NFT_IMG_URL = new URL(
  'https://bafybeiarmhq3d7msony7zfq67gmn46syuv6jrc6dagob2wflunxiyaksj4.ipfs.dweb.link/1681.png'
)

/**
 * @typedef RetrieveLog
 * @property {string}       image
 * @property {"retrieve"}   type
 * @property {URL}          url
 * @property {URL}          gateway
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
 * @property {RetrievalMetricsLogger} pushRetrieveMetrics - fn to push metrics
 * @property {AsyncIterable<Blob>} images - images to upload/retrieve
 * @property {StoreFunction} [store] - function to store nft
 * @property {string} [url] - URL to nft.storage to measure
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
 * @returns {AsyncIterable<StoreStartLog|StoreLog|Activity<"start"|"finish">|RetrieveLog>}
 */
export async function* measureNftTimeToRetrievability(options) {
  // separate secrets and config to avoid logging secrets
  const { secrets, config } = readMeasureTtrOptions(options)
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
    for (const gateway of config.gateways) {
      /** @type {RetrieveLog} */
      let retrieval
      try {
        retrieval = await retrieve(options, {
          id: imageId,
          url: createGatewayRetrievalUrl(gateway, metadata.ipnft),
          gateway,
        })
      } catch (error) {
        console.error('error retrieving', error)
        throw error
      }
      yield retrieval
      await options.pushRetrieveMetrics(options, retrieval)
    }
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
 * @typedef {object }RetrieveImageOptions
 * @property {ImageFetcher} fetchImage
 * @property {RetrievalMetricsLogger} pushRetrieveMetrics
 * @property {Console} console
 */

/**
 * retrieve from gateway and log
 * @param {RetrieveImageOptions} options
 * @param {object} image
 * @param {string} image.id
 * @param {URL}   image.url
 * @param {URL}   image.gateway
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
    url: image.url,
    image: image.id,
    gateway: image.gateway,
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
 *    options: {
 *      console: Console
 *    },
 *    retrieval: RetrieveLog,
 * ) => Promise<void>} RetrievalMetricsLogger
 */

/**
 * @returns {RetrievalMetricsLogger}
 */
export function createStubbedRetrievalMetricsLogger() {
  /** @type {RetrievalMetricsLogger} */
  const push = async (options, retrieval) => {
    options.console.debug({ type: 'stubbedRetrievalMetricsLogger', retrieval })
    return Promise.resolve()
  }
  return push
}

/**
 * @param {import('prom-client').Registry} registry
 * @param {import('../lib/metrics.js').RetrievalDurationMetric} metric
 * @param {string} metricsPushGatewayJobName
 * @param {URL} pushGatewayUrl
 * @param {HttpAuthorizationHeaderValue} pushGatewayAuthorization
 * @returns {RetrievalMetricsLogger}
 */
export function createPromClientRetrievalMetricsLogger(
  registry,
  metric,
  metricsPushGatewayJobName,
  pushGatewayUrl,
  pushGatewayAuthorization
) {
  const pushgateway = new Pushgateway(
    pushGatewayUrl.toString(),
    {
      headers: {
        authorization: pushGatewayAuthorization,
      },
    },
    registry
  )
  /** @type {RetrievalMetricsLogger} */
  const push = async (options, retrieval) => {
    metric.observe(retrieval.duration, {
      byteLength: retrieval.contentLength,
    })
    const pushAddArgs = {
      jobName: metricsPushGatewayJobName,
    }
    await pushgateway.pushAdd(pushAddArgs)
    options.console.debug({ type: 'pushgateway.pushAdd', args: pushAddArgs })
  }
  return push
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
