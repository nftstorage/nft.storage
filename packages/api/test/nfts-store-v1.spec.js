import assert from 'assert'
import { CID } from 'multiformats'
import { clearStores } from './scripts/helpers.js'
import { signJWT } from '../src/utils/jwt.js'
import { SALT } from './scripts/worker-globals.js'
import * as Token from '../../client/src/token.js'

import { PostgrestClient } from '@supabase/postgrest-js'

const client = new PostgrestClient(DATABASE_URL + '/rest/v1', {
  headers: {
    apikey: DATABASE_TOKEN,
  },
})

/**
 * @param {{publicAddress?: string, issuer?: string, name?: string}} userInfo
 */
async function createTestUser({
  publicAddress = `0x73573r1630497589341`,
  issuer = `did:eth:0x73573r1630497589341`,
  name = 'A Tester',
} = {}) {
  const token = await signJWT(
    {
      sub: issuer,
      iss: 'nft-storage',
      iat: Date.now(),
      name: 'test',
    },
    SALT
  )

  await client.from('accounts').upsert(
    {
      email: 'a.tester@example.org',
      issuer,
      name,
      public_address: publicAddress,
      sub: issuer,
      picture: 'http://example.org/avatar.png',
    },
    { onConflict: 'issuer' }
  )

  await client.from('account_keys').insert({
    name: 'test',
    secret: token,
    issuer,
  })
  return { token, issuer }
}

describe('V1 - /store', () => {
  beforeEach(clearStores)

  it('should store image', async () => {
    const { token, issuer } = await createTestUser()

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

    const res = await fetch('/v1/store', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body,
    })
    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    const result = value
    const cid = CID.parse(result.ipnft)
    assert.strictEqual(cid.version, 1)

    assert.deepStrictEqual(
      result,
      {
        ipnft: 'bafyreicnwbboevx6g6fykitf4nebz2kqgkqz35qvlnlcgfulhrris66m6i',
        url:
          'ipfs://bafyreicnwbboevx6g6fykitf4nebz2kqgkqz35qvlnlcgfulhrris66m6i/metadata.json',
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

    const { data, error } = await client
      .from('upload')
      .select('*, content(cid, size, pin(cid, status, service))')
      .match({ cid: result.ipnft })
      .single()

    if (error) {
      throw new Error(JSON.stringify(error))
    }

    assert.strictEqual(data.type, 'NFT', 'nft type')
    assert.strictEqual(data.content.size, 324, 'nft size')
    assert.deepStrictEqual(data.content.pin, [
      {
        cid: 'bafyreicnwbboevx6g6fykitf4nebz2kqgkqz35qvlnlcgfulhrris66m6i',
        status: 'processing',
        service: 'IPFS_CLUSTER',
      },
      {
        cid: 'bafyreicnwbboevx6g6fykitf4nebz2kqgkqz35qvlnlcgfulhrris66m6i',
        status: 'processing',
        service: 'PINATA',
      },
    ])
  })
})
