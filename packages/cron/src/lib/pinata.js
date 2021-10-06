import { URL } from 'url'
import { RateLimiter } from 'limiter'
import { fetchJSON } from './fetch.js'

const endpoint = 'https://api.pinata.cloud'

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
   * @returns {Promise<{ id: string, ipfsHash: string, status: string, name: string }>}
   */
  async pinByHash(cid, options) {
    const url = new URL('/pinning/pinByHash', endpoint)
    return fetchJSON(this.limiter, url.toString(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hashToPin: cid, ...(options || {}) }),
    })
  }
}
