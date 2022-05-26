import { tmpdir } from 'os'
import * as path from 'path'
import { mkdtemp, writeFile } from 'node:fs/promises'
import * as assert from 'assert'
import mime from 'mime-types'
import fetch from '@web-std/fetch'
import { NFTStorage } from 'nft.storage'
import { EnvironmentLoader } from 'safe-env-vars'
import { Milliseconds, now } from '../lib/time.js'

const env = new EnvironmentLoader()
const NFT_STORAGE_API_KEY = env.string.get('NFT_STORAGE_API_KEY')
const EXAMPLE_NFT_IMG_URL =
  'https://bafybeiarmhq3d7msony7zfq67gmn46syuv6jrc6dagob2wflunxiyaksj4.ipfs.dweb.link/1681.png'

/**
 * @typedef RetrieveLog
 * @property {"retrieve"}   type
 * @property {URL}          url
 * @property {number}       contentLength
 * @property {Date}         startTime
 * @property {Milliseconds} duration
 */

/**
 * Job that tests/measures steps
 * * prepare a sample image
 * * upload to nft.storage
 * * retrieve image through ipfs gateway
 * @param {object} config
 * @param {string} [config.url] - URL to nft.storage to measure
 * @param {string} [config.metricsPushGateway] - Server to send metrics to. should be a https://github.com/prometheus/pushgateway
 * @param {string} [config.metricsPushGatewayBasicAuthUser] - authorization for metricsPushGateway
 * @param {string} [config.nftStorageToken] - API Token for nft.storage
 */
export async function measureNftTimeToRetrievability(config = {}) {
  const start = {
    type: 'start',
    job: 'measureNftTimeToRetrievability',
    config: {
      metricsPushGateway: config.metricsPushGateway,
      url: config.url,
    },
  }
  console.log(JSON.stringify(start))
  const testStartDate = new Date()
  const testStart = now()
  const dir = await createRandomDir()
  const imageResponse = await fetch(EXAMPLE_NFT_IMG_URL)
  const image = await imageResponse.blob()
  const nft = {
    image, // use image Blob as `image` field
    name: 'Example NFT',
    description: 'Example NFT used by nft.storage cron nft-ttr',
  }
  const client = new NFTStorage({
    token: config.nftStorageToken ?? NFT_STORAGE_API_KEY,
  })
  const storeStartedDate = new Date()
  const storeStartedAt = now()
  const metadata = await client.store(nft)
  const storeEndAt = now()
  const store = {
    type: 'store',
    startTime: storeStartedDate,
    duration: new Milliseconds(
      storeEndAt.toNumber() - storeStartedAt.toNumber()
    ),
  }
  console.log(JSON.stringify(store))
  const retrievalUrl = new URL(
    `https://${metadata.ipnft}.ipfs.nftstorage.link/image/blob`
  )
  const retrieveFetchDate = new Date()
  const retrieveFetchStart = now()
  const retrieveImageResponse = await fetch(retrievalUrl.toString())
  const retrieveFetchEnd = now()
  const retrieveReadStart = now()
  const retrievedImage = await retrieveImageResponse.blob()
  const retrieveReadEnd = now()
  const retrievalDuration = new Milliseconds(
    retrieveReadEnd.toNumber() - retrieveFetchStart.toNumber()
  )
  /** @type {RetrieveLog} */
  const retrieve = {
    type: 'retrieve',
    url: retrievalUrl,
    contentLength: retrievedImage.size,
    startTime: retrieveFetchDate,
    duration: retrievalDuration,
  }
  console.log(JSON.stringify(retrieve))
  const { metricsPushGateway, metricsPushGatewayBasicAuthUser } = config
  if (metricsPushGateway) {
    assert.ok(
      metricsPushGatewayBasicAuthUser,
      'expected metricsPushGatewayBasicAuthUser'
    )
    await pushRetrieveMetrics(
      { metricsPushGateway, metricsPushGatewayBasicAuthUser },
      retrieve
    )
  } else {
    console.warn(
      'skipping pushRetrieveMetrics because no metricsPushGateway is configured'
    )
  }
}

/**
 * Push retrieval metrics to a pushgateway
 * @param {object} config
 * @param {string} config.metricsPushGateway - Server to send metrics to. should be a https://github.com/prometheus/pushgateway
 * @param {string} config.metricsPushGatewayBasicAuthUser - authorization for metricsPushGateway
 * @param {RetrieveLog} retrieval
 */
async function pushRetrieveMetrics(config, retrieval) {
  /** @type [string, RequestInit] */
  const pushRequest = [
    config.metricsPushGateway,
    {
      method: 'post',
      headers: {
        authorization: basicAuthorizationHeaderValue(
          config.metricsPushGatewayBasicAuthUser
        ),
        'content-type': 'application/octet-stream',
      },
      body: [formatRetrievalMetrics(retrieval)].join('/n'),
    },
  ]
  const pushResponse = await fetch.apply(null, pushRequest)
  if (![200, 201].includes(pushResponse.status)) {
    console.warn(
      JSON.stringify({
        type: 'error',
        message: 'unsuccessful metrics push',
        text: await pushResponse.text(),
      })
    )
  }
  assert.equal(pushResponse.status, 201)
}

/**
 * @param {string} [user]
 * @param {string} [password]
 * @returns {`Basic ${string}`} - http Authorization header value
 */
function basicAuthorizationHeaderValue(user = '', password = '') {
  const basicAuthValue = btoa(`${user}:${password}`)
  const headerValue = /** @type {const} */ (`Basic ${basicAuthValue}`)
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
  return [
    '# HELP nftstorage_retrieval_duration_seconds How long it took to retrieve an nft image',
    '# TYPE nftstorage_retrieval_duration_seconds gauge',
    `nftstorage_retrieval_duration_seconds{url="${retrieval.url}",size="${retrieval.contentLength}"} ${durationSeconds}`,
  ].join('\n')
}

/**
 * Create a new dir on the fs that can be used to test in
 * @returns fs path to dir
 */
async function createRandomDir() {
  const randomDir = await mkdtemp(`${tmpdir()}${path.sep}nft-ttr-`)
  return randomDir
}

/**
 * Download a file from a source url to the filesystem
 * @param {URL} source
 * @param {(o: { ext: string }) => string} createTargetPath
 */
async function downloadFile(source, createTargetPath) {
  const response = await fetch(source.toString(), {
    headers: {
      accept: 'image/*',
    },
  })
  assert.ok(response.body)
  const ct = response.headers.get('content-type')
  assert.ok(ct, 'unable to determine response content-type')
  const ext = mime.extension(ct)
  assert.ok(ext, 'unable to determine file extension from mimetype')
  const target = createTargetPath({ ext })
  writeFile(target, response.body)
  return { target }
}
