/* eslint-env serviceworker, browser */

import pAny from 'p-any'
import pMap from 'p-map'
import pSettle from 'p-settle'

import { getCidFromSubdomainUrl } from './utils/cid.js'
import { CIDS_TRACKER_ID, GENERIC_METRICS_ID } from './constants.js'

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

  const gatewayReqs = env.ipfsGateways.map((gwUrl) =>
    _gatewayFetch(gwUrl, cid, {
      pathname: reqUrl.pathname,
      timeout: env.REQUEST_TIMEOUT,
    })
  )

  try {
    /** @type {GatewayResponse} */
    const winnerGwResponse = await pAny(gatewayReqs, {
      filter: (res) => res.response.ok,
    })

    async function settleGatewayRequests() {
      // Wait for remaining responses
      const responses = await pSettle(gatewayReqs)
      const successFullResponses = responses.filter(
        (r) => r.value?.response?.ok
      )

      await Promise.all([
        // Filter out winner and update remaining gateway metrics
        pMap(
          responses.filter((r) => r.value?.url !== winnerGwResponse.url),
          (r) => updateGatewayMetrics(request, env, r.value, false)
        ),
        updateCidsTracker(request, env, successFullResponses, cid),
      ])
    }

    ctx.waitUntil(
      (async () => {
        await Promise.all([
          storeWinnerGwResponse(request, env, winnerGwResponse),
          settleGatewayRequests(),
        ])
      })()
    )

    // forward winner gateway response
    return winnerGwResponse.response
  } catch (err) {
    ctx.waitUntil(
      (async () => {
        // Update metrics as all requests failed
        const responses = await pSettle(gatewayReqs)
        await pMap(responses, (r) =>
          updateGatewayMetrics(request, env, r.value, false)
        )
      })()
    )

    throw err
  }
}

/**
 * Store metrics for winner gateway response
 *
 * @param {Request} request
 * @param {import('./env').Env} env
 * @param {GatewayResponse} winnerGwResponse
 */
async function storeWinnerGwResponse(request, env, winnerGwResponse) {
  await Promise.all([
    updateGatewayMetrics(request, env, winnerGwResponse, true),
    updateGenericMetrics(request, env, winnerGwResponse),
  ])
}

/**
 * Fetches given CID from given IPFS gateway URL.
 *
 * @param {string} gwUrl
 * @param {string} cid
 * @param {Object} [options]
 * @param {string} [options.pathname]
 * @param {number} [options.timeout]
 */
async function _gatewayFetch(
  gwUrl,
  cid,
  { pathname = '', timeout = 20000 } = {}
) {
  const ipfsUrl = new URL('ipfs', gwUrl)
  const controller = new AbortController()
  const startTs = Date.now()
  const timer = setTimeout(() => controller.abort(), timeout)

  let response
  try {
    response = await fetch(`${ipfsUrl.toString()}/${cid}${pathname}`, {
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timer)
  }

  // TODO: Is it rate limited?
  // how can we "suspend" this gateway for a bit? Maybe track this in a Durable Object?

  /** @type {GatewayResponse} */
  const gwResponse = {
    response,
    url: gwUrl,
    responseTime: Date.now() - startTs,
  }
  return gwResponse
}

/**
 * @param {Request} request
 * @param {import('./env').Env} env
 * @param {GatewayResponse} gwResponse
 */
async function updateGenericMetrics(request, env, gwResponse) {
  // Get durable object for gateway
  const id = env.genericMetricsDurable.idFromName(GENERIC_METRICS_ID)
  const stub = env.genericMetricsDurable.get(id)

  /** @type {import('./durable-objects/gateway-metrics').ResponseStats} */
  const responseStats = {
    ok: gwResponse.response.ok,
    responseTime: gwResponse.responseTime,
  }

  await stub.fetch(_getUpdateRequestUrl(request, responseStats))
}

/**
 * @param {Request} request
 * @param {import('./env').Env} env
 * @param {GatewayResponse} gwResponse
 * @param {boolean} [isWinner = false]
 */
async function updateGatewayMetrics(
  request,
  env,
  gwResponse,
  isWinner = false
) {
  // Get durable object for gateway
  const id = env.gatewayMetricsDurable.idFromName(gwResponse.url)
  const stub = env.gatewayMetricsDurable.get(id)

  /** @type {import('./durable-objects/gateway-metrics').ResponseStats} */
  const responseStats = {
    ok: gwResponse.response.ok,
    responseTime: gwResponse.responseTime,
    winner: isWinner,
  }

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
