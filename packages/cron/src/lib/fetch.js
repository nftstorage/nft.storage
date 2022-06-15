import fetch from '@web-std/fetch'
import retry from 'p-retry'
import debug from 'debug'
import { hasOwnProperty } from './utils.js'

const log = debug('fetchJSON')

const REQUEST_TIMEOUT = 60000
const RETRY_INTERVAL = 60000
const RETRY_ATTEMPTS = 5

/**
 * @param {import('limiter').RateLimiter} limiter
 * @param {string} url
 * @param {RequestInit} [init]
 * @returns {Promise<unknown>}
 */
export async function fetchJSON(limiter, url, init) {
  await limiter.removeTokens(1)
  const res = await retry(
    async () => {
      const controller = new AbortController()
      const abortID = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
      init = init || {}
      init.signal = controller.signal
      try {
        const res = await fetch(url, init)
        const text = await res.text()
        if (!res.ok) {
          throw Object.assign(
            new Error(`${res.status} ${res.statusText}: ${text}`),
            { response: res }
          )
        }
        return text === '' ? null : /** @type {unknown} */ (JSON.parse(text))
      } finally {
        clearTimeout(abortID)
      }
    },
    {
      onFailedAttempt: async (err) => {
        if (
          hasOwnProperty(err, 'response') &&
          hasOwnProperty(err.response, 'status') &&
          err.response.status === 429
        ) {
          log(`🚦 rate limited ${url}`)
        } else {
          log(`💥 fetch ${url}`, err)
        }
        await limiter.removeTokens(1)
      },
      retries: RETRY_ATTEMPTS,
      minTimeout: RETRY_INTERVAL,
    }
  )
  return res
}
