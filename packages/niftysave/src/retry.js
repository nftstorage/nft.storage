/**
 *
 * @typedef {{
 *   attempt: number
 *   error: Error
 *   startTime: number
 *   policy: Policy
 * }} RetryState
 * @typedef {(state:RetryState) => number} Policy
 */

/**
 * @typedef {{
 *   startTime: number
 *   error: Error
 *   attempt: number
 *   policy: RetryPolicy
 * }} State
 *

 * @typedef {(state:State) => RetryPolicy|Promise<RetryPolicy>} RetryPolicy
 */

/**
 * @template T
 * @param {() => Promise<T>} task
 * @param {Policy[]} policies
 * @returns {Promise<T>}
 */
export const retry = async (task, policies = []) => {
  const startTime = Date.now()
  let attempt = 0
  while (true) {
    attempt++
    try {
      return await task()
    } catch (error) {
      let pauseDuration = 0
      for (const policy of policies) {
        pauseDuration += policy({ startTime, attempt, policy, error })

        if (pauseDuration >= Infinity) {
          throw error
        }
      }

      if (pauseDuration > 0) {
        await new Promise((resume) => setTimeout(resume, pauseDuration))
      }
    }
  }
}

/**
 * Stop retrying `task` after a number of retries.
 * Note: The code above does NOT sleep between retries, it is best to combine
 * it with `constantInterval` or `exponentialBackoff`.
 *
 * @example
 * ```js
 * retry(() => fetch(url), [maxRetries(20)])
 * ```
 *
 * @param {number} n
 * @returns {Policy}
 */
export const maxRetries =
  (n) =>
  ({ attempt }) =>
    attempt >= n ? Infinity : 0

/**
 * Stop retrying `task` after some number of milliseconds.
 * Note: The code above does NOT sleep between retries, it is best to combine
 * it with `constantInterval` or `exponentialBackoff`.
 *
 * @example
 * ```js
 * retry(() => fetch(url), [maxDuration(7000)])
 * ```
 *
 * @param {number} duration
 * @returns {Policy}
 */
export const maxDuration =
  (duration) =>
  ({ startTime }) =>
    Date.now() - startTime >= duration ? Infinity : 0

/**
 * Sleep for the same number of milliseconds before every retry.
 * Note: The code above will keep retrying `task` and never give up, it is best
 * to combine with `maxRetries` or `maxDuration` to allow it to fail.
 *
 * @example
 * ```js
 * retry(() => fetch(url), [constantBackoff(1000)])
 * ```
 *
 * @param {number} duration
 * @returns {Policy}
 */
export const constantBackoff = (duration) => () => duration

/**
 * Uses exponential backoff algorithm to space out retries. On each attempt
 * sleep frame is increased in which random slot is picked which reduces
 * chance of collisions. If `maxInterval` is provided sleep frame is not going
 * to increas beyond it.
 *
 * @see https://en.wikipedia.org/wiki/Exponential_backoff
 * @example
 * ```js
 * retry(() => fetch(url), [exponentialBackoff(1000, 30 * 60 * 1000)])
 * ```
 *
 * @param {number} interval
 * @param {number} maxInterval
 * @returns {Policy}
 */
export const exponentialBackoff =
  (interval, maxInterval = Infinity) =>
  ({ attempt }) =>
    Math.min(backoff(attempt, interval), maxInterval)

/**
 * @param {number} multiplier
 * @param {number} attempt
 */
const backoff = (attempt, multiplier = 1.5) => {
  const max = Math.pow(2, attempt) - 1
  const k = Math.random() * max
  return k * multiplier
}
