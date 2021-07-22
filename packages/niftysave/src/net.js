import fetch from '@web-std/fetch'
import * as IPFS from './ipfs.js'
import * as IPFSURL from './ipfs-url.js'
import AbortController from 'abort-controller'

/**
 * @param {URL} resourceURL
 * @param {Object} [options]
 * @param {AbortSignal} [options.signal]
 * @returns {Promise<Blob>}
 */

export const fetchWebResource = async (resourceURL, options) => {
  const response = await fetch(resourceURL.href, options)

  if (response.ok) {
    return await response.blob()
  } else {
    throw new Error(
      `Fetch error: Status ${response.status} ${response.statusText}`
    )
  }
}

/**
 * Fetches resource corresponding to a resource. If resource has an `ipfsURL`,
 * provided IPFS node config will be used to obtain the content otherwise it
 * is fetched from `resource.url` instead. Will infer whether to use CID v0 or
 * v1 from the `resource.url`.
 *
 * @param {Object} config
 * @param {IPFS.Config} config.ipfs
 * @param {Object} resource
 * @param {URL} resource.url
 * @param {IPFSURL.IPFSURL|null} [resource.ipfsURL]
 * @param {Object} [options]
 * @param {AbortSignal} [options.signal]
 */
export const fetchResource = ({ ipfs }, { url, ipfsURL }, { signal }) => {
  if (ipfsURL) {
    // If original URL used CID v0 we need make a request using CID v0
    // otherwise we may not get the content.
    const data = IPFSURL.decode(url)
    const v0 = data ? data.cid.version === 0 : false

    return IPFS.cat(ipfs, ipfsURL, { v0, signal })
  } else {
    return fetchWebResource(url, { signal })
  }
}

/**
 * Creates an AbortSignal that will abort in number of milliseconds provided.
 *
 * @param {number} ms
 * @returns {AbortSignal}
 */
export const timeout = (ms) => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), ms)
  return controller.signal
}
