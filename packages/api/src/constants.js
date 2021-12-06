// let MAGIC_SECRET_KEY, SALT, PINATA_JWT, SENTRY_DSN, DATABASE_TOKEN, CLUSTER_SERVICE, LOGTAIL_TOKEN, MAILCHIMP_API_KEY, METAPLEX_AUTH_TOKEN

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

export const cluster = {
  apiUrl: clusterUrl,
  basicAuthToken:
    typeof CLUSTER_BASIC_AUTH_TOKEN !== 'undefined'
      ? CLUSTER_BASIC_AUTH_TOKEN
      : '',
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

export const s3 = {
  endpoint: typeof S3_ENDPOINT !== 'undefined' ? S3_ENDPOINT : '',
  region: typeof S3_REGION !== 'undefined' ? S3_REGION : '',
  accessKeyId: typeof S3_ACCESS_KEY_ID !== 'undefined' ? S3_ACCESS_KEY_ID : '',
  secretAccessKey:
    typeof S3_SECRET_ACCESS_KEY !== 'undefined' ? S3_SECRET_ACCESS_KEY : '',
  bucketName: typeof S3_BUCKET_NAME !== 'undefined' ? S3_BUCKET_NAME : '',
}
