import { Cluster } from '@nftstorage/ipfs-cluster'
import { cluster } from './constants.js'

const client = new Cluster(cluster.apiUrl, {
  headers: { Authorization: `Basic ${cluster.basicAuthToken}` },
})

/**
 * @typedef {import('./models/users.js').User} User
 */

/**
 * @param {Blob} data
 */
export async function add(data) {
  return client.add(data, { metadata: { size: data.size.toString() } })
}

/**
 * @param {import('./utils/multipart/index.js').FileParts} fileParts
 */
export async function addDirectory(fileParts) {
  const files = fileParts.map(
    (fp) =>
      new File([fp.data], fp.filename || fp.name, { type: fp.contentType })
  )
  const size = files.reduce((total, f) => total + f.size, 0)
  return client.addDirectory(files, { metadata: { size: size.toString() } })
}

/**
 * @param {string} cid
 */
export async function pin(cid) {
  return client.pin(cid)
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
  if (pinInfos.some((i) => i.status === 'pinned')) return 'pinned'
  if (pinInfos.some((i) => i.status === 'pinning')) return 'pinning'
  if (pinInfos.some((i) => i.status === 'queued')) return 'queued'
  return 'failed'
}
