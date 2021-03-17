import { pinata } from './constants.js'

const endpoint = new URL('https://api.pinata.cloud/psa')

/**
 * @typedef {'queued'|'pinning'|'pinned'|'failed'} Status
 * @typedef {{ cid: string, name?: string, origins?: string[], meta?: any }} Pin
 * @typedef {{requestid: string, status: Status, created: string, pin: Pin, delegates: string[], info?: any }} PinStatus
 * @typedef {{ok: false, error: Response}} ErrorResponse
 */

/**
 * @param {{ cid: string, name?: string, origins?: string[], meta?: any }} params
 * @returns {Promise<{ok: true, value: PinStatus}|ErrorResponse>}
 */
export async function pinsAdd ({ cid, name, origins, meta }) {
  const response = await fetch(new URL('/pins', endpoint).toString(), {
    method: 'POST',
    headers: { authorization: `Bearer ${pinata.jwt}` },
    body: JSON.stringify({ cid, name, origins, meta })
  })
  return response.ok
    ? { ok: true, value: await response.json() }
    : { ok: false, error: response }
}

/**
 * @param {string} requestid 
 * @returns {Promise<{ok: true, value: PinStatus}|ErrorResponse>}
 */
export async function pinsGet (requestid) {
  const url = new URL(`/pins/${encodeURIComponent(requestid)}`, endpoint)
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: { authorization: `Bearer ${pinata.jwt}` }
  })
  return response.ok
    ? { ok: true, value: await response.json() }
    : { ok: false, error: response }
}
