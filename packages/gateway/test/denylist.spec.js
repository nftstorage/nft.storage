import test from 'ava'
import { getMiniflare } from './utils.js'
import { toDenyListAnchor } from '../src/utils/deny-list.js'

test.beforeEach((t) => {
  t.context = { mf: getMiniflare() }
})

test('Blocks access to a CID on the deny list', async (t) => {
  /** @type {{ mf: import('miniflare').Miniflare }} */
  const { mf } = t.context
  const cid = 'bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq'

  // add the CID to the deny list
  const denyListKv = await mf.getKVNamespace('DENYLIST')
  const anchor = await toDenyListAnchor(cid)

  await denyListKv.put(anchor, '{}')

  const res = await mf.dispatchFetch(`https://${cid}.ipfs.localhost:8787`)
  t.is(res.status, 410)
  t.is(await res.text(), '')
})

test('Blocks access to a CID on the deny list with custom status and reason', async (t) => {
  /** @type {{ mf: import('miniflare').Miniflare }} */
  const { mf } = t.context
  const cid = 'bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq'

  // add the CID to the deny list
  const denyListKv = await mf.getKVNamespace('DENYLIST')
  const anchor = await toDenyListAnchor(cid)

  // 451: Unavailable For Legal Reasons
  await denyListKv.put(anchor, JSON.stringify({ status: 451, reason: 'bad' }))

  const res = await mf.dispatchFetch(`https://${cid}.ipfs.localhost:8787`)
  t.is(res.status, 451)
  t.is(await res.text(), 'bad')
})
