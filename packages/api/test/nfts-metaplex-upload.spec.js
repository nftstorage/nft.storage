import test from 'ava'
import { createClientWithUser, getRawClient } from './scripts/helpers.js'
import { fixtures } from './scripts/fixtures.js'
import { createCar } from './scripts/car.js'
import {
  getMiniflareContext,
  getTestServiceConfig,
  setupMiniflareContext,
} from './scripts/test-context.js'

/** @type {number} */
let metaplexUserId

test.before(async (t) => {
  await setupMiniflareContext(t)

  const config = getTestServiceConfig(t)
  const rawClient = getRawClient(config)

  const { data } = await rawClient
    .from('auth_key')
    .select('*')
    .eq('secret', 'metaplex-test-token')
    .single()

  metaplexUserId = data.id
})

test('should upload a single CAR file with a CID-specific token', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  const { root, car } = await createCar('hello world car')
  // expected CID for the above data
  const cid = 'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
  t.is(root.toString(), cid, 'car file has correct root')

  const fixture = fixtures.metaplexAuth.v1[cid]
  t.not(fixture, null, 'no fixture for cid ' + cid)

  const res = await mf.dispatchFetch('http://miniflare.test/metaplex/upload', {
    method: 'POST',
    headers: {
      'x-web3auth': `Metaplex ${fixture.token}`,
      'Content-Type': 'application/car',
    },
    body: car,
  })

  t.truthy(res, 'Server responded')
  t.true(res.ok, `response error: ${res.status}`)
  const { ok, value } = await res.json()
  t.truthy(ok, 'Server response payload has `ok` property')
  t.is(value.cid, cid, 'Server responded with expected CID')
  t.is(value.type, 'application/car', 'type should match blob mime-type')

  const { data } = await getRawClient(config)
    .from('upload')
    .select('*, content(*)')
    .match({ source_cid: cid, user_id: metaplexUserId })
    .single()

  // @ts-ignore
  t.is(data.source_cid, cid)
  t.is(data.deleted_at, null)
  t.is(data.content.dag_size, 15, 'correct dag size')

  const expectedMeta = {
    iss: fixture.meta.iss,
    rootCID: fixture.meta.req.put.rootCID,
    solanaCluster: fixture.meta.req.put.tags.solanaCluster,
    mintingAgent: fixture.meta.req.put.tags.mintingAgent,
    agentVersion: fixture.meta.req.put.tags.agentVersion,
  }
  t.deepEqual(data.meta, expectedMeta, 'metadata matches jwt payload')
})

test.serial('should support payloads without mintingAgent tag', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  const { root, car } = await createCar('hello world car')
  // expected CID for the above data
  const cid = 'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
  t.is(root.toString(), cid, 'car file has correct root')

  const fixture = fixtures.metaplexAuth.v0[cid]
  t.not(fixture, null, 'no fixture for cid ' + cid)

  const res = await mf.dispatchFetch('http://miniflare.test/metaplex/upload', {
    method: 'POST',
    headers: {
      'x-web3auth': `Metaplex ${fixture.token}`,
      'Content-Type': 'application/car',
    },
    body: car,
  })

  t.truthy(res, 'Server responded')
  t.true(res.ok, 'Server response ok')
  const { ok, value } = await res.json()
  t.truthy(ok, 'Server response payload has `ok` property')
  t.is(value.cid, cid, 'Server responded with expected CID')
  t.is(value.type, 'application/car', 'type should match blob mime-type')

  const { data } = await getRawClient(config)
    .from('upload')
    .select('*, content(*)')
    .match({ source_cid: cid, user_id: metaplexUserId })
    .single()

  // @ts-ignore
  t.is(data.source_cid, cid)
  t.is(data.deleted_at, null)
  t.is(data.content.dag_size, 15, 'correct dag size')

  const expectedMeta = {
    iss: fixture.meta.iss,
    rootCID: fixture.meta.req.put.rootCID,
    solanaCluster: fixture.meta.req.put.tags['solana-cluster'],
    mintingAgent: 'unknown',
  }
  t.deepEqual(data.meta, expectedMeta, 'metadata matches jwt payload')
})

test.serial('should fail if token has an invalid signature', async (t) => {
  const mf = getMiniflareContext(t)
  const { root, car } = await createCar('hello world car')
  // expected CID for the above data
  const cid = 'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
  t.is(root.toString(), cid, 'car file has correct root')

  const fixture = fixtures.metaplexAuth.v1[cid]
  t.not(fixture, null, 'no fixture for cid ' + cid)

  const tokenParts = fixture.token.split('.')
  tokenParts[2] = tokenParts[2].replace('0', '1')
  const alteredToken = tokenParts.join('.')

  const res = await mf.dispatchFetch('http://miniflare.test/metaplex/upload', {
    method: 'POST',
    headers: {
      'x-web3auth': `Metaplex ${alteredToken}`,
      'Content-Type': 'application/car',
    },
    body: car,
  })

  t.truthy(res, 'Server responded')
  t.is(
    res.status,
    401,
    `expected 401 response, got [${res.status}]: ${
      res.statusText
    } ${await res.text()}`
  )
})

test.serial('should fail if token payload is modified', async (t) => {
  const mf = getMiniflareContext(t)
  const { root, car } = await createCar('hello world car')
  // expected CID for the above data
  const cid = 'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
  t.is(root.toString(), cid, 'car file has correct root')

  const fixture = fixtures.metaplexAuth.v1[cid]
  t.not(fixture, null, 'no fixture for cid ' + cid)

  const tokenParts = fixture.token.split('.')
  tokenParts[1] = tokenParts[1].replace('0', '1')
  const alteredToken = tokenParts.join('.')

  const res = await mf.dispatchFetch('http://miniflare.test/metaplex/upload', {
    method: 'POST',
    headers: {
      'x-web3auth': `Metaplex ${alteredToken}`,
      'Content-Type': 'application/car',
    },
    body: car,
  })

  t.truthy(res, 'Server responded')
  t.is(res.status, 401, 'Expected auth error, but response was ok')
})

test.serial(
  'should fail if uploaded CAR has different CID than specified in token',
  async (t) => {
    const mf = getMiniflareContext(t)
    // cid for the "hello world car". we have a valid token saved for this CID as a fixture
    const signedCID =
      'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
    const fixture = fixtures.metaplexAuth.v1[signedCID]
    t.not(fixture, null, 'no fixture for cid ' + signedCID)

    const { root, car } = await createCar('a different car')
    t.not(root.toString(), signedCID)

    const res = await mf.dispatchFetch(
      'http://localhost:8787/metaplex/upload',
      {
        method: 'POST',
        headers: {
          'x-web3auth': `Metaplex ${fixture.token}`,
          'Content-Type': 'application/car',
        },
        body: car,
      }
    )

    t.truthy(res, 'Server responded')
    t.is(res.status, 401, 'Expected auth error, but response was ok')
  }
)
