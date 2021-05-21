import FormData from 'form-data'
import { RateLimiter } from 'limiter'
import { URL } from 'url'
import { fetchJSON } from './fetch.js'

/**
 * @typedef {{ id: string, title: string }} Namespace
 * @typedef {{ name: string, metadata: any }} Key
 * @typedef {{ key: string, value: any, metadata?: any }} BulkWritePair
 */

const endpoint = new URL('https://api.cloudflare.com/client/v4/')

export class Cloudflare {
  /**
   * @param {{ accountId: string, apiToken: string }} config
   */
  constructor({ accountId, apiToken }) {
    this.accountId = accountId
    this.apiToken = apiToken
    this.kvNsPath = `accounts/${accountId}/storage/kv/namespaces`
    // Cloudflare API is rate limited to 1,200 requests / 5 minutes
    // https://api.cloudflare.com/#getting-started-requests
    this.limiter = new RateLimiter({
      tokensPerInterval: 200,
      interval: 'minute',
    })
  }

  /**
   * @returns {Promise<Namespace[]>}
   */
  async fetchKVNamespaces() {
    let page = 1
    const namespaces = []
    while (true) {
      const url = new URL(
        `${this.kvNsPath}?page=${page}&per_page=100`,
        endpoint
      )
      const { result_info, result } = await fetchJSON(
        this.limiter,
        url.toString(),
        {
          headers: { Authorization: `Bearer ${this.apiToken}` },
        }
      )
      namespaces.push(...result)
      if (result_info.page === result_info.total_pages) {
        break
      }
      page++
    }
    return namespaces
  }

  /**
   * @param {string} nsId KV namespace ID
   * @param {{ prefix?: string }} [options]
   * @returns {AsyncGenerator<Key[]>}
   */
  async *fetchKVKeys(nsId, options = {}) {
    const prefix = options.prefix || ''
    let cursor = ''
    while (true) {
      const url = new URL(
        `${this.kvNsPath}/${nsId}/keys?cursor=${cursor}&limit=1000&prefix=${prefix}`,
        endpoint
      )
      const { result_info, result } = await fetchJSON(
        this.limiter,
        url.toString(),
        {
          headers: { Authorization: `Bearer ${this.apiToken}` },
        }
      )
      yield result
      cursor = result_info.cursor
      if (!cursor) {
        break
      }
    }
  }

  /**
   * @param {string} nsId KV namespace ID
   * @param {string} key
   * @param {any} value
   * @param {any} [metadata]
   */
  async writeKV(nsId, key, value, metadata) {
    const url = new URL(
      `${this.kvNsPath}/${nsId}/values/${encodeURIComponent(key)}`,
      endpoint
    )
    const body = new FormData()
    body.append('value', JSON.stringify(value))
    body.append('metadata', JSON.stringify(metadata || {}))
    await fetchJSON(this.limiter, url.toString(), {
      method: 'PUT',
      headers: { Authorization: `Bearer ${this.apiToken}` },
      body,
    })
  }

  /**
   * @param {string} nsId KV namespace ID
   * @param {Array<BulkWritePair>} kvs
   * @returns {Promise<{ success: boolean, errors: Array<{ code: number, message; string }>, messages: any[] }>}
   */
  async writeKVMulti(nsId, kvs) {
    const url = new URL(`${this.kvNsPath}/${nsId}/bulk`, endpoint)
    kvs = kvs.map((kv) => ({
      ...kv,
      value: JSON.stringify(kv.value),
    }))
    return fetchJSON(this.limiter, url.toString(), {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kvs),
    })
  }

  /**
   * @param {string} nsId KV namespace ID
   * @param {string} key
   */
  async readKV(nsId, key) {
    const url = new URL(
      `${this.kvNsPath}/${nsId}/values/${encodeURIComponent(key)}`,
      endpoint
    )
    return fetchJSON(this.limiter, url.toString(), {
      headers: { Authorization: `Bearer ${this.apiToken}` },
    })
  }

  /**
   * @param {string} nsId KV namespace ID
   * @param {string} key
   */
  async readKVMeta(nsId, key) {
    const url = new URL(
      `${this.kvNsPath}/${nsId}/keys?limit=10&prefix=${encodeURIComponent(
        key
      )}`,
      endpoint
    )
    const { result } = await fetchJSON(this.limiter, url.toString(), {
      headers: { Authorization: `Bearer ${this.apiToken}` },
    })
    return result.length ? result[0].metadata : null
  }

  /**
   * @param {string} nsId KV namespace ID
   * @param {string[]} keys
   */
  async deleteKVMulti(nsId, keys) {
    const url = new URL(`${this.kvNsPath}/${nsId}/bulk`, endpoint)
    return fetchJSON(this.limiter, url.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiToken}`,
      },
      body: JSON.stringify(keys),
    })
  }
}
