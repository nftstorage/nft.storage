import { normalizeCid } from './utils/cid.js'

/**
 * Handle gateway request
 *
 * @param {Request} request
 * @param {import('./env').Env} env
 */
export async function ipfsGet(request, env) {
  const cid = request.params.cid
  const path = request.url.split(`/ipfs/${cid}`)[1] || ''

  // Parse and normalize CID
  const nCid = normalizeCid(cid)
  const url = `https://${nCid}.${env.GATEWAY_HOSTNAME}${path}`

  return Response.redirect(url, 302)
}
