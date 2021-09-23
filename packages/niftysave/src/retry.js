/**
 * @template {Error} X
 * @typedef {Object} Policy
 * @property {'Policy'} type
 * @property {(startTime:number, lastPolicy:Policy<X>, error:X) => Promise<Policy<X>>} nextPolicy
 */

/**
 * @template T
 * @param {Policy<Error>[]} policies
 * @param {() => Promise<T>} task
 * @returns {Promise<T>}
 */
export const retry = async (policies, task) => {
  const startTime = Date.now()
  while (true) {
    try {
      return await task()
    } catch (error) {
      const next = []
      for (const policy of policies) {
        next.push(await policy.nextPolicy(startTime, policy, error))
        policies = policies
      }
    }
  }
}

/**
 * Stop retrying `originalTask` after a number of retries.
 * Note: The code above does NOT sleep between retries, it is best to combine
 * it with `constantInterval` or `exponentialBackoff`.
 *
 * @example
 * ```js
 * retry([maxRetries(20)], () => fetch(url))
 * ```
 *
 * @template {Error} X
 * @param {number} n
 * @returns {Policy<X>}
 */
export const maxRetries = (n) => ({
  type: 'Policy',
  async nextPolicy(_startTime, _policy, lastError) {
    if (n <= 0) {
      throw lastError
    } else {
      return maxRetries(n - 1)
    }
  },
})

/**
 * Stop retrying `task` after some number of milliseconds.
 * Note: The code above does NOT sleep between retries, it is best to combine
 * it with `constantInterval` or `exponentialBackoff`.
 *
 * @example
 * ```js
 * retry([maxDuration(7000)],  () => fetch(url))
 * ```
 *
 * @template {Error} X
 * @param {number} duration
 * @returns {Policy<X>}
 */
export const maxDuration = (duration) => ({
  type: 'Policy',
  async nextPolicy(startTime, policy, error) {
    const now = Date.now()
    if (now - startTime >= duration) {
      throw error
    } else {
      return policy
    }
  },
})

/**
 * Sleep for the same number of milliseconds before every retry.
 * Note: The code above will keep retrying `task` and never give up, it is best
 * to combine with `maxRetries` or `maxDuration` to allow it to fail.
 *
 * @template {Error} X
 * @param {number} duration
 * @returns {Policy<X>}
 */
export const constantInterval = (duration) => ({
  type: 'Policy',
  async nextPolicy(_startTime, lastPolicy, _error) {
    await sleep(duration)
    return lastPolicy
  },
})

/**
 * @template {Error} X
 * @param {{interval:number, maxInterval:number}} options
 * @returns {Policy<X>}
 */
export const exponentialBackoff = ({ interval, maxInterval }) =>
  backoffWith(0, interval, maxInterval)

/**
 * @template {Error} X
 * @param {number} attempt
 * @param {number} interval
 * @param {number} maxInterval
 * @returns {Policy<X>}
 */
const backoffWith = (attempt, interval, maxInterval) => ({
  type: 'Policy',
  async nextPolicy(_startTime, _lastPolicy, _lastError) {
    const time = Math.min(backoff(attempt, interval), maxInterval)
    await sleep(time)
    return backoffWith(attempt + 1, interval, maxInterval)
  },
})

/**
 * @param {number} multiplier
 * @param {number} attempt
 */
const backoff = (attempt, multiplier = 1.5) => {
  const max = Math.pow(2, attempt) - 1
  const k = Math.random() * max
  return k * multiplier
}
