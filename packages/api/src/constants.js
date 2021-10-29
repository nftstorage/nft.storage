// let MAGIC_SECRET_KEY, SALT, PINATA_JWT, SENTRY_DSN, DATABASE_TOKEN, CLUSTER_SERVICE
export const stores = {
  deals: DEALS,
  users: USERS,
  nfts: NFTS,
  nftsIndex: NFTS_IDX,
  metrics: METRICS,
  pins: PINS,
  followups: FOLLOWUPS,
  pinataQueue: PINATA_QUEUE,
}

export const secrets = {
  salt: SALT,
  pinata: PINATA_JWT,
  magic: MAGIC_SECRET_KEY,
  sentry: SENTRY_DSN,
  database: DATABASE_TOKEN,
}

const CLUSTER1 = 'https://nft.storage.ipfscluster.io/api/'
const CLUSTER2 = 'https://nft2.storage.ipfscluster.io/api/'
let clusterUrl

switch (CLUSTER_SERVICE) {
  case 'IpfsCluster':
    clusterUrl = CLUSTER1
    break
  case 'IpfsCluster2':
    clusterUrl = CLUSTER2
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

export const pinata = {
  apiUrl:
    typeof PINATA_API_URL !== 'undefined'
      ? PINATA_API_URL
      : 'https://api.pinata.cloud',
  psaApiUrl:
    typeof PINATA_PSA_API_URL !== 'undefined'
      ? PINATA_PSA_API_URL
      : 'https://api.pinata.cloud/psa/',
}

export const database = {
  url: DATABASE_URL,
}

export const isDebug = DEBUG === 'true'
