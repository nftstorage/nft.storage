/* eslint-env serviceworker, browser */

import pAny from 'p-any'
import pSettle from 'p-settle'

import { getCidFromSubdomainUrl } from './utils/cid.js'

const METRICS_ID = 'metrics'
const CIDS_TRACKER_ID = 'cids'

/**
 * @typedef {Object} GatewayResponse
 * @property {Response} response
 * @property {string} url
 * @property {number} responseTime
 */

/**
 * Handle gateway request
 *
 * @param {Request} request
 * @param {import('./env').Env} env
 * @param {import('./index').Ctx} ctx
 */
export async function gatewayGet(request, env, ctx) {
  const reqUrl = new URL(request.url)
  const cid = getCidFromSubdomainUrl(reqUrl)

  const gatewayReqs = env.ipfsGateways.map(async (url, index) => {
    const ipfsUrl = new URL('ipfs', url)
    const controller = new AbortController()
    const startTs = Date.now()
    const timer = setTimeout(() => controller.abort(), env.REQUEST_TIMEOUT)

    let response
    try {
      response = await fetch(
        `${ipfsUrl.toString()}/${cid}${reqUrl.pathname || ''}`,
        { signal: controller.signal }
      )
    } finally {
      clearTimeout(timer)
    }

    /** @type {GatewayResponse} */
    const gwResponse = {
      response,
      url,
      responseTime: Date.now() - startTs,
    }
    return gwResponse
  })

  try {
    const { response, url } = await pAny(gatewayReqs)

    ctx.waitUntil(
      (async () => {
        const responses = await pSettle(gatewayReqs)
        const successFullResponses = responses.filter(
          (r) => r.value?.response?.ok
        )

        await Promise.all([
          updateMetrics(request, env, responses, url),
          updateCidsTracker(request, env, successFullResponses, cid),
        ])
      })()
    )

    // forward gateway response
    return response
  } catch (err) {
    ctx.waitUntil(
      (async () => {
        // Update metrics as all requests failed
        const responses = await pSettle(gatewayReqs)
        await updateMetrics(request, env, responses)
      })()
    )

    throw err
  }
}

/**
 * @param {Request} request
 * @param {import('./env').Env} env
 * @param {pSettle.PromiseResult<GatewayResponse>[]} responses
 * @param {string} [fasterUrl]
 */
async function updateMetrics(request, env, responses, fasterUrl) {
  const id = env.metricsDurable.idFromName(METRICS_ID)
  const stub = env.metricsDurable.get(id)

  /** @type {import('./durable-objects/metrics').ResponseStats[]} */
  const responseStats = responses.map((r) => ({
    ok: r?.value?.response?.ok,
    url: r?.value?.url,
    responseTime: r?.value?.responseTime,
    faster: fasterUrl === r?.value?.url,
  }))

  await stub.fetch(_getUpdateRequestUrl(request, responseStats))
}

/**
 * @param {Request} request
 * @param {import('./env').Env} env
 * @param {pSettle.PromiseResult<GatewayResponse>[]} responses
 * @param {string} cid
 */
async function updateCidsTracker(request, env, responses, cid) {
  const id = env.cidsTrackerDurable.idFromName(CIDS_TRACKER_ID)
  const stub = env.cidsTrackerDurable.get(id)

  /** @type {import('./durable-objects/cids').CidUpdateRequest} */
  const updateRequest = {
    cid,
    urls: responses.filter((r) => r.isFulfilled).map((r) => r?.value?.url),
  }

  await stub.fetch(_getUpdateRequestUrl(request, updateRequest))
}

/**
 * Get a Request to update a durable object
 *
 * @param {Request} request
 * @param {Object} data
 */
function _getUpdateRequestUrl(request, data) {
  const reqUrl = new URL(
    'update',
    request.url.startsWith('http') ? request.url : `http://${request.url}`
  )
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  return new Request(reqUrl.toString(), {
    headers,
    method: 'PUT',
    body: JSON.stringify(data),
  })
}
