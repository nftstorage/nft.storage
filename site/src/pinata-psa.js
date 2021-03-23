import { pinata } from './constants.js'
import { JSONResponse } from './utils/json-response.js'

const endpoint = new URL('https://api.pinata.cloud/psa/')
const headers = { authorization: `Bearer ${pinata.jwt}`, 'Content-Type': 'application/json' }

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
  const url = new URL('pins', endpoint).toString()
  const body = JSON.stringify({ cid, name, origins, meta })
  const res = await fetch(url, { method: 'POST', headers, body })
  return res.ok ? { ok: true, value: await res.json() } : { ok: false, error: res }
}

/**
 * @param {string} requestid 
 * @returns {Promise<{ok: true, value: PinStatus}|ErrorResponse>}
 */
export async function pinsGet (requestid) {
  const url = new URL(`pins/${encodeURIComponent(requestid)}`, endpoint)
  const res = await fetch(url.toString(), { method: 'GET', headers })
  return res.ok ? { ok: true, value: await res.json() } : { ok: false, error: res }
}

/**
 * @param {{
 *  cid?: string,
 *  name?: string,
 *  match?: string,
 *  status?: string,
 *  before?: string,
 *  after?: string,
 *  limit?: string,
 *  meta?: string
 * }} params
 * @returns {Promise<{ok: true, value: { count: number, results: Array<PinStatus> }}|ErrorResponse>}
 */
 export async function pinsList (params) {
  const url = new URL(`pins?${new URLSearchParams(params)}`, endpoint)
  const res = await fetch(url.toString(), { method: 'GET', headers })
  return res.ok ? { ok: true, value: await res.json() } : { ok: false, error: res }
}

/**
 * @param {string} requestid
 * @param {{ cid: string, name?: string, origins?: string[], meta?: any }} params
 * @returns {Promise<{ok: true, value: PinStatus}|ErrorResponse>}
 */
 export async function pinsReplace (requestid, { cid, name, origins, meta }) {
  const url = new URL(`pins/${encodeURIComponent(requestid)}`, endpoint).toString()
  const body = JSON.stringify({ cid, name, origins, meta })
  const res = await fetch(url, { method: 'POST', headers, body })
  return res.ok ? { ok: true, value: await res.json() } : { ok: false, error: res }
}

/**
 * @param {string} requestid
 * @returns {Promise<{ok: true}|ErrorResponse>}
 */
 export async function pinsDelete (requestid) {
  const url = new URL(`pins/${encodeURIComponent(requestid)}`, endpoint).toString()
  const res = await fetch(url, { method: 'DELETE', headers })
  return res.ok ? { ok: true } : { ok: false, error: res }
}

/**
 * Takes a "not ok" response from Pinata and creates a new JSONResponse.
 * @param {Response} res
 * @returns {Promise<JSONResponse>}
 */
export async function parseErrorResponse (res) {
  let text
  try {
    text = await res.text()
    return new JSONResponse(JSON.parse(text), { status: res.status })
  } catch (_) {
    return new JSONResponse({ error: { reason: 'INVALID_UPSTREAM_RESPONSE', details: `invalid upstream response ${res.status}: ${text}` } }, { status: 500 })
  }
}
