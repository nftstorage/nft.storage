import { signJWT } from '../../src/utils/jwt.js'
import { SALT } from './worker-globals.js'
import { PostgrestClient } from '@supabase/postgrest-js'
import { DBClient } from '../../src/utils/db-client.js'

export const rawClient = new PostgrestClient(DATABASE_URL, {
  headers: {
    Authorization: `Bearer ${DATABASE_TOKEN}`,
  },
})

export const client = new DBClient(DATABASE_URL, DATABASE_TOKEN)

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

  return createTestUserWithFixedToken({ token, publicAddress, issuer, name })
}

/**
 * Create a new user tag
 *
 * @param {Object} tag
 * @param {number} tag.user_id
 * @param {string} tag.tag
 * @param {string} tag.value
 * @param {string} tag.inserted_at
 * @param {string} tag.reason
 */
async function createUserTag(tag) {
  const query = rawClient.from('user_tag')

  const { data, error } = await query.upsert(tag).single()

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('User tag not created.')
  }

  return data
}

/**
 * @param {{publicAddress?: string, issuer?: string, name?: string, token?: string}} userInfo
 */
export async function createTestUserWithFixedToken({
  token = '',
  publicAddress = `0x73573${Date.now()}`,
  issuer = `did:eth:${publicAddress}`,
  name = 'A Tester',
} = {}) {
  const { data: user, error } = await client
    .upsertUser({
      email: 'a.tester@example.org',
      github_id: issuer,
      magic_link_id: issuer,
      name,
      public_address: publicAddress,
      picture: 'http://example.org/avatar.png',
    })
    .single()

  if (error || !user) {
    throw new Error('error creating user')
  }

  await client.createKey({
    name: 'test',
    secret: token,
    userId: user.id,
  })

  await createUserTag({
    user_id: user.id,
    tag: 'HasPsaAccess',
    value: 'true',
    reason: '',
    inserted_at: '2/22/2022',
  })

  await createUserTag({
    user_id: user.id,
    tag: 'HasAccountRestriction',
    value: 'false',
    reason: '',
    inserted_at: '2/22/2022',
  })
  return { token, userId: user.id, githubId: user.github_id }
}

export class DBTestClient {
  /**
   * @param {{ token: string; userId: number; githubId: string }} opts
   */
  constructor(opts) {
    this.rawClient = rawClient
    this.client = client
    this.token = opts.token
    this.userId = opts.userId
    this.githubId = opts.githubId
  }

  /**
   * Add pin using the API
   *
   * @param {{ cid: string; name: string; }} data
   */
  async addPin(data) {
    const res = await fetch('pins', {
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
    if (!res.ok) {
      throw new Error(`Failed to add pin: ${await res.text()}`)
    }
  }
}
/**
 * @param {{publicAddress?: string, issuer?: string, name?: string}} [userInfo]
 */
export async function createClientWithUser(userInfo) {
  const user = await createTestUser(userInfo)

  return new DBTestClient(user)
}
