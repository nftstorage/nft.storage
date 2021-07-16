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
 * @param {T} [metadata]
 */
export const pin = async (config, url, metadata) =>
  service(config).pin(IPFSURL.formatIPFSPath(url), {
    metadata: {
      user: '@nftstorage/niftysave',
      ...metadata,
    },
  })
