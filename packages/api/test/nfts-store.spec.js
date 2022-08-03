import test from 'ava'
import { CID } from 'multiformats'
// @ts-ignore
import * as Token from 'nft.storage/src/token.js'
import { createTestUser, getRawClient } from './scripts/helpers.js'
import {
  getMiniflareContext,
  getTestServiceConfig,
  setupMiniflareContext,
} from './scripts/test-context.js'
import { File, Blob } from 'nft.storage/src/platform.js'

test.beforeEach(async (t) => {
  await setupMiniflareContext(t)
})

test('should store image', async (t) => {
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  const { token, userId } = await createTestUser(t)

  const trick =
    'ipfs://bafyreiemweb3jxougg7vaovg7wyiohwqszmgwry5xwitw3heepucg6vyd4'
  const metadata = {
    name: 'name',
    description: 'stuff',
    image: new File(['fake image'], 'cat.png', { type: 'image/png' }),
    properties: {
      extra: 'meta',
      trick,
      src: [
        new File(['hello'], 'hello.txt', { type: 'text/plain' }),
        new Blob(['bye']),
      ],
    },
  }
  const body = Token.encode(metadata)

  const res = await mf.dispatchFetch('http://miniflare.test/store', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body,
  })
  t.truthy(res, 'Server responded')
  t.true(res.ok, 'Server response ok')
  const { ok, value } = await res.json()
  const result = value
  const cid = CID.parse(result.ipnft)
  t.is(cid.version, 1)

  t.deepEqual(
    result,
    {
      ipnft: 'bafyreicnwbboevx6g6fykitf4nebz2kqgkqz35qvlnlcgfulhrris66m6i',
      url: 'ipfs://bafyreicnwbboevx6g6fykitf4nebz2kqgkqz35qvlnlcgfulhrris66m6i/metadata.json',
      data: {
        name: 'name',
        description: 'stuff',
        properties: {
          extra: 'meta',
          trick:
            'ipfs://bafyreiemweb3jxougg7vaovg7wyiohwqszmgwry5xwitw3heepucg6vyd4',
          src: [
            'ipfs://bafybeifvbzj3rk2unsdhbq6wisbcblekwf2pjpgjmppv6ejplsyyhdn4ym/hello.txt',
            'ipfs://bafybeibgaiw7jgzvbgjk3xu26scmbzedgywpkfgorrb7bfmu2hvpihzi5i/blob',
          ],
        },
        image:
          'ipfs://bafybeieb43wq6bqbfmyaawfmq6zuycdq4bo77zph33zxx26wvquth3qxau/cat.png',
      },
    },
    'response structure'
  )

  const { data, error } = await getRawClient(config)
    .from('upload')
    .select('*, content(cid, dag_size, pin(content_cid, status, service))')
    .match({ content_cid: result.ipnft, user_id: userId })
    .single()

  if (error) {
    throw new Error(JSON.stringify(error))
  }

  t.is(data.type, 'Nft', 'nft type')
  t.is(data.content.dag_size, 324, 'nft size')
  t.deepEqual(data.content.pin, [
    {
      content_cid:
        'bafyreicnwbboevx6g6fykitf4nebz2kqgkqz35qvlnlcgfulhrris66m6i',
      status: 'PinQueued',
      service: 'IpfsCluster3',
    },
  ])
})

// Miniflare doesn't currently preserve pathnames in File objects uploaded via FormData.
// TODO: re-enable this test once https://github.com/cloudflare/miniflare/pull/309 is merged
test.skip('should store dir wrapped image', async (t) => {
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  const { token, userId } = await createTestUser(t)

  const metadata = {
    name: 'name',
    description: 'stuff',
    image: new File(['fake image'], '/dir/cat.png', { type: 'image/png' }),
  }
  const body = Token.encode(metadata)

  const res = await mf.dispatchFetch('http://miniflare.test/store', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body,
  })
  t.truthy(res, 'Server responded')
  t.true(res.ok, 'Server response ok')
  const { ok, value } = await res.json()
  const result = value
  const cid = CID.parse(result.ipnft)
  t.is(cid.version, 1)

  t.deepEqual(
    result,
    {
      ipnft: 'bafyreibubvuqeh5lm2ccose7uq54wweeajtjuhcj4pciogeq2lhbw2a23y',
      url: 'ipfs://bafyreibubvuqeh5lm2ccose7uq54wweeajtjuhcj4pciogeq2lhbw2a23y/metadata.json',
      data: {
        name: 'name',
        description: 'stuff',
        image:
          'ipfs://bafybeidrqmyoaymfhiidikdmsr6ybqyfzi2ejhjzyrfvuv2ykkuzdqkci4/dir/cat.png',
      },
    },
    'response structure'
  )

  const { data, error } = await getRawClient(config)
    .from('upload')
    .select('*, content(cid, dag_size, pin(content_cid, status, service))')
    .match({ content_cid: result.ipnft, user_id: userId })
    .single()

  if (error) {
    throw new Error(JSON.stringify(error))
  }

  t.is(data.type, 'Nft', 'nft type')
  t.is(data.content.dag_size, 140, 'nft size')
  t.deepEqual(data.content.pin, [
    {
      content_cid:
        'bafyreibubvuqeh5lm2ccose7uq54wweeajtjuhcj4pciogeq2lhbw2a23y',
      status: 'PinQueued',
      service: 'IpfsCluster3',
    },
  ])
})
