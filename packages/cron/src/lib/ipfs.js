import { URL } from 'url'
import fetch from '@web-std/fetch'
import { hasOwnProperty } from './utils'

export class IPFS {
  /**
   * @param {string|URL} url
   * @param {{ headers?: Record<string, string> }} [options]
   */
  constructor(url, options = {}) {
    this.url = url
    this.headers = options.headers || {}
  }

  /**
   * @param {string} cid
   * @param {{ timeout?: number }} [options]
   */
  async dagSize(cid, options = {}) {
    const url = new URL(
      `dag/stat?arg=${encodeURIComponent(cid)}&progress=false`,
      this.url
    )
    const controller = new AbortController()
    const abortID = setTimeout(
      () => controller.abort(),
      options.timeout || 60000
    )
    try {
      const response = await fetch(url.toString(), {
        headers: this.headers,
        signal: controller.signal,
      })
      if (!response.ok) {
        throw Object.assign(
          new Error(`${response.status}: ${response.statusText}`),
          { response }
        )
      }
      const data = /** @type {unknown} */ (await response.json())
      if (!hasOwnProperty(data, 'Size')) {
        throw new Error('expected response json to have Size')
      }
      const size = parseInt(String(data.Size))
      if (isNaN(size)) {
        throw new Error(`invalid DAG size for ${cid}: ${String(data.Size)}`)
      }
      return size
    } finally {
      clearTimeout(abortID)
    }
  }
}
