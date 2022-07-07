import { Cluster } from '@nftstorage/ipfs-cluster'
import { signJWT } from '../../src/utils/jwt.js'
import { PostgrestClient } from '@supabase/postgrest-js'
import { DBClient } from '../../src/utils/db-client.js'
import { getServiceConfig } from '../../src/config.js'

export const getCluster = () => {
  const config = getServiceConfig()
  return new Cluster(config.CLUSTER_API_URL, {
    headers: { Authorization: `Basic ${config.CLUSTER_BASIC_AUTH_TOKEN}` },
  })
}

export const getRawClient = () => {
  const config = getServiceConfig()
  return new PostgrestClient(config.DATABASE_URL, {
    headers: {
      Authorization: `Bearer ${config.DATABASE_TOKEN}`,
    },
  })
}

export const getDBClient = () => {
  const config = getServiceConfig()
  return new DBClient(config.DATABASE_URL, config.DATABASE_TOKEN)
}

/**
 * @param {{publicAddress?: string, issuer?: string, name?: string}} userInfo
 */
export async function createTestUser({
  publicAddress = `0x73573${Date.now()}`,
  issuer = `did:eth:${publicAddress}`,
  name = 'A Tester',
} = {}) {
  const config = getServiceConfig()
  const token = await signJWT(
    {
      sub: issuer,
      iss: 'nft-storage',
      iat: Date.now(),
      name: 'test',
    },
    config.SALT
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
 * @param {string=} tag.deleted_at
 * @param {string} tag.inserted_at
 * @param {string} tag.reason
 */
async function createUserTag(tag) {
  const rawClient = getRawClient()
  const query = rawClient.from('user_tag')

  const { data, error } = await query.upsert(tag).single()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error('User tag not created.')
  }

  return data
}

/**
 * @param {{publicAddress?: string, issuer?: string, name?: string, token?: string, addAccountRestriction?: boolean}} userInfo
 */
export async function createTestUserWithFixedToken({
  token = '',
  publicAddress = `0x73573${Date.now()}`,
  issuer = `did:eth:${publicAddress}`,
  name = 'A Tester',
  addAccountRestriction = false,
} = {}) {
  const client = getDBClient()
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

  if (error) {
    throw error
  }

  if (!user) {
    throw new Error('error creating user: no error returned, but user is null')
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
    inserted_at: new Date().toISOString(),
  })

  await createUserTag({
    user_id: user.id,
    tag: 'HasAccountRestriction',
    value: 'false',
    reason: '',
    inserted_at: new Date().toISOString(),
  })

  // Add some deleted tags to ensure our filtering works
  await createUserTag({
    user_id: user.id,
    tag: 'HasPsaAccess',
    value: 'false',
    reason: '',
    inserted_at: new Date().toISOString(),
    deleted_at: new Date().toISOString(),
  })

  if (addAccountRestriction) {
    await createUserTag({
      user_id: user.id,
      tag: 'HasAccountRestriction',
      value: 'true',
      reason: '',
      inserted_at: new Date().toISOString(),
      deleted_at: new Date().toISOString(),
    })
  }

  return { token, userId: user.id, githubId: user.github_id }
}

export class DBTestClient {
  /**
   * @param {{ token: string; userId: number; githubId: string }} opts
   */
  constructor(opts) {
    this.rawClient = getRawClient()
    this.client = getDBClient()
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
