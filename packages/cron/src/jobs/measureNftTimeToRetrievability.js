import { NFTStorage } from 'nft.storage'
import { Milliseconds, now } from '../lib/time.js'
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { Registry, Pushgateway } from 'prom-client'
import { createRandomImage, createRandomImageBlob } from '../lib/random.js'

export const EXAMPLE_NFT_IMG_URL = new URL(
  'https://bafybeiarmhq3d7msony7zfq67gmn46syuv6jrc6dagob2wflunxiyaksj4.ipfs.dweb.link/1681.png'
)

/**
 * @typedef {import('../lib/log.js').DefaultLogLevel} MeasureNftTtrLogLevel
 */

/**
 * @typedef {import('../lib/log.js').LogFunction<MeasureNftTtrLogLevel>} MeasureNftTtrLogFunction
 */

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
 * @property {RetrieveImageOptions['fetchImage']} fetchImage
 * @property {RetrievalMetricsLogger} pushRetrieveMetrics - fn to push metrics
 * @property {AsyncIterable<Blob>} images - images to upload/retrieve
 * @property {StoreFunction} [store] - function to store nft
 * @property {string} [url] - URL to nft.storage to measure
 * @property {boolean} [logConfigAndExit] - if true, log config and exit
 * @property {URL} [metricsPushGateway] - Server to send metrics to. should reference a https://github.com/prometheus/pushgateway
 * @property {URL[]} gateways - IPFS Gateway to test retrieval from
 * @property {MeasureNftTtrLogFunction} log - logger
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
 * @typedef StoreLog
 * @property {"store"} type
 * @property {string} image
 * @property {Date} startTime
 * @property {Milliseconds} duration
 */

/**
 * @typedef {StoreLog|Activity<"start"|"finish">|RetrieveLog} MeasureTtrLog
 */

/**
 * Job that tests/measures steps
 * * prepare a sample image
 * * upload to nft.storage
 * * retrieve image through ipfs gateway
 * @param {MeasureTtrOptions} options
 * @returns {AsyncIterable<
 * StoreLog|Activity<"start"|"finish">|RetrieveLog
 * >}
 */
export async function* measureNftTimeToRetrievability(options) {
  // separate secrets and config to avoid logging secrets
  const { secrets, config } = readMeasureTtrOptions(options)
  if (config.logConfigAndExit) {
    config.log('info', config)
    return
  }
  /** @type {Activity<"start">} */
  const start = {
    type: 'start',
  }
  yield start
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
    const storeBeforeLog = {
      type: 'store/before',
      image: imageId,
      startTime: new Date(),
    }
    config.log('info', storeBeforeLog)
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
    config.log('info', storeLog)
    for (const gateway of config.gateways) {
      /** @type {RetrieveLog} */
      let retrieval
      try {
        retrieval = await retrieve(options, {
          id: imageId,
          url: createGatewayRetrievalUrl(gateway, metadata.ipnft),
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
 */

/**
 * retrieve from gateway and log
 * @param {RetrieveImageOptions & HasLog} options
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
    url: image.url,
    image: image.id,
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
 * @typedef HasLog
 * @property {MeasureNftTtrLogFunction} log - logger
 */

/**
 * @typedef {(
 *    options: HasLog,
 *    retrieval: RetrieveLog,
 * ) => Promise<void>} RetrievalMetricsLogger
 */

/**
 * @returns {RetrievalMetricsLogger}
 */
export function createStubbedRetrievalMetricsLogger() {
  /** @type {RetrievalMetricsLogger} */
  const push = async (options, retrieval) => {
    options.log('debug', { type: 'stubbedRetrievalMetricsLogger', retrieval })
    return Promise.resolve()
  }
  return push
}

/**
 * @param {Registry} registry
 * @param {import('../lib/metrics.js').RetrievalDurationSecondsMetric} metric
 * @param {string} metricsPushGatewayJobName
 * @param {URL} pushGatewayUrl
 * @param {HttpAuthorization} pushGatewayAuthorization
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
        authorization: pushGatewayAuthorization.authorization,
      },
    },
    registry
  )
  /** @type {RetrievalMetricsLogger} */
  const push = async (options, retrieval) => {
    metric.observe(retrieval.duration.toNumber() / 1000)
    const pushAddArgs = {
      jobName: metricsPushGatewayJobName,
    }
    await pushgateway.pushAdd(pushAddArgs)
    options.log('debug', { type: 'pushgateway.pushAdd', args: pushAddArgs })
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
