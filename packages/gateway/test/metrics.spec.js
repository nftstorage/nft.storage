import test from 'ava'

import { gateways } from './constants.js'
import { getMiniflare, getSummaryMetricsName } from './utils.js'

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
    metricsResponse.includes(
      'nftgateway_summary_responses_total{env="test"} 0'
    ),
    true
  )
  t.is(
    metricsResponse.includes(
      'nftgateway_cache_hit_responses_total{env="test"} 0'
    ),
    true
  )
  t.is(
    metricsResponse.includes('nftgateway_winner_requests_total{env="test"} 0'),
    true
  )
  t.is(
    metricsResponse.includes('nftgateway_winner_response_time_seconds_total'),
    true
  )
  t.is(metricsResponse.includes(`_responses_content_length_total{le=`), true)
  t.is(
    metricsResponse.includes(
      `_responses_content_length_bytes_total{env="test"} 0`
    ),
    true
  )
  gateways.forEach((gw) => {
    t.is(
      metricsResponse.includes(`_requests_total{gateway="${gw}",env="test"} 0`),
      true
    )
    t.is(
      metricsResponse.includes(
        `_response_time_seconds_total{gateway="${gw}",env="test"}`
      ),
      true
    )
    t.is(
      metricsResponse.includes(
        `_failed_requests_total{gateway="${gw}",env="test"} 0`
      ),
      true
    )
    t.is(
      metricsResponse.includes(
        `_winner_requests_total{gateway="${gw}",env="test"} 0`
      ),
      true
    )
    t.is(
      metricsResponse.includes(`requests_per_time_total{gateway="${gw}",le=`),
      true
    )
  })
})

test('Gets Metrics content', async (t) => {
  const { mf } = t.context

  // Get Durable object current state
  const ns = await mf.getDurableObjectNamespace(getSummaryMetricsName())
  const id = ns.idFromName('summary-metrics')
  const stub = ns.get(id)
  const doRes = await stub.fetch(`http://localhost:8787/metrics`)

  const doMetrics = await doRes.json()
  t.is(doMetrics.totalContentLengthBytes, '0')
  t.is(doMetrics.contentLengthHistogram['524288'], 0)

  // Trigger two requests with content length of 23 each
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

  t.is(
    metricsResponse.includes(
      `_responses_content_length_total{le="524288",env="test"} 2`
    ),
    true
  )
  t.is(
    metricsResponse.includes(
      `_responses_content_length_bytes_total{env="test"} 46`
    ),
    true
  )

  gateways.forEach((gw) => {
    t.is(
      metricsResponse.includes(`_requests_total{gateway="${gw}",env="test"} 2`),
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
      metricsResponse.includes(`_requests_total{gateway="${gw}",env="test"} 2`),
      true
    )
  })

  // gateways[0] or gateways[1] are always faster
  t.is(
    metricsResponse.includes(
      `_winner_requests_total{gateway="${gateways[2]}",env="test"} 0`
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
      `_requests_total{gateway="${gateways[2]}",env="test"} 2`
    ),
    true
  )
  t.is(
    metricsResponse.includes(
      `_failed_requests_total{gateway="${gateways[2]}",env="test"} 2`
    ),
    true
  )
  t.is(
    metricsResponse.includes(
      `_requests_by_status_total{gateway="${gateways[2]}",env="test",status="524"} 2`
    ),
    true
  )
})
