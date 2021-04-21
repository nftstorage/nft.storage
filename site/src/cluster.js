import { Cluster } from '@nftstorage/ipfs-cluster'
import { cluster } from './constants.js'

const client = new Cluster(cluster.url, {
  headers: { Authorization: `Basic ${cluster.token}` },
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
 * Best effort conversion from cluster status to pinning service API status.
 * @param {import('@nftstorage/ipfs-cluster').PinInfo[]} pinInfos
 * @returns {import('./pinata-psa').Status}
 */
export function toPSAStatus(pinInfos) {
  if (pinInfos.some((i) => i.status === 'pinned')) return 'pinned'
  if (pinInfos.some((i) => i.status === 'pinning')) return 'pinning'
  if (pinInfos.some((i) => i.status === 'queued')) return 'queued'
  return 'failed'
}
