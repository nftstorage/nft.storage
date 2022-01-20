// let MAGIC_SECRET_KEY, SALT, PINATA_JWT, SENTRY_DSN, DATABASE_TOKEN, CLUSTER_SERVICE, LOGTAIL_TOKEN, MAILCHIMP_API_KEY, METAPLEX_AUTH_TOKEN
import { config } from 'dotenv'

config({ debug: true })

const {
  MAGIC_SECRET_KEY,
  SALT,
  SENTRY_DSN,
  DATABASE_TOKEN,
  CLUSTER_SERVICE,
  LOGTAIL_TOKEN,
  MAILCHIMP_API_KEY,
  CLUSTER_API_URL,
  DATABASE_URL,
  DEBUG,
} = process.env

if (!SALT) {
  throw new Error('SALT is not defined')
}

if (!DATABASE_TOKEN) {
  throw new Error('DATABASE_TOKEN is not defined')
}

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined')
}

if (!LOGTAIL_TOKEN) {
  throw new Error('LOGTAIL_TOKEN is not defined')
}

export const secrets = {
  salt: SALT,
  magic: MAGIC_SECRET_KEY,
  sentry: SENTRY_DSN,
  database: DATABASE_TOKEN,
  mailchimp: MAILCHIMP_API_KEY,
  logtail: LOGTAIL_TOKEN,
  metaplexAuth: METAPLEX_AUTH_TOKEN,
}

const CLUSTER1 = 'https://nft.storage.ipfscluster.io/api/'
const CLUSTER2 = 'https://nft2.storage.ipfscluster.io/api/'
const CLUSTER3 = 'https://nft3.storage.ipfscluster.io/api/'
let clusterUrl

switch (CLUSTER_SERVICE) {
  case 'IpfsCluster':
    clusterUrl = CLUSTER1
    break
  case 'IpfsCluster2':
    clusterUrl = CLUSTER2
    break
  case 'IpfsCluster3':
    clusterUrl = CLUSTER3
    break
  default:
    clusterUrl = CLUSTER_API_URL
    break
}

if (!clusterUrl) {
  throw new Error('CLUSTER_API_URL or CLUSTER_SERVICE must be set')
}

if (!CLUSTER_BASIC_AUTH_TOKEN) {
  throw new Error('CLUSTER_BASIC_AUTH_TOKEN is not defined')
}

export const cluster = {
  apiUrl: clusterUrl,
  basicAuthToken: CLUSTER_BASIC_AUTH_TOKEN || '',
  /**
   * When >2.5MB, use local add, because waiting for blocks to be sent to
   * other cluster nodes can take a long time. Replication to other nodes
   * will be done async by bitswap instead.
   */
  // localAddThreshold: 1024 * 1024 * 2.5,
  localAddThreshold: 0,
}

export const database = {
  url: DATABASE_URL,
}

export const isDebug = DEBUG === 'true'

/**
 * The list of user IDs that are allowed to use the Pinning Service API. By
 * default ["*"] - meaning anyone can use it.
 */
export const psaAllow =
  typeof PSA_ALLOW !== 'undefined' ? PSA_ALLOW.split(',') : ['*']
