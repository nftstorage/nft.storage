import { URL } from 'url'
import fetch from 'node-fetch'

const endpoint = 'https://api.pinata.cloud'

export class Pinata {
  /**
   * @param {{ apiToken: string }} config
   */
  constructor({ apiToken }) {
    this.apiToken = apiToken
  }

  /**
   * @param {string} cid
   * @param {{ pinataOptions?: { hostNodes?: string[] }, pinataMetadata?: { name?: string } }} [options]
   * @returns {Promise<{ id: string, ipfsHash: string, status: string, name: string }>}
   */
  async pinByHash(cid, options) {
    const url = new URL('/pinning/pinByHash', endpoint)

    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hashToPin: cid, ...(options || {}) }),
    })

    const text = await res.text()
    if (!res.ok) {
      throw Object.assign(
        new Error(`${res.status} ${res.statusText}: ${text}`),
        { response: res }
      )
    }

    return JSON.parse(text)
  }
}
