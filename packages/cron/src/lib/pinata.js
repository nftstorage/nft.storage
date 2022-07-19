import { URL } from 'url'
import { RateLimiter } from 'limiter'
import { fetchJSON } from './fetch.js'

const endpoint = 'https://api.pinata.cloud'

/**
 * @typedef PinataPin
 * @property {string} id
 * @property {string} ipfsHash
 * @property {string} status
 * @property {string} name
 */

export class Pinata {
  /**
   * @param {{ apiToken: string }} config
   */
  constructor({ apiToken }) {
    this.apiToken = apiToken
    this.limiter = new RateLimiter({ tokensPerInterval: 3, interval: 'second' })
  }

  /**
   * @param {string} cid
   * @param {{ pinataOptions?: { hostNodes?: string[] }, pinataMetadata?: { name?: string } }} [options]
   * @returns {Promise<PinataPin>}
   */
  async pinByHash(cid, options) {
    const url = new URL('/pinning/pinByHash', endpoint)
    const json = /** @type {unknown} */ (
      await fetchJSON(this.limiter, url.toString(), {
        method: 'POST',
        headers: {
          authorization: `Bearer ${this.apiToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ hashToPin: cid, ...(options || {}) }),
      })
    )
    const pin = /** @type {PinataPin} */ (json)
    return pin
  }
}
