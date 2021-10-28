import { Cluster } from '@nftstorage/ipfs-cluster'
import pg from 'pg'
import { Cloudflare } from '../lib/cloudflare.js'
import { Pinata } from './pinata.js'
import { DBClient } from '../../../api/src/utils/db-client.js'

/**
 * @param {import('./cloudflare').Namespace[]} namespaces
 * @param {string} env
 * @param {string} name
 * @returns {import('./cloudflare').Namespace}
 */
export function findNs(namespaces, env, name) {
  const prefix = env === 'production' ? '' : `${env}-`
  const suffix = env === 'production' ? '' : '_preview'
  const fqn = `nft-storage-${prefix}${name}${suffix}`
  const ns = namespaces.find((ns) => ns.title === fqn)
  if (!ns) throw new Error(`KV namespace ${fqn} not found`)
  return ns
}

/**
 * Create a new Cloudflare instance from the passed environment variables.
 * @param {Record<string, string|undefined>} env
 */
export function getCloudflare(env) {
  const accountId = env.CF_ACCOUNT
  const apiToken = env.CF_TOKEN
  if (!accountId || !apiToken) throw new Error('missing Cloudflare credentials')
  return new Cloudflare({ accountId, apiToken })
}

/**
 * Create a new IPFS Cluster instance from the passed environment variables.
 * @param {Record<string, string|undefined>} env
 */
export function getCluster1(env) {
  const clusterApiUrl = env.CLUSTER1_API_URL
  if (!clusterApiUrl) throw new Error('missing IPFS Cluster API URL')
  const basicAuthToken = env.CLUSTER1_BASIC_AUTH_TOKEN
  if (!basicAuthToken) throw new Error('missing IPFS Cluster credentials')
  return new Cluster(clusterApiUrl, {
    headers: { Authorization: `Basic ${basicAuthToken}` },
  })
}

/**
 * Create a new IPFS Cluster instance from the passed environment variables.
 * @param {Record<string, string|undefined>} env
 */
export function getCluster2(env) {
  const clusterApiUrl = env.CLUSTER2_API_URL
  if (!clusterApiUrl) throw new Error('missing IPFS Cluster API URL')
  const basicAuthToken = env.CLUSTER2_BASIC_AUTH_TOKEN
  if (!basicAuthToken) throw new Error('missing IPFS Cluster credentials')
  return new Cluster(clusterApiUrl, {
    headers: { Authorization: `Basic ${basicAuthToken}` },
  })
}

/**
 * Create a new IPFS client instance from the passed environment variables.
 * @param {Record<string, string|undefined>} env
 */
export function getPinata(env) {
  const apiToken = env.PINATA_JWT
  if (!apiToken) throw new Error('missing Pinata API token')
  return new Pinata({ apiToken })
}

/**
 * Create a new DBClient instance from the passed environment variables.
 * @param {Record<string, string|undefined>} env
 */
export function getDBClient(env) {
  let url, token
  if (env.ENV === 'production') {
    url = env.PROD_DATABASE_URL
    token = env.PROD_DATABASE_TOKEN
  } else if (env.ENV === 'staging') {
    url = env.STAGING_DATABASE_URL
    token = env.STAGING_DATABASE_TOKEN
  } else {
    url = env.DATABASE_URL
    token = env.DATABASE_TOKEN
  }
  if (!url || !token) throw new Error('missing PostgREST credentials')
  return new DBClient(url, token)
}

/**
 * Create a new Postgres client instance from the passed environment variables.
 * @param {Record<string, string|undefined>} env
 */
export function getPg(env) {
  let connectionString
  if (env.ENV === 'production') {
    connectionString = env.PROD_DATABASE_CONNECTION
  } else if (env.ENV === 'staging') {
    connectionString = env.STAGING_DATABASE_CONNECTION
  } else {
    connectionString = env.DATABASE_CONNECTION
  }
  if (!connectionString) throw new Error('missing Postgres connection string')
  return new pg.Client({ connectionString })
}
