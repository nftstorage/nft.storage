import { Cluster } from '@nftstorage/ipfs-cluster'
import { getServiceConfig } from './config.js'
import { HTTPError } from './errors.js'

// pickup provides a cluster compatible api for get /pins & post /pins
const { PICKUP_URL, PICKUP_BASIC_AUTH_TOKEN } = getServiceConfig()

const client = new Cluster(PICKUP_URL, {
  headers: {
    Authorization: `Basic ${PICKUP_BASIC_AUTH_TOKEN}`,
  },
})

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
 *
 * @param {Blob} data
 * @param {import('@nftstorage/ipfs-cluster').API.AddCarParams} options
 */

export async function addCar(data, options = {}) {
  const { cid, size, bytes } = await client.addCAR(data, {
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
 * @param {File[]} files
 */
export async function addDirectory(files, options = {}) {
  const size = files.reduce((total, f) => total + f.size, 0)
  if (size === 0) {
    throw new HTTPError(
      'Content added contains 0 bytes. Please make sure that files are encoded correctly',
      400
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
 */
export function toPSAStatus(status) {
  const pinInfos = Object.values(status.peerMap)
  if (pinInfos.some((i) => i.status === 'pinned')) return 'pinned'
  if (pinInfos.some((i) => i.status === 'pinning')) return 'pinning'
  if (pinInfos.some((i) => i.status === 'pin_queued')) return 'queued'
  return 'failed'
}

/**
 * @param {import('@nftstorage/ipfs-cluster').API.StatusResponse} status
 * @returns {import('./utils/db-client.js').definitions["pin"]["status"]} status
 */
export function toDBPinStatus(status) {
  const pinInfos = Object.values(status.peerMap)
  if (pinInfos.some((i) => i.status === 'pinned')) return 'Pinned'
  if (pinInfos.some((i) => i.status === 'pinning')) return 'Pinning'
  if (pinInfos.some((i) => i.status === 'pin_queued')) return 'PinQueued'
  return 'PinError'
}

/**
 * @param {string} cid
 * @param {import("@nftstorage/ipfs-cluster").API.StatusOptions} [options]
 */
export function status(cid, options) {
  return client.status(cid, options)
}
