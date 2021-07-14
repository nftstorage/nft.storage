import dotenv from 'dotenv'
import fetch, { Blob } from '@web-std/fetch'
import { File } from '@web-std/file'
import { FormData } from '@web-std/form-data'
import { Cluster } from '@nftstorage/ipfs-cluster'
import * as IPFSURL from './ipfs-url.js'

dotenv.config()

Object.assign(globalThis, { File, Blob, FormData, fetch })

const cluster = new Cluster('https://nft2.storage.ipfscluster.io/api/', {
  headers: { Authorization: `Basic ${process.env['IPFS_CLUSTER_KEY']}` },
})

/**
 * Adds blob to the cluster
 *
 * @template {Record<string, string>} T
 * @param {Blob} data
 * @param {T} [metadata]
 */
export const add = async (data, metadata) => {
  const { cid, size, bytes } = await cluster.add(data, {
    metadata: {
      size: data.size.toString(),
      user: '@nftstorage/niftysave',
      ...metadata,
    },
  })

  return {
    cid,
    size: Number(size),
    bytes: Number(bytes),
    metadata,
  }
}

/**
 * Adds blob to the cluster
 *
 * @template {Record<string, string>} T
 * @param {IPFSURL.IPFSURL} url
 * @param {T} [metadata]
 */
export const pin = async (url, metadata) =>
  cluster.pin(IPFSURL.formatIPFSPath(url), {
    metadata: {
      user: '@nftstorage/niftysave',
      ...metadata,
    },
  })
