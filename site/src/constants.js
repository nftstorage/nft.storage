// let MAGIC_SECRET_KEY, SALT, PINATA_JWT
export const stores = {
  deals: DEALS,
  users: USERS,
  nfts: NFTS,
  nftsIndex: NFTS_IDX,
  metrics: METRICS,
  pins: PINS,
  followups: FOLLOWUPS,
}

export const secrets = {
  salt: SALT,
  pinata: PINATA_JWT,
  magic: MAGIC_SECRET_KEY,
  sentry: SENTRY_DSN,
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
}

export const isDebug = DEBUG === 'true'
