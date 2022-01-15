import { addCorsHeaders } from './cors.js'
import { errorHandler } from './error-handler.js'
import { getCidFromSubdomainUrl } from './utils/cid.js'

/**
 * @typedef {Object} Env
 * @property {string} IPFS_GATEWAY
 * @property {string} VERSION
 * @property {string} ENV
 * @property {string} [SENTRY_DSN]
 */

/**
 * Handle gateway request
 * @param {Request} request
 * @param {Env} env
 */
async function handleRequest(request, env) {
  const publicGatewayUrl = new URL('ipfs', env.IPFS_GATEWAY)
  const url = new URL(request.url)
  const cid = getCidFromSubdomainUrl(url)
  const response = await fetch(
    `${publicGatewayUrl}/${cid}${url.pathname || ''}`
  )

  // forward gateway response
  return addCorsHeaders(request, response)
}

/**
 * @param {Error} error
 * @param {Request} request
 * @param {Env} env
 */
function serverError(error, request, env) {
  return addCorsHeaders(request, errorHandler(error, request, env))
}

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env)
    } catch (error) {
      return serverError(error, request, env)
    }
  },
}
