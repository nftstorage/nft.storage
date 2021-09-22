import { URL } from 'node:url'
import got from 'got'

class Pinata {
  /**
   * @param {string} token
   */
  constructor(token) {
    this.opts = {
      url: 'https://api.pinata.cloud',
      headers: { Authorization: `Bearer ${token}` },
    }
  }

  /**
   * Find pin by cid
   *
   * @param {string} cid
   */
  async find(cid) {
    const url = new URL(`psa/pins`, this.opts.url)

    const data = await got(url, {
      headers: this.opts.headers,
      searchParams: {
        cid: cid,
      },
    }).json()

    if (data.results && data.results[0]) {
      return data.results[0]
    }
  }

  /**
   * Add pin
   *
   * @param {{cid: string}} body
   */
  async add(body) {
    const url = new URL(`psa/pins`, this.opts.url)
    const data = await got
      .post(url, {
        headers: this.opts.headers,
        json: body,
      })
      .json()
    return data
  }

  /**
   * Add or find pin by cid
   *
   * @param {string} cid
   */
  async addOrFind(cid) {
    let result

    try {
      result = await this.add({ cid })
    } catch (err) {
      // Catch duplicate pin and find it instead
      if (err.response && err.response.body) {
        const rsp = JSON.parse(err.response.body)
        if (rsp.error && rsp.error.reason === 'DUPLICATE_OBJECT') {
          result = await this.find(cid)
        } else {
          throw err // re throw errors with response body
        }
      } else {
        throw err // re throw all remaining errors
      }
    }

    return result
  }
}

export default Pinata
