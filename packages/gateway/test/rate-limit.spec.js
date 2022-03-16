import test from 'ava'

import { GATEWAY_RATE_LIMIT_ID } from '../src/constants.js'
import { gateways } from './constants.js'
import { getMiniflare, getGatewayRateLimitsName } from './utils.js'

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  t.context = {
    mf: getMiniflare(),
  }
})

test('Receives falsy on should block when not on high load', async (t) => {
  const { mf } = t.context
  const cid = 'bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq'

  const p = await mf.dispatchFetch(`https://${cid}.ipfs.localhost:8787`)
  await p.waitUntil()

  const ns = await mf.getDurableObjectNamespace(getGatewayRateLimitsName())
  const id = ns.idFromName(GATEWAY_RATE_LIMIT_ID)
  const stub = ns.get(id)
  const doRes = await stub.fetch(`http://localhost:8787/request`)

  const rateLimitResponse = await doRes.json()
  t.falsy(rateLimitResponse.shouldBlock)
})

test('Receives should block when load reaches the RATE_LIMIT_REQUESTS', async (t) => {
  const { mf } = t.context
  const cid = 'bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq'

  const ns = await mf.getDurableObjectNamespace(getGatewayRateLimitsName())
  const id = ns.idFromName(GATEWAY_RATE_LIMIT_ID)
  const stub = ns.get(id)
  await Promise.all(
    Array.from({ length: 100 }, (_, i) =>
      stub.fetch(`http://localhost:8787/request`)
    )
  )

  const doRes = await stub.fetch(`http://localhost:8787/request`)

  const shouldPreventRateLimit = await doRes.json()
  t.truthy(shouldPreventRateLimit[gateways[0]])

  const p = await mf.dispatchFetch(`https://${cid}.ipfs.localhost:8787`)
  await p.waitUntil()

  const response = await mf.dispatchFetch('http://localhost:8787/metrics')
  const metricsResponse = await response.text()

  t.is(
    metricsResponse.includes(
      `_prevented_requests_by_reason_total{gateway="${gateways[0]}",env="test",reason="RATE_LIMIT"} 1`
    ),
    true
  )
})
