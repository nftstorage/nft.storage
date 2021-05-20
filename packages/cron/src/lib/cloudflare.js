import FormData from 'form-data'
import { RateLimiter } from 'limiter'
import fetch from 'node-fetch'
import AbortController from 'abort-controller'
import retry from 'p-retry'
import { URL } from 'url'

/**
 * @typedef {{ id: string, title: string }} Namespace
 * @typedef {{ name: string, metadata: any }} Key
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
   * @private
   * @param {string} url
   * @param {import('node-fetch').RequestInit} [init]
   * @returns {Promise<any>}
   */
  async fetchJSON(url, init) {
    await this.limiter.removeTokens(1)
    const res = await retry(
      async () => {
        const controller = new AbortController()
        const abortID = setTimeout(() => controller.abort(), 60000)
        init = init || {}
        init.headers = init.headers || {}
        init.headers.Authorization = `Bearer ${this.apiToken}`
        init.signal = controller.signal
        try {
          const res = await fetch(url, init)
          const text = await res.text()
          if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}: ${text}`)
          }
          return text === '' ? null : JSON.parse(text)
        } finally {
          clearTimeout(abortID)
        }
      },
      {
        onFailedAttempt: (err) => console.warn(`💥 fetch ${url}`, err),
        retries: 5,
        minTimeout: 60000,
      }
    )
    return res
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
      const { result_info, result } = await this.fetchJSON(url.toString())
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
      const { result_info, result } = await this.fetchJSON(url.toString())
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
    await this.fetchJSON(url.toString(), { method: 'PUT', body })
  }

  /**
   * @param {string} nsId KV namespace ID
   * @param {Array<{ key: string, value: any }>} kvs
   * @returns {Promise<{ success: boolean, errors: Array<{ code: number, message; string }>, messages: any[] }>}
   */
  async writeKVMulti(nsId, kvs) {
    const url = new URL(`${this.kvNsPath}/${nsId}/bulk`, endpoint)
    kvs = kvs.map((kv) => ({ ...kv, value: JSON.stringify(kv.value) }))
    return this.fetchJSON(url.toString(), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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
    return this.fetchJSON(url.toString())
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
    const { result } = await this.fetchJSON(url.toString())
    return result.length ? result[0].metadata : null
  }
}
