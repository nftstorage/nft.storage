import { Cluster } from '@nftstorage/ipfs-cluster'
import { cluster } from './constants.js'
import { HTTPError } from './errors.js'

const client = new Cluster(cluster.apiUrl, {
  headers: { Authorization: `Basic ${cluster.basicAuthToken}` },
})

/**
 * @typedef {import('./models/users.js').User} User
 */

/**
 * @param {Blob} data
 * @param {import('@nftstorage/ipfs-cluster').API.AddParams} options
 */
export async function add(data, options = {}) {
  const { cid, size, bytes } = await client.add(data, {
    metadata: { size: data.size.toString() },
    ...options,
  })
  return {
    cid,
    size: Number(size),
    bytes: Number(bytes),
  }
}

/**
 * @param {Blob} b
 */
async function sha256(b) {
  // hash the message
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    await b.arrayBuffer()
  )
  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => ('00' + b.toString(16)).slice(-2))
    .join('')
  return hashHex
}

/**
 *
 * @param {Blob} data
 * @param {import('@nftstorage/ipfs-cluster').API.AddCarParams} options
 */

export async function addCar(data, options = {}) {
  const cacheUrl = new URL('https://cluster.com')
  // Store the URL in cache by prepending the body's hash
  cacheUrl.pathname = '/addCar' + (await sha256(data))
  // Convert to a GET to be able to cache
  const cacheKey = new Request(cacheUrl.toString(), {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
    method: 'GET',
  })

  const cache = caches.default
  // Find the cache key in the cache
  let response = await cache.match(cacheKey)

  if (!response) {
    console.log('CACHE MISS')
    const { cid, size, bytes } = await client.addCAR(data, {
      metadata: { size: data.size.toString() },
      ...options,
    })

    const out = {
      cid,
      size: Number(size),
      bytes: Number(bytes),
    }

    await cache.put(cacheKey, new Response(JSON.stringify(out)))
    return out
  }
  console.log('CACHE HIT')

  return response.json()
}

/**
 * @param {File[]} files
 */
export async function addDirectory(files, options = {}) {
  const size = files.reduce((total, f) => total + f.size, 0)
  if (size === 0) {
    throw new HTTPError(
      'Content added contains 0 bytes. Please make sure that files are encoded correctly'
    )
  }

  const results = await client.addDirectory(files, {
    metadata: { size: size.toString() },
    ...options,
  })
  return results.map((result) => ({
    cid: result.cid,
    size: Number(result.size),
  }))
}

/**
 * Adds given file, wrapped in a diretory, to the cluster and
 * returns CID of the directory back.
 *
 * @param {File} file
 * @returns {Promise<import('nft.storage/src/lib/interface').CIDString>}
 */
export const importAsset = async (file, options = {}) => {
  const result = await client.addDirectory([file], options)
  // If file path includes a directory e.g. `dir/cat.png` result will contain
  // three CIDs corresponding to `cat.png` , `dir` and wrapping directory.
  // thas is why we verify that at least two elements are present but pick the
  // very last one.
  if (result.length < 2) {
    throw new Error(
      `Expected response with at least two entries, but instead got: ${result.map(
        ($) => $.cid
      )}`
    )
  }
  const dir = result[result.length - 1]
  return dir.cid
}
/**
 * @param {string} cid
 * @param {import("@nftstorage/ipfs-cluster").API.PinOptions | undefined} [options]
 */
export async function pin(cid, options) {
  return client.pin(cid, options)
}

export function delegates() {
  return []
}

/**
 * Best effort conversion from cluster status to pinning service API status.
 * @param {import('@nftstorage/ipfs-cluster').API.StatusResponse} status
 * @returns {import('./pinata-psa').Status}
 */
export function toPSAStatus(status) {
  const pinInfos = Object.values(status.peerMap)
  if (pinInfos.some((i) => i.status === 'pinned')) return 'pinned'
  if (pinInfos.some((i) => i.status === 'pinning')) return 'pinning'
  if (pinInfos.some((i) => i.status === 'pin_queued')) return 'queued'
  return 'failed'
}
