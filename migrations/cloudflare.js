import FormData from 'form-data'
import dotenv from 'dotenv'
import PQueue from 'p-queue'
import { RateLimiter } from 'limiter'
import fetch from 'node-fetch'

dotenv.config()

const endpoint = new URL('https://api.cloudflare.com/client/v4/')

export class Cloudflare {
  constructor({ accountId, apiToken }) {
    this.accountId = accountId
    this.apiToken = apiToken
    this.kvNamespacesPath = `accounts/${accountId}/storage/kv/namespaces`
    // Cloudflare API is rate limited to 1,200 requests / 5 minutes
    // https://api.cloudflare.com/#getting-started-requests
    const limiter = new RateLimiter(200, 'minute')
    this.fetch = (url, init) =>
      new Promise((resolve, reject) => {
        limiter.removeTokens(1, async (err) => {
          if (err) return reject(err)
          try {
            init = init || {}
            init.headers = init.headers || {}
            init.headers.Authorization = `Bearer ${apiToken}`
            const res = await fetch(url, init)
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
        `${this.kvNamespacesPath}?page=${page}&per_page=100`,
        endpoint
      )
      const res = await this.fetch(url.toString())
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`)
      const { result_info, result } = await res.json()
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
        `${this.kvNamespacesPath}/${nsId}/keys?cursor=${cursor}&limit=1000`,
        endpoint
      )
      const res = await this.fetch(url.toString())
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`)
      const { result_info, result } = await res.json()
      yield result
      cursor = result_info.cursor
      if (!cursor) {
        break
      }
    }
  }

  async writeKV(nsId, key, value, metadata) {
    const url = new URL(
      `${this.kvNamespacesPath}/${nsId}/values/${encodeURIComponent(key)}`,
      endpoint
    )
    const body = new FormData()
    body.append('value', JSON.stringify(value))
    if (metadata) {
      body.append('metadata', JSON.stringify(metadata))
    }
    const res = await this.fetch(url.toString(), { method: 'PUT', body })
    if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`)
    await res.json()
  }

  async readKV(nsId, key) {
    const url = new URL(
      `${this.kvNamespacesPath}/${nsId}/values/${encodeURIComponent(key)}`,
      endpoint
    )
    const res = await this.fetch(url.toString())
    if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`)
    return res.json()
  }
}
