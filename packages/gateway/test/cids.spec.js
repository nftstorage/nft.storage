import test from 'ava'

import { gateways } from './constants.js'
import { getMiniflare, getCIDsTrackerName } from './utils.js'

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  t.context = {
    mf: getMiniflare(),
  }
})

test('Sets gateways that resolved cid', async (t) => {
  const { mf } = t.context
  const cid = 'bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq'

  const p = await mf.dispatchFetch(`https://${cid}.ipfs.localhost:8787`)
  await p.waitUntil()

  const ns = await mf.getDurableObjectNamespace(getCIDsTrackerName())
  const id = ns.idFromName('cids')
  const stub = ns.get(id)
  const doRes = await stub.fetch(`http://localhost:8787/status/${cid}`)

  const gatewaysWithCid = await doRes.json()

  t.truthy(gateways.length === gatewaysWithCid.length)
  gatewaysWithCid.forEach((gw) => {
    t.truthy(gateways.includes(gw))
  })
})

test('Only sets gateways that resolved cid successfully', async (t) => {
  const { mf } = t.context
  const cid = 'bafkreihbjbbccwxn7hzv5hun5pxuswide7q3lhjvfbvmd7r3kf2sodybgi'

  // gateways[2] fails
  const p = await mf.dispatchFetch(`https://${cid}.ipfs.localhost:8787`)
  await p.waitUntil()

  const ns = await mf.getDurableObjectNamespace(getCIDsTrackerName())
  const id = ns.idFromName('cids')
  const stub = ns.get(id)
  const doRes = await stub.fetch(`http://localhost:8787/status/${cid}`)

  const gatewaysWithCid = await doRes.json()

  t.falsy(gateways.length === gatewaysWithCid.length)
  t.truthy(gatewaysWithCid.includes(gateways[0]))
  t.truthy(gatewaysWithCid.includes(gateways[1]))
  t.falsy(gatewaysWithCid.includes(gateways[2]))
})
