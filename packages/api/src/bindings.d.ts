export {}

import Toucan from 'toucan-js'
import { Service } from 'ucan-storage/service'
import { Mode } from './middleware/maintenance.js'
import { UserOutput, UserOutputKey } from './utils/db-client-types.js'
import { DBClient } from './utils/db-client.js'
import { Logging } from './utils/logs.js'

export type RuntimeEnvironmentName = 'test' | 'dev' | 'staging' | 'production'

export interface ServiceConfiguration {
  /** Is this a debug build? */
  DEBUG: boolean

  /** Target runtime environment */
  ENV: RuntimeEnvironmentName

  /** Semantic version for current build */
  VERSION: string

  /** Git branch name of current build */
  BRANCH: string

  /** Git commit hash of current build */
  COMMITHASH: string

  /** Current maintenance mode */
  MAINTENANCE_MODE: Mode

  /** Salt for API key generation */
  SALT: string

  /** API key for special metaplex upload account */
  METAPLEX_AUTH_TOKEN: string

  /** UCAN private signing key */
  PRIVATE_KEY: string

  /** API url for active IPFS cluster endpoint */
  CLUSTER_API_URL: string

  /** Auth token for IPFS culster */
  CLUSTER_BASIC_AUTH_TOKEN: string

  /** Postgrest endpoint URL */
  DATABASE_URL: string

  /** Postgrest auth token */
  DATABASE_TOKEN: string

  /** S3 endpoint URL */
  S3_ENDPOINT: string

  /** S3 region */
  S3_REGION: string

  /** S3 access key id */
  S3_ACCESS_KEY_ID: string

  /** S3 secret key */
  S3_SECRET_ACCESS_KEY: string

  /** S3 bucket name */
  S3_BUCKET_NAME: string

  /** Magic link secret key */
  MAGIC_SECRET_KEY: string

  /** Logtail auth token */
  LOGTAIL_TOKEN: string

  /** Sentry DSN */
  SENTRY_DSN: string

  /** Mailchimp api key */
  MAILCHIMP_API_KEY: string

  /** Slack webhook url */
  SLACK_USER_REQUEST_WEBHOOK_URL: string
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
  checkHasDeleteRestriction?: boolean
  checkHasPsaAccess?: boolean
}

export interface RouteContext {
  params: Record<string, string>
  db: DBClient
  log: Logging
  uploader: Uploader
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
   * Pin name and meta.
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

export interface RequestFormItem {
  label: string
  value: string
}

export type RequestForm = Array<RequestFormItem>

/**
 * The known structural completeness of a given DAG. "Unknown" structure means
 * it could be a partial or it could be a complete DAG i.e. we haven't walked
 * the graph to verify if we have all the blocks or not.
 */
export type DagStructure = 'Unknown' | 'Partial' | 'Complete'

/**
 * A client to a service that accepts CAR file uploads.
 */
export interface Uploader {
  /**
   * Uploads the CAR file to the service and returns the URL.
   */
  uploadCar(
    userId: number,
    sourceCid: string,
    car: Blob,
    structure?: DagStructure
  ): Promise<URL>
}
