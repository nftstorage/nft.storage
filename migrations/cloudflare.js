import FormData from 'form-data'
import { RateLimiter } from 'limiter'
import fetch from 'node-fetch'
import AbortController from 'abort-controller'
import retry from 'p-retry'

const endpoint = new URL('https://api.cloudflare.com/client/v4/')

export class Cloudflare {
  constructor({ accountId, apiToken }) {
    this.accountId = accountId
    this.apiToken = apiToken
    this.kvNsPath = `accounts/${accountId}/storage/kv/namespaces`
    // Cloudflare API is rate limited to 1,200 requests / 5 minutes
    // https://api.cloudflare.com/#getting-started-requests
    const limiter = new RateLimiter(200, 'minute')
    this.fetchJSON = (url, init) =>
      new Promise((resolve, reject) => {
        limiter.removeTokens(1, async (err) => {
          if (err) return reject(err)
          try {
            const res = await retry(
              async () => {
                const controller = new AbortController()
                const abortID = setTimeout(() => controller.abort(), 60000)
                init = init || {}
                init.headers = init.headers || {}
                init.headers.Authorization = `Bearer ${apiToken}`
                init.signal = controller.signal
                try {
                  const res = await fetch(url, init)
                  if (!res.ok) {
                    throw new Error(`${res.status}: ${res.statusText}`)
                  }
                  const text = await res.text()
                  return text === '' ? null : JSON.parse(text)
                } finally {
                  clearTimeout(abortID)
                }
              },
              {
                onFailedAttempt: (err) => console.warn(`💥 fetch ${url}`, err),
                retries: 5,
              }
            )
            resolve(res)
          } catch (err) {
            reject(err)
          }
        })
      })
  }

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

  async *fetchKVKeys(nsId) {
    let cursor = ''
    while (true) {
      const url = new URL(
        `${this.kvNsPath}/${nsId}/keys?cursor=${cursor}&limit=1000`,
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

  async writeKV(nsId, key, value, metadata) {
    const url = new URL(
      `${this.kvNsPath}/${nsId}/values/${encodeURIComponent(key)}`,
      endpoint
    )
    const body = new FormData()
    body.append('value', JSON.stringify(value))
    if (metadata) {
      body.append('metadata', JSON.stringify(metadata))
    }
    await this.fetchJSON(url.toString(), { method: 'PUT', body })
  }

  async writeKVMulti(nsId, kvs) {
    const url = new URL(`${this.kvNsPath}/${nsId}/bulk`, endpoint)
    kvs = kvs.map((kv) => ({ ...kv, value: JSON.stringify(kv.value) }))
    return this.fetchJSON(url.toString(), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(kvs),
    })
  }

  async readKV(nsId, key) {
    const url = new URL(
      `${this.kvNsPath}/${nsId}/values/${encodeURIComponent(key)}`,
      endpoint
    )
    return this.fetchJSON(url.toString())
  }

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

  async deleteKVMulti(nsId, keys) {
    const url = new URL(`${this.kvNsPath}/${nsId}/bulk`, endpoint)
    return this.fetchJSON(url.toString(), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(keys),
    })
  }
}
