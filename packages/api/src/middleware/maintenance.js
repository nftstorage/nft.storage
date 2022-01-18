import { ErrorMaintenance, HTTPError } from '../errors.js'

/**
 * @typedef {'rw' | 'r-' | '--'} Mode
 * @typedef {import('../bindings').Handler} Handler
 */

/**
 * Read and write.
 */
export const READ_WRITE = 'rw'

/**
 * Read only mode.
 */
export const READ_ONLY = 'r-'

/**
 * No reading or writing.
 */
export const NO_READ_OR_WRITE = '--'

/** @type {readonly Mode[]} */
export const modes = Object.freeze([NO_READ_OR_WRITE, READ_ONLY, READ_WRITE])

/**
 * The default maintenance mode (normal operation).
 */
export const DEFAULT_MODE = READ_WRITE

/** @type {() => Mode} */
let getMaintenanceMode = () => DEFAULT_MODE

/**
 * Sets the function that returns the current maintenance mode. This allows us
 * to pass a function that accesses a global variable. Cloudflare secrets are
 * exposed as global variables so this is the way to dynamically access them.
 *
 * The return value from the getter function dictates which request handlers
 * (that have been wrapped with `withMode`) are enabled. The returned value is
 * one of:
 *
 * -- = no reading or writing
 * r- = read only mode
 * rw = read and write (normal operation)
 *
 * @param {() => Mode} getter
 */
export function setMaintenanceModeGetter(getter) {
  getMaintenanceMode = getter
}

/**
 * Specify the mode (permissions) a request hander requires to operate e.g.
 * r- = only needs read permission so enabled in read-only AND read+write modes.
 * rw = needs to read and write so only enabled in read+write mode.
 *
 * @param {Handler} handler
 * @param {Mode} mode
 * @returns {Handler}
 */
export function withMode(handler, mode) {
  if (mode === NO_READ_OR_WRITE) {
    throw new Error('invalid mode')
  }
  const enabled = () => {
    const currentMode = getMaintenanceMode()
    const currentModeBits = modeBits(currentMode)
    return modeBits(mode).every((bit, i) => {
      if (bit === '-') return true
      return currentModeBits[i] === bit
    })
  }
  return (...args) => (enabled() ? handler(...args) : maintenanceHandler())
}

/**
 * @param {any} m
 * @returns {string[]}
 */
function modeBits(m) {
  if (!modes.includes(m)) {
    throw new HTTPError(
      `invalid maintenance mode, wanted one of ${modes} but got "${m}"`,
      503
    )
  }
  return m.split('')
}

/**
 * @returns {never}
 */
function maintenanceHandler() {
  throw new ErrorMaintenance()
}
