export {}

import { Deal } from 'nft.storage/src/lib/interface'
import Toucan from 'toucan-js'

declare global {
  const SALT: string
  const DEBUG: string
  const DEALS: KVNamespace
  const USERS: KVNamespace
  const NFTS: KVNamespace
  const NFTS_IDX: KVNamespace
  const METRICS: KVNamespace
  const PINS: KVNamespace
  const FOLLOWUPS: KVNamespace
  const PINATA_JWT: string
  const CLUSTER_API_URL: string
  const CLUSTER_BASIC_AUTH_TOKEN: string
  const CLUSTER_IPFS_PROXY_API_URL: string
  const CLUSTER_IPFS_PROXY_BASIC_AUTH_TOKEN: string
  const CLUSTER_ADDRS: string
  const MAGIC_SECRET_KEY: string
  const ENV: 'dev' | 'staging' | 'production'
  const SENTRY_DSN: string
  const BRANCH: string
  const VERSION: string
  const COMMITHASH: string
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
   * Type of the data: "directory" or Blob.type.
   */
  type: string
  /**
   * Files in the directory (only if this NFT is a directory).
   */
  files: Array<{ name: string; type: string }>
  /**
   * Pinata pin name and meta.
   */
  pin?: { name?: string; meta?: Record<string, string> }
  /**
   * Name of the JWT token used to create this NFT.
   */
  scope: string
  /**
   * Date this NFT was created in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: YYYY-MM-DDTHH:MM:SSZ.
   */
  created: string
}

export type { Deal }

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

export interface RouteContext {
  sentry: Toucan
}
