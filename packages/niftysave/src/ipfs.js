import * as IPFSURL from './ipfs-url.js'

/**
 * @typedef {Object} Config
 * @property {URL} url
 * @property {string} secret
 */

/**
 *
 * @param {import('./ipfs-url').IPFSURL} url
 * @param {Config} config
 * @returns {Promise<Blob>}
 */
export const cat = async (config, url) => {
  const { href } = new URL(
    `/api/v0/cat?arg=${IPFSURL.formatIPFSPath(url)}`,
    config.url
  )

  const response = await fetch(href, {
    method: 'POST',
    headers: { Authorization: `Basic ${config.secret}` },
  })

  if (response.ok) {
    return await response.blob()
  } else {
    throw new Error(
      `Fetch error: Status ${response.status} ${response.statusText}`
    )
  }
}
