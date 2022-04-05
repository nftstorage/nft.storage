/* eslint-env mocha */
import * as assert from 'uvu/assert'
import { createRateLimiter } from 'nft.storage'

// these must be the same as the values used by createRateLimiter
const RATE_LIMIT_REQUESTS = 30
const RATE_LIMIT_PERIOD = 10 * 1000

describe('rate limiter', () => {
  it('limits to correct rate', async function () {
    /** @type {import('mocha').Context} */
    this.timeout(RATE_LIMIT_PERIOD * 2)
    const rateLimiter = createRateLimiter()
    // check how many times the rate limiter returns within the time period
    let numRequests = 0
    const start = Date.now()
    while (true) {
      await rateLimiter()
      // don't count if provided at/after the period - it belongs to the next
      if (Date.now() - start >= RATE_LIMIT_PERIOD) {
        break
      }
      numRequests++
    }
    assert.equal(numRequests, RATE_LIMIT_REQUESTS)
  })
})
