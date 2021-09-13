import assert from 'assert'
import { CID } from 'multiformats'
import { clearStores } from './scripts/helpers.js'
import { signJWT } from '../src/utils/jwt.js'
import { SALT } from './scripts/worker-globals.js'
import * as Token from '../../client/src/token.js'

import { PostgrestClient, PostgrestQueryBuilder } from '@supabase/postgrest-js'

const client = new PostgrestClient(DATABASE_URL + '/rest/v1', {
  headers: {
    apikey: DATABASE_TOKEN,
  },
})

/**
 * @param {{publicAddress?: string, issuer?: string, name?: string}} userInfo
 */
async function createTestUser({
  publicAddress = `0x73573${Date.now()}`,
  issuer = `did:eth:${publicAddress}`,
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
  /** @type {PostgrestQueryBuilder<import('../src/utils/db-types').definitions['account']>} */
  const account = client.from('account')
  const { data } = await account
    .insert({
      email: 'a.tester@example.org',
      github_id: issuer,
      magic_link_id: issuer,
      name,
      public_address: publicAddress,
      picture: 'http://example.org/avatar.png',
    })
    .single()

  await client.from('auth_key').insert({
    name: 'test',
    secret: token,
    account_id: data?.id,
  })
  return { token, userId: data?.id }
}

describe.skip('V1 - /pins', () => {
  beforeEach(clearStores)

  it('Add pin', async () => {
    const { token, userId } = await createTestUser()

    const res = await fetch('/v1/pins', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: 'bafybeia3enxye7slrio4ode3kdzq74o6u7wdyytjcw5cwawwkhjt2l5ks4',
        name: 'test-file11',
      }),
    })
    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
  })
})
