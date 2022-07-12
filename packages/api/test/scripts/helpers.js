import { Cluster } from '@nftstorage/ipfs-cluster'
import { PostgrestClient } from '@supabase/postgrest-js'
import { DBClient } from '../../src/utils/db-client.js'
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
 * @param {import('ava').ExecutionContext<unknown>} t
 * @param {{publicAddress?: string, issuer?: string, name?: string, token?: string}} [userInfo]
 */
export async function createTestUser(t, userInfo = undefined) {
  const mf = getMiniflareContext(t)
  const res = await mf.dispatchFetch('http://test.mf/create-user', {
    method: 'POST',
    body: userInfo && JSON.stringify(userInfo),
  })
  t.true(res.ok, 'unable to create test user')
  return res.json()
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
    const res = await this.mf.dispatchFetch('http://localhost:8787/pins', {
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

/**
 *
 * @param {import('ava').ExecutionContext<unknown>} t
 * @param {any} payload
 * @param {string} secret
 * @returns {Promise<string>}
 */
export async function signJWT(t, payload, secret) {
  const mf = await getMiniflareContext(t)
  const res = await mf.dispatchFetch('http://test.mf/sign-jwt', {
    method: 'POST',
    body: JSON.stringify({ payload, secret }),
  })
  t.true(res.ok, 'unable to sign jwt')
  const { token } = await res.json()
  return token
}
