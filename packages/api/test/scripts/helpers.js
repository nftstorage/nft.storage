import stores from './stores.js'
import { signJWT } from '../../src/utils/jwt.js'
import { SALT } from './worker-globals.js'
import { PostgrestClient, PostgrestQueryBuilder } from '@supabase/postgrest-js'

export async function clearStores() {
  for (const store of Object.values(stores)) {
    await store.clear()
  }
}

export const dbClient = new PostgrestClient(DATABASE_URL, {
  headers: {
    apikey: DATABASE_TOKEN,
  },
})

/**
 * @param {{publicAddress?: string, issuer?: string, name?: string}} userInfo
 */
export async function createTestUser({
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
  /** @type {PostgrestQueryBuilder<import('../../src/utils/db-types').definitions['account']>} */
  const account = dbClient.from('account')
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

  await dbClient.from('auth_key').insert({
    name: 'test',
    secret: token,
    account_id: data?.id,
  })
  return { token, userId: data?.id }
}

export class DBTestClient {
  /**
   * @param {{ token: string; userId?: number; }} opts
   */
  constructor(opts) {
    this.client = dbClient
    this.token = opts.token
    this.userId = opts.userId
  }

  /**
   * @param {{ cid: string; name: string; }} data
   */
  async addPin(data) {
    await fetch('/v1/pins', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: data.cid,
        name: data.name,
      }),
    })
  }
}
/**
 * @param {{publicAddress?: string, issuer?: string, name?: string}} [userInfo]
 */
export async function createClientWithUser(userInfo) {
  const user = await createTestUser(userInfo)

  return new DBTestClient(user)
}
