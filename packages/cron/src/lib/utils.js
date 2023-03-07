import { Cluster } from '@nftstorage/ipfs-cluster'
import pg from 'pg'
import { DBClient } from '../../../api/src/utils/db-client.js'

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
    headers: { authorization: `Basic ${basicAuthToken}` },
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
    headers: { authorization: `Basic ${basicAuthToken}` },
  })
}

/**
 * Create a new IPFS Cluster instance from the passed environment variables.
 * @param {Record<string, string|undefined>} env
 */
export function getCluster3(env) {
  const clusterApiUrl = env.CLUSTER3_API_URL
  if (!clusterApiUrl) throw new Error('missing IPFS Cluster API URL')
  const basicAuthToken = env.CLUSTER3_BASIC_AUTH_TOKEN
  if (!basicAuthToken) throw new Error('missing IPFS Cluster credentials')
  return new Cluster(clusterApiUrl, {
    headers: { authorization: `Basic ${basicAuthToken}` },
  })
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
 * @param {'ro'|'rw'} [mode]
 */
export function getPg(env, mode = 'rw') {
  return new pg.Client({ connectionString: getPgConnString(env, mode) })
}

/**
 * Create a new Postgres pool instance from the passed environment variables.
 * @param {Record<string, string|undefined>} env
 * @param {'ro'|'rw'} [mode]
 */
export function getPgPool(env, mode = 'rw') {
  return new pg.Pool({
    connectionString: getPgConnString(env, mode),
    max: MAX_CONCURRENT_QUERIES,
  })
}

/**
 * Get a postgres connection string from the passed environment variables.
 * @param {Record<string, string|undefined>} env
 * @param {'ro'|'rw'} [mode]
 */
export function getPgConnString(env, mode = 'rw') {
  let connectionString
  if (env.ENV === 'production') {
    connectionString =
      mode === 'rw'
        ? env.PROD_DATABASE_CONNECTION
        : env.PROD_RO_DATABASE_CONNECTION
  } else if (env.ENV === 'staging') {
    connectionString =
      mode === 'rw'
        ? env.STAGING_DATABASE_CONNECTION
        : env.STAGING_RO_DATABASE_CONNECTION
  } else {
    connectionString =
      mode === 'rw' ? env.DATABASE_CONNECTION : env.RO_DATABASE_CONNECTION
  }
  if (!connectionString) throw new Error('missing Postgres connection string')
  return connectionString
}

export const MAX_CONCURRENT_QUERIES = 10

/**
 * Object.hasOwnProperty as typescript type guard
 * @template {unknown} X
 * @template {PropertyKey} Y
 * @param {X} obj
 * @param {Y} prop
 * @returns {obj is X & Record<Y, unknown>}
 * https://fettblog.eu/typescript-hasownproperty/
 */
export function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
