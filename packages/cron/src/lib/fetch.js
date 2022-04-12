import fetch from '@web-std/fetch'
import retry from 'p-retry'
import debug from 'debug'

const log = debug('fetchJSON')

const REQUEST_TIMEOUT = 60000
const RETRY_INTERVAL = 60000
const RETRY_ATTEMPTS = 5

/**
 * @param {import('limiter').RateLimiter} limiter
 * @param {string} url
 * @param {RequestInit} [init]
 * @returns {Promise<any>}
 */
export async function fetchJSON(limiter, url, init) {
  await limiter.removeTokens(1)
  const res = await retry(
    async () => {
      const controller = new AbortController()
      const abortID = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
      init = init || {}
      // @ts-ignore
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
        return text === '' ? null : JSON.parse(text)
      } finally {
        clearTimeout(abortID)
      }
    },
    {
      onFailedAttempt: async (err) => {
        // @ts-ignore
        if (err.response && err.response.status === 429) {
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
