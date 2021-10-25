import dotenv from 'dotenv'
import fetch, { Blob } from '@web-std/fetch'
import { File } from '@web-std/file'
import { FormData } from '@web-std/form-data'
import * as Cluster from '@nftstorage/ipfs-cluster'
import * as IPFSURL from './ipfs-url.js'

dotenv.config()

Object.assign(globalThis, { File, Blob, FormData, fetch })

/**
 * @typedef {import('@nftstorage/ipfs-cluster').API.Config} Config
 */

/**
 * Adds blob to the cluster
 *
 * @template {Record<string, string>} T
 * @param {Config} config
 * @param {Blob} data
 * @param {Object} [options]
 * @param {T} [options.metadata]
 * @param {AbortSignal} [options.signal]
 */
export const add = async (config, data, { metadata, signal }) => {
  const { cid, size, bytes } = await Cluster.add(config, data, {
    signal,
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
 * @param {Config} config
 * @param {IPFSURL.IPFSURL} url
 * @param {Object} [options]
 * @param {T} [options.metadata]
 * @param {boolean} [options.v0]
 * @param {AbortSignal} [options.signal]
 */
export const pin = async (
  config,
  url,
  { metadata, v0 = false, signal } = {}
) => {
  const path = v0
    ? IPFSURL.formatIPFSPathWithCIDv0(url)
    : IPFSURL.formatIPFSPath(url)

  return await Cluster.pin(config, removeTrailingSlash(path), {
    signal,
    metadata: {
      user: '@nftstorage/niftysave',
      ...metadata,
    },
  })
}

/**
 * Removes trailing `/` from the path to avoid redirect issues
 * @see https://github.com/ipfs/ipfs-cluster/issues/1415
 * @param {string} path
 */
const removeTrailingSlash = (path) => {
  const offset = path.length - 1
  return path.charAt(offset) === '/' ? path.slice(0, offset) : path
}
