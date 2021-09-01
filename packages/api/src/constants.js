// let MAGIC_SECRET_KEY, SALT, PINATA_JWT, SENTRY_DSN, FAUNA_KEY, SUPABASE_TOKEN
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
  fauna: FAUNA_KEY,
  supabase: SUPABASE_TOKEN,
}

export const cluster = {
  apiUrl: CLUSTER_API_URL,
  basicAuthToken:
    typeof CLUSTER_BASIC_AUTH_TOKEN !== 'undefined'
      ? CLUSTER_BASIC_AUTH_TOKEN
      : '',
  ipfsProxyApiUrl: CLUSTER_IPFS_PROXY_API_URL,
  ipfsProxyBasicAuthToken:
    typeof CLUSTER_IPFS_PROXY_BASIC_AUTH_TOKEN !== 'undefined'
      ? CLUSTER_IPFS_PROXY_BASIC_AUTH_TOKEN
      : '',
  addrs: Object.freeze(CLUSTER_ADDRS.split(',').filter(Boolean)),
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

export const fauna = {
  url: FAUNA_URL,
}

export const supabase = {
  url: SUPABASE_URL,
}

export const isDebug = DEBUG === 'true'
