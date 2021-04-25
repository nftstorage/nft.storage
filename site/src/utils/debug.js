const _debug = require('debug')
_debug.enable(DEBUG)

/**
 * @param {string} name
 */
export function debug(name) {
  return _debug(name)
}
