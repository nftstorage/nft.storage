import dotenv from 'dotenv'
import fetch, { Blob } from '@web-std/fetch'
import { File } from '@web-std/file'
import { FormData } from '@web-std/form-data'
import { Cluster } from '@nftstorage/ipfs-cluster'
import * as IPFSURL from './ipfs-url.js'

dotenv.config()

Object.assign(globalThis, { File, Blob, FormData, fetch })

const services = new WeakMap()

/**
 * @typedef {Object} Config
 * @property {URL} url
 * @property {string} secret
 *
 * @typedef {Cluster} Service
 *
 * @param {Config} config
 * @returns {Service}
 */
const service = (config) => {
  const value = services.get(config)
  if (value) {
    return value
  } else {
    const value = new Cluster(config.url.href, {
      headers: { Authorization: `Basic ${config.secret}` },
    })
    services.set(config, value)
    return value
  }
}

/**
 * Adds blob to the cluster
 *
 * @template {Record<string, string>} T
 * @param {Config} config
 * @param {Blob} data
 * @param {T} [metadata]
 */
export const add = async (config, data, metadata) => {
  const { cid, size, bytes } = await service(config).add(data, {
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
 */
export const pin = async (config, url, { metadata, v0 = false } = {}) => {
  const path = v0
    ? IPFSURL.formatIPFSPathWithCIDv0(url)
    : IPFSURL.formatIPFSPath(url)

  return await service(config).pin(removeTrailingSlash(path), {
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
