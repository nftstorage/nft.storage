import type { Pin } from '../../client/src/api'

export {};

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
  const PINATA_JWT: string
}

export type NFT = {
  /**
   * Content Identifier for the NDT data.
   */
  cid: string
  /**
   * Size in bytes of the NFT data.
   */
  size: number,
  /**
   * Type of the data: "directory" or Blob.type.
   */
  type: string,
  /**
   * Files in the directory (only if this NFT is a directory).
   */
  files: Array<{ name: string, type: string }>,
  /**
   * Pinata pin data.
   */
  pin: Pin
  /**
   * Name of the JWT token used to create this NFT.
   */
  scope: string,
  /**
   * Date this NFT was created.
   */
  created: Date
}
