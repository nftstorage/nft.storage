import * as Result from '../result.js'

/**
 * @template T
 * @implements {Result.Success<T>}
 * @implements {Iterator<never, T, void>}
 */
class Ok {
  /**
   *
   * @param {T} value
   */
  constructor(value) {
    /** @type {true} */
    this.ok = true
    this.value = value
    /** @type {true} */
    this.done = true
  }

  next() {
    return this
  }

  [Symbol.iterator]() {
    return this
  }
}

/**
 * @template X
 * @implements {Result.Failure<X>}
 * @implements {Iterator<never, never, void>}
 */
class Error {
  /**
   * @param {X} error
   */
  constructor(error) {
    this.error = error
    /** @type {true} */
    this.done = true
    /** @type {false} */
    this.ok = false
  }
  /**
   * @returns {never}
   */
  next() {
    throw this.error
  }
  [Symbol.iterator]() {
    return this
  }
}

/**
 * @template T
 * @param {T} value
 * @returns {Result.Result<never, T>}
 */
export const ok = (value) => new Ok(value)

/**
 * @template X
 * @param {X} error
 * @returns {Result.Result<X, never>}
 */
export const error = (error) => new Error(error)

/**
 * @template X, T
 * @param {Result.Result<X, T>} result
 * @returns {T}
 */
export const value = (result) => {
  if (result.ok) {
    return result.value
  } else {
    throw result.error
  }
}

/**
 * @template X, T
 * @param {Promise<T>} promise
 * @returns {Promise<Result.Result<X, T>>}
 */
export const fromPromise = (promise) => promise.then(ok).catch(error)

/**
 * @template X, T
 * @param {() => T} fn
 * @returns {Result.Result<X, T>}
 */
export const fromTry = (fn) => {
  try {
    return ok(fn())
  } catch (reason) {
    return error(reason)
  }
}
