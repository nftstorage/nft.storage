import { URL } from 'url'
import { RateLimiter } from 'limiter'
import { fetchJSON } from './fetch.js'
import assert from 'assert'
import { hasOwnProperty } from './utils.js'

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
    const json = await fetchJSON(this.limiter, url.toString(), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this.apiToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ hashToPin: cid, ...(options || {}) }),
    })
    assert.ok(typeof json === 'object')
    assert.ok(json)
    assert.ok(hasOwnProperty(json, 'id'))
    const id = json.id
    assert.ok(typeof id === 'string')
    assert.ok(hasOwnProperty(json, 'ipfsHash'))
    const ipfsHash = json.ipfsHash
    assert.ok(typeof ipfsHash === 'string')
    assert.ok(hasOwnProperty(json, 'status'))
    const status = json.status
    assert.ok(typeof status === 'string')
    assert.ok(hasOwnProperty(json, 'name'))
    const name = json.name
    assert.ok(typeof name === 'string')
    const pin = { id, ipfsHash, status, name }
    return pin
  }
}
