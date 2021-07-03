import * as IPFSURL from './ipfs-url.js'
import fetch from '@web-std/fetch'

/**
 * @param {URL} url
 * @returns {Promise<Blob>}
 */

export const fetchResource = (url) =>
  IPFSURL.isIPFSURL(url) ? fetchIPFSResource(url) : fetchWebResource(url)

/**
 * @param {URL} resourceURL
 * @returns {Promise<Blob>}
 */

export const fetchWebResource = async (resourceURL) => {
  const response = await fetch(resourceURL.href)

  if (response.ok) {
    return await response.blob()
  } else {
    throw new Error(
      `Fetch error: Status ${response.status} ${response.statusText}`
    )
  }
}

/**
 * @param {IPFSURL.IPFSURL} url
 */
export const fetchIPFSResource = (url) => fetchWebResource(IPFSURL.embed(url))
