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
 * 
 * @param {Blob} data 
 * @param {import('@nftstorage/ipfs-cluster').API.AddCarParams} options
 */

export async function addCar(data, options = {}) {
  const { cid, size, bytes } = await client.addCAR(data, {
    metadata: { size: data.size.toString() },
    ...options
  })

  return {
    cid,
    size: Number(size),
    bytes: Number(bytes)
  }
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
  return results.map(result => ({
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
  if (result.length !== 2) {
    throw new Error(
      `Expected response with two entries, but got ${result.length} instead`
    )
  }
  const [, dir] = result
  return dir.cid
}
/**
 * @param {string} cid
 * @param {import("@nftstorage/ipfs-cluster").PinOptions | undefined} [options]
 */
export async function pin(cid, options) {
  return client.pin(cid, options)
}

/**
 * @param {string} cid
 */
export async function allocation(cid) {
  return client.allocation(cid)
}

/**
 * @param {string} cid
 */
export async function status(cid) {
  return client.status(cid)
}

/**
 * @param {string} cid
 */
export async function recover(cid) {
  return client.recover(cid)
}

export function delegates() {
  return Array.from(cluster.addrs)
}

/**
 * @param {string} cid
 */
export async function dagSize(cid) {
  const url = new URL(
    `dag/stat?arg=${encodeURIComponent(cid)}&progress=false`,
    cluster.ipfsProxyApiUrl
  )
  const response = await fetch(url.toString(), {
    headers: { Authorization: `Basic ${cluster.ipfsProxyBasicAuthToken}` },
  })
  if (!response.ok) {
    throw Object.assign(
      new Error(`${response.status}: ${response.statusText}`),
      { response }
    )
  }
  const data = await response.json()
  return parseInt(data.Size)
}

/**
 * Best effort conversion from cluster status to pinning service API status.
 * @param {import('@nftstorage/ipfs-cluster').StatusResponse} status
 * @returns {import('./pinata-psa').Status}
 */
export function toPSAStatus(status) {
  const pinInfos = Object.values(status.peerMap)
  if (pinInfos.some(i => i.status === 'pinned')) return 'pinned'
  if (pinInfos.some(i => i.status === 'pinning')) return 'pinning'
  if (pinInfos.some(i => i.status === 'pin_queued')) return 'queued'
  return 'failed'
}
