import Toucan from 'toucan-js'
import pkg from '../package.json'

// TODO: Get Durable object typedef
/**
 * @typedef {Object} EnvInput
 * @property {string} IPFS_GATEWAYS
 * @property {string} VERSION
 * @property {string} ENV
 * @property {string} [SENTRY_DSN]
 * @property {number} [REQUEST_TIMEOUT]
 * @property {Object} METRICS
 * @property {Object} CIDSTRACKER
 *
 * @typedef {Object} EnvTransformed
 * @property {Array<string>} ipfsGateways
 * @property {Object} metricsDurable
 * @property {Object} cidsTrackerDurable
 * @property {number} REQUEST_TIMEOUT
 * @property {Toucan} [sentry]
 *
 * @typedef {EnvInput & EnvTransformed} Env
 */

/**
 * @param {Request} request
 * @param {Env} env
 */
export function envAll(request, env) {
  env.sentry = getSentry(request, env)
  env.ipfsGateways = JSON.parse(env.IPFS_GATEWAYS)
  env.metricsDurable = env.METRICS
  env.cidsTrackerDurable = env.CIDSTRACKER
  env.REQUEST_TIMEOUT = env.REQUEST_TIMEOUT || 20000
}

/**
 * Get sentry instance if configured
 *
 * @param {Request} request
 * @param {Env} env
 */
function getSentry(request, env) {
  if (!env.SENTRY_DSN) {
    return
  }

  return new Toucan({
    request,
    dsn: env.SENTRY_DSN,
    allowedHeaders: ['user-agent'],
    allowedSearchParams: /(.*)/,
    debug: false,
    environment: env.ENV || 'dev',
    rewriteFrames: {
      root: '/',
    },
    release: env.VERSION,
    pkg,
  })
}
