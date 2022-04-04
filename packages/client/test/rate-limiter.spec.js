/* eslint-env mocha */
import * as assert from 'uvu/assert'
import { createRateLimiter } from 'nft.storage'

// these must be the same as the values used by createRateLimiter
const RATE_LIMIT_REQUESTS = 30
const RATE_LIMIT_PERIOD = 10 * 1000

describe('rate limiter', () => {
  it('limits to correct rate', async function () {
    this.timeout(RATE_LIMIT_PERIOD * 2)
    const rateLimiter = createRateLimiter()
    const start = Date.now()
    // check how many times the rate limiter returns within the time period
    let numRequests = 0
    while (true) {
      await rateLimiter()
      // don't count if provided _after_ the period - it belongs to the next
      if (Date.now() - start > RATE_LIMIT_PERIOD) {
        break
      }
      numRequests++
    }
    assert.equal(numRequests, RATE_LIMIT_REQUESTS)
  })
})
