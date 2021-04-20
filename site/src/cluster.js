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
 * @param {User} user
 */
export async function add(data, user) {
  return client.add(data, { name: `${user.nickname}-${Date.now()}` })
}

/**
 * @param {import('./utils/multipart/index.js').FileParts} fileParts
 * @param {User} user
 */
export async function addDirectory(fileParts, user) {
  const files = fileParts.map(
    (fp) =>
      new File([fp.data], fp.filename || fp.name, { type: fp.contentType })
  )
  return client.addDirectory(files, { name: `${user.nickname}-${Date.now()}` })
}
