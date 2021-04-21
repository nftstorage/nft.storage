// let _MAGIC_SECRET_KEY, SALT, PINATA_JWT
export const stores = {
  deals: DEALS,
  users: USERS,
  nfts: NFTS,
  metrics: METRICS,
}

export const auth0 = {
  salt: SALT,
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

export const pinata = {
  jwt: PINATA_JWT,
}

export const isDebug = DEBUG === 'true'
export const MAGIC_SECRET_KEY = _MAGIC_SECRET_KEY
