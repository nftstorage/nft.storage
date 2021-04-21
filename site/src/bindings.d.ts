export {}

declare global {
  const AUTH0_DOMAIN: string
  const AUTH0_CLIENT_ID: string
  const AUTH0_CLIENT_SECRET: string
  const AUTH0_CALLBACK_URL: string
  const SALT: string
  const DEBUG: string
  const SESSION: KVNamespace
  const CSRF: KVNamespace
  const DEALS: KVNamespace
  const USERS: KVNamespace
  const NFTS: KVNamespace
  const METRICS: KVNamespace
  const PINATA_JWT: string
  const CLUSTER_API_URL: string
  const CLUSTER_BASIC_AUTH_TOKEN: string
  const CLUSTER_IPFS_PROXY_API_URL: string
  const CLUSTER_IPFS_PROXY_BASIC_AUTH_TOKEN: string
  const CLUSTER_ADDRS: string
  const _MAGIC_SECRET_KEY: string
  const ENV: 'dev'
}

export interface Pin {
  /**
   * Content Identifier for the NFT data.
   */
  cid: string
  name?: string
  meta?: Record<string, string>
  status: PinStatus
  created: string
  size: number
}

export type PinStatus = 'queued' | 'pinning' | 'pinned' | 'failed'

export type NFT = {
  /**
   * Content Identifier for the NFT data.
   */
  cid: string
  /**
   * Size in bytes of the NFT data.
   */
  size: number
  /**
   * Type of the data: "directory" or Blob.type.
   */
  type: string
  /**
   * Files in the directory (only if this NFT is a directory).
   */
  files: Array<{ name: string; type: string }>
  /**
   * Pinata pin data.
   */
  pin: Pin
  /**
   * Name of the JWT token used to create this NFT.
   */
  scope: string
  /**
   * Date this NFT was created in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: YYYY-MM-DDTHH:MM:SSZ.
   */
  created: string
  /**
   * Deals
   */
  deals?: {
    /**
     * Overall deal status
     */
    status: 'ongoing' | 'finalized'
    deals: Deal[]
  }
}

export interface Deal {
  /**
   * CID string
   */
  batchRootCid: string
  /**
   * Timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: YYYY-MM-DDTHH:MM:SSZ.
   */
  lastChanged: string
  /**
   * Miner ID
   */
  miner?: string
  /**
   * Filecoin network for this Deal
   */
  network?: 'nerpanet' | 'mainnet'
  /**
   * Piece CID string
   */
  pieceCid?: string
  /**
   * Deal Status
   */
  status:
    | 'queued'
    | 'proposing'
    | 'accepted'
    | 'failed'
    | 'active'
    | 'published'
    | 'terminated'
  /**
   * Deal Status Description
   */
  statusText?: string
  /**
   * Identifier for the deal stored on chain.
   */
  chainDealID?: number
  /**
   * Deal Activation
   *
   * Timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: YYYY-MM-DDTHH:MM:SSZ.
   */
  dealActivation?: string
  /**
   * Deal Expiraction
   *
   * Timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: YYYY-MM-DDTHH:MM:SSZ.
   */
  dealExpiration?: string
}

export interface User {
  sub: string
  nickname: string
  name: string
  email: string
  picture: string
  issuer: string
  publicAddress: string
  tokens: Record<string, string>
  github?: unknown
}

export type UserSafe = Omit<User, 'tokens' | 'github'>
