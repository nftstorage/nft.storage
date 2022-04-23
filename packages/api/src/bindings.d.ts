export {}

import Toucan from 'toucan-js'
import { Service } from 'ucan-storage/service'
import { Mode } from './middleware/maintenance.js'
import { UserOutput, UserOutputKey } from './utils/db-client-types.js'
import { DBClient } from './utils/db-client.js'
import { Logging } from './utils/logs.js'

declare global {
  const SALT: string
  const DEBUG: string
  const CLUSTER_SERVICE: 'IpfsCluster' | 'IpfsCluster2' | 'IpfsCluster3'
  const CLUSTER_API_URL: string
  const CLUSTER_BASIC_AUTH_TOKEN: string
  const MAGIC_SECRET_KEY: string
  const DATABASE_URL: string
  const DATABASE_TOKEN: string
  const MAILCHIMP_API_KEY: string
  const LOGTAIL_TOKEN: string
  const ENV: 'dev' | 'staging' | 'production'
  const SENTRY_DSN: string
  const BRANCH: string
  const VERSION: string
  const COMMITHASH: string
  const MAINTENANCE_MODE: Mode
  const METAPLEX_AUTH_TOKEN: string
  const S3_ENDPOINT: string
  const S3_REGION: string
  const S3_ACCESS_KEY_ID: string
  const S3_SECRET_ACCESS_KEY: string
  const S3_BUCKET_NAME: string
  const PRIVATE_KEY: string
}

export interface Ucan {
  token: string
  root: any
  cap: any
}

export interface Auth {
  user: UserOutput
  key?: UserOutputKey
  db: DBClient
  ucan?: Ucan
  type: 'ucan' | 'key' | 'session'
}

export interface AuthOptions {
  checkUcan?: boolean
  checkHasAccountRestriction?: boolean
  checkHasPsaAccess?: boolean
}

export interface RouteContext {
  params: Record<string, string>
  db: DBClient
  log: Logging
  backup?: BackupClient
  ucanService: Service
  auth?: Auth
}

export type Handler = (
  event: FetchEvent,
  ctx: RouteContext
) => Promise<Response> | Response

export interface Pin {
  /**
   * Content Identifier for the NFT data.
   */
  cid: string
  name?: string
  meta?: Record<string, string>
  status: PinStatus
  created: string
  size?: number
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
  files: Array<{ name?: string; type?: string } | undefined>
  /**
   * Pinata pin name and meta.
   */
  pin?: { name?: string; meta?: Record<string, string> }
  /**
   * Name of the JWT token used to create this NFT.
   */
  name?: string
  /**
   * Optional name of the file(s) uploaded as NFT.
   */
  scope: string
  /**
   * Date this NFT was created in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: YYYY-MM-DDTHH:MM:SSZ.
   */
  created: string
}

export type NFTResponse = NFT & {
  size: number
  pin: Pin
  deals: Deal[]
}

export type CheckNFTResponse = {
  cid: string
  pin: Pin
  deals: Deal[]
}

export type DealStatus = 'queued' | 'active' | 'published' | 'terminated'
export interface Deal {
  status: DealStatus
  lastChanged?: Date
  chainDealID?: number
  datamodelSelector: string
  statusText?: string
  dealActivation?: Date
  dealExpiration?: Date
  miner?: string
  pieceCid: CIDString
  batchRootCid: CIDString
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
  /**
   * This will actually be json object
   */
  github?: string
}

export type UserSafe = Omit<User, 'tokens' | 'github'>

/**
 * Pins add endpoint body interface
 */
export interface PinsAddInput {
  cid: string
  name: string
  origins: string[]
  meta: Record<string, string>
}

/**
 * Pins endpoints response
 */
export interface PinsResponse {
  requestid: string
  status: PinStatus
  created: string
  pin: {
    cid: string
    meta: Record<string, string>
    name?: string
    origins: string[]
  }
  delegates: string[]
}

/**
 * The known structural completeness of a given DAG. "Unknown" structure means
 * it could be a partial or it could be a complete DAG i.e. we haven't walked
 * the graph to verify if we have all the blocks or not.
 */
export type DagStructure = 'Unknown' | 'Partial' | 'Complete'

/**
 * A client to a service that backups up a CAR file.
 */
export interface BackupClient {
  /**
   * Uploads the CAR file to the service and returns the URL.
   */
  backupCar(
    userId: number,
    rootCid: CID,
    car: Blob,
    structure?: DagStructure
  ): Promise<URL>
}
