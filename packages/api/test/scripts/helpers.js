import { Cluster } from '@nftstorage/ipfs-cluster'
import { PostgrestClient } from '@supabase/postgrest-js'
import { DBClient } from '../../src/utils/db-client.js'
import { signJWT } from '../../src/utils/jwt.js'
import { getMiniflareContext, getTestServiceConfig } from './test-context.js'

/**
 * @typedef {import('../../src/config.js').ServiceConfiguration} ServiceConfiguration
 */

/**
 * @param {ServiceConfiguration} config
 * @returns {Cluster}
 */
export const getCluster = (config) => {
  return new Cluster(config.CLUSTER_API_URL, {
    headers: { Authorization: `Basic ${config.CLUSTER_BASIC_AUTH_TOKEN}` },
  })
}

/**
 * @param {ServiceConfiguration} config
 * @returns {PostgrestClient}
 */
export const getRawClient = (config) => {
  return new PostgrestClient(config.DATABASE_URL, {
    headers: {
      Authorization: `Bearer ${config.DATABASE_TOKEN}`,
    },
  })
}

/**
 * @param {ServiceConfiguration} config
 * @returns {DBClient}
 */
export const getDBClient = (config) => {
  return new DBClient(config.DATABASE_URL, config.DATABASE_TOKEN)
}

/**
 * @param {import('ava').ExecutionContext} t
 * @param {{publicAddress?: string, issuer?: string, name?: string}} userInfo
 */
export async function createTestUser(t, userInfo = {}) {
  const config = getTestServiceConfig(t)
  const publicAddress =
    userInfo.publicAddress || `0x73573${Date.now() + Math.random()}`
  const issuer = userInfo.issuer || `did:eth:${publicAddress}`
  const name = userInfo.name || 'A Tester'

  const token = await signJWT(
    {
      sub: issuer,
      iss: 'nft-storage',
      iat: Date.now(),
      name: 'test',
    },
    config.SALT
  )

  return createTestUserWithFixedToken(config, {
    token,
    publicAddress,
    issuer,
    name,
  })
}

/**
 * Create a new user tag
 *
 * @param {PostgrestClient} rawClient
 *
 * @param {Object} tag
 * @param {number} tag.user_id
 * @param {string} tag.tag
 * @param {string} tag.value
 * @param {string=} tag.deleted_at
 * @param {string} tag.inserted_at
 * @param {string} tag.reason
 */
async function createUserTag(rawClient, tag) {
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
 * @param {ServiceConfiguration} config
 * @param {{publicAddress?: string, issuer?: string, name?: string, token?: string, addAccountRestriction?: boolean}} userInfo
 */
export async function createTestUserWithFixedToken(
  config,
  {
    token = '',
    publicAddress = `0x73573${Date.now()}`,
    issuer = `did:eth:${publicAddress}`,
    name = 'A Tester',
    addAccountRestriction = false,
  } = {}
) {
  const client = getDBClient(config)
  const rawClient = getRawClient(config)
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
  await createUserTag(rawClient, {
    user_id: user.id,
    tag: 'HasPsaAccess',
    value: 'true',
    reason: '',
    inserted_at: new Date().toISOString(),
  })

  await createUserTag(rawClient, {
    user_id: user.id,
    tag: 'HasAccountRestriction',
    value: 'false',
    reason: '',
    inserted_at: new Date().toISOString(),
  })

  // Add some deleted tags to ensure our filtering works
  await createUserTag(rawClient, {
    user_id: user.id,
    tag: 'HasPsaAccess',
    value: 'false',
    reason: '',
    inserted_at: new Date().toISOString(),
    deleted_at: new Date().toISOString(),
  })

  if (addAccountRestriction) {
    await createUserTag(rawClient, {
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
   * @param {ServiceConfiguration} config
   * @param {import('miniflare').Miniflare} mf
   * @param {{ token: string; userId: number; githubId: string }} opts
   */
  constructor(config, mf, opts) {
    this.rawClient = getRawClient(config)
    this.client = getDBClient(config)
    this.mf = mf
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
    const res = await this.mf.dispatchFetch('http://miniflare.test/pins', {
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
 * @param {import('ava').ExecutionContext<unknown>} t
 * @param {{publicAddress?: string, issuer?: string, name?: string, token?: string}} [userInfo]
 */
export async function createClientWithUser(t, userInfo) {
  const serviceConfig = await getTestServiceConfig(t)
  const mf = await getMiniflareContext(t)

  const user = await createTestUser(t, userInfo)
  return new DBTestClient(serviceConfig, mf, user)
}
