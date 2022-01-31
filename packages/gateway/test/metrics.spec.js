import test from 'ava'

import { gateways } from './constants.js'
import { getMiniflare } from './utils.js'

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  t.context = {
    mf: getMiniflare(),
  }
})

test('Gets Metrics content when empty state', async (t) => {
  const { mf } = t.context

  const response = await mf.dispatchFetch('http://localhost:8787/metrics')
  const metricsResponse = await response.text()

  t.is(
    metricsResponse.includes('nftstorage_gateway_total_winner_response_time'),
    true
  )
  t.is(
    metricsResponse.includes(
      'nftstorage_gateway_total_winner_successful_requests'
    ),
    true
  )
  gateways.forEach((gw) => {
    t.is(
      metricsResponse.includes(`_total_requests{gateway="${gw}",env="test"} 0`),
      true
    )
    t.is(
      metricsResponse.includes(
        `_total_response_time{gateway="${gw}",env="test"}`
      ),
      true
    )
    t.is(
      metricsResponse.includes(
        `_total_failed_requests{gateway="${gw}",env="test"} 0`
      ),
      true
    )
    t.is(
      metricsResponse.includes(
        `_total_faster_requests{gateway="${gw}",env="test"} 0`
      ),
      true
    )
    t.is(
      metricsResponse.includes(`_requests_per_time{gateway="${gw}",le=`),
      true
    )
  })
})

test('Gets Metrics content', async (t) => {
  const { mf } = t.context

  // Trigger two requests
  const p = await Promise.all([
    mf.dispatchFetch(
      'http://bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq.ipfs.localhost:8787'
    ),
    mf.dispatchFetch(
      'http://bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq.ipfs.localhost:8787'
    ),
  ])

  // Wait for waitUntil
  await Promise.all(p.map((p) => p.waitUntil()))

  const response = await mf.dispatchFetch('http://localhost:8787/metrics')
  const metricsResponse = await response.text()

  gateways.forEach((gw) => {
    t.is(
      metricsResponse.includes(`_total_requests{gateway="${gw}",env="test"} 2`),
      true
    )
  })
})

test('Gets Metrics from faster gateway', async (t) => {
  const { mf } = t.context

  // Trigger two requests for a CID where gateways[0] is faster
  const p = await Promise.all([
    mf.dispatchFetch(
      'http://bafkreibxkbyybantsznyvlq2bhf24u4gew7pj6erjgduqp4mvqv54qjng4.ipfs.localhost:8787'
    ),
    mf.dispatchFetch(
      'http://bafkreibxkbyybantsznyvlq2bhf24u4gew7pj6erjgduqp4mvqv54qjng4.ipfs.localhost:8787'
    ),
  ])

  // Wait for waitUntil
  await Promise.all(p.map((p) => p.waitUntil()))

  const response = await mf.dispatchFetch('http://localhost:8787/metrics')
  const metricsResponse = await response.text()

  gateways.forEach((gw) => {
    t.is(
      metricsResponse.includes(`_total_requests{gateway="${gw}",env="test"} 2`),
      true
    )
  })

  // gateways[0] or gateways[1] are always faster
  t.is(
    metricsResponse.includes(
      `_total_faster_requests{gateway="${gateways[2]}",env="test"} 0`
    ),
    true
  )
})

test('Counts failures', async (t) => {
  const { mf } = t.context

  // Trigger two requests for a CID where gateways[1] fails
  const p = await Promise.all([
    mf.dispatchFetch(
      'http://bafkreihbjbbccwxn7hzv5hun5pxuswide7q3lhjvfbvmd7r3kf2sodybgi.ipfs.localhost:8787'
    ),
    mf.dispatchFetch(
      'http://bafkreihbjbbccwxn7hzv5hun5pxuswide7q3lhjvfbvmd7r3kf2sodybgi.ipfs.localhost:8787'
    ),
  ])

  // Wait for waitUntil
  await Promise.all(p.map((p) => p.waitUntil()))

  const response = await mf.dispatchFetch('http://localhost:8787/metrics')
  const metricsResponse = await response.text()

  t.is(
    metricsResponse.includes(
      `_total_requests{gateway="${gateways[2]}",env="test"} 2`
    ),
    true
  )
  t.is(
    metricsResponse.includes(
      `_total_failed_requests{gateway="${gateways[2]}",env="test"} 2`
    ),
    true
  )
})
