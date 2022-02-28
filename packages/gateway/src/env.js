import Toucan from 'toucan-js'
import { S3Client } from '@aws-sdk/client-s3/dist-es/S3Client.js'
import pkg from '../package.json'
import { Logging } from './logs.js'

/**
 * @typedef {Object} EnvInput
 * @property {string} IPFS_GATEWAYS
 * @property {string} GATEWAY_HOSTNAME
 * @property {string} VERSION
 * @property {string} COMMITHASH
 * @property {string} BRANCH
 * @property {string} DEBUG
 * @property {string} ENV
 * @property {string} [SENTRY_DSN]
 * @property {string} [LOGTAIL_TOKEN]
 * @property {number} [REQUEST_TIMEOUT]
 * @property {string} [S3_BUCKET_ENDPOINT]
 * @property {string} [S3_BUCKET_NAME]
 * @property {string} [S3_BUCKET_REGION]
 * @property {string} [S3_ACCESS_KEY_ID]
 * @property {string} [S3_SECRET_ACCESS_KEY_ID]
 * @property {Object} GATEWAYMETRICS
 * @property {Object} SUMMARYMETRICS
 * @property {Object} CIDSTRACKER
 * @property {Object} GATEWAYRATELIMITS
 * @property {Object} GATEWAYREDIRECTCOUNTER
 *
 * // Derived values and class dependencies
 * @typedef {Object} EnvTransformed
 * @property {Array<string>} ipfsGateways
 * @property {DurableObjectNamespace} gatewayMetricsDurable
 * @property {DurableObjectNamespace} summaryMetricsDurable
 * @property {DurableObjectNamespace} cidsTrackerDurable
 * @property {DurableObjectNamespace} gatewayRateLimitsDurable
 * @property {DurableObjectNamespace} gatewayRedirectCounter
 * @property {number} REQUEST_TIMEOUT
 * @property {Toucan} [sentry]
 * @property {S3Client} [s3Client]
 * @property {Logging} [log]
 *
 * @typedef {EnvInput & EnvTransformed} Env
 */

/**
 * @param {Request} request
 * @param {Env} env
 * @param {import('./').Ctx} ctx
 */
export function envAll(request, env, ctx) {
  env.sentry = getSentry(request, env)
  env.s3Client = getS3Client(env)
  env.ipfsGateways = JSON.parse(env.IPFS_GATEWAYS)
  env.gatewayMetricsDurable = env.GATEWAYMETRICS
  env.summaryMetricsDurable = env.SUMMARYMETRICS
  env.cidsTrackerDurable = env.CIDSTRACKER
  env.gatewayRateLimitsDurable = env.GATEWAYRATELIMITS
  env.gatewayRedirectCounter = env.GATEWAYREDIRECTCOUNTER
  env.REQUEST_TIMEOUT = env.REQUEST_TIMEOUT || 20000

  env.log = new Logging(request, env, ctx)
  env.log.time('request')
}

/**
 * Get s3 client instance if configured
 *
 * @param {Env} env
 */
function getS3Client(env) {
  // s3 not required in dev mode
  if (env.ENV === 'dev' && !env.S3_ACCESS_KEY_ID) {
    console.log('running without s3 wired up')
  } else {
    return new S3Client({
      endpoint: env.S3_BUCKET_ENDPOINT,
      forcePathStyle: !!env.S3_BUCKET_ENDPOINT, // Force path if endpoint provided
      region: env.S3_BUCKET_REGION,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY_ID,
      },
    })
  }
}

/**
 * Get sentry instance if configured
 *
 * @param {Request} request
 * @param {Env} env
 */
function getSentry(request, env) {
  if (!env.SENTRY_DSN) {
    return
  }

  return new Toucan({
    request,
    dsn: env.SENTRY_DSN,
    allowedHeaders: ['user-agent'],
    allowedSearchParams: /(.*)/,
    debug: false,
    environment: env.ENV || 'dev',
    rewriteFrames: {
      // strip . from start of the filename ./worker.mjs as set by cloudflare, to make absolute path `/worker.mjs`
      iteratee: (frame) => ({
        ...frame,
        filename: frame.filename.substring(1),
      }),
    },
    release: env.VERSION,
    pkg,
  })
}

/**
 * From: https://github.com/cloudflare/workers-types
 *
 * @typedef {{
 *  toString(): string
 *  equals(other: DurableObjectId): boolean
 *  readonly name?: string
 * }} DurableObjectId
 *
 * @typedef {{
 *   newUniqueId(options?: { jurisdiction?: string }): DurableObjectId
 *   idFromName(name: string): DurableObjectId
 *   idFromString(id: string): DurableObjectId
 *   get(id: DurableObjectId): DurableObjectStub
 * }} DurableObjectNamespace
 *
 * @typedef {{
 *   readonly id: DurableObjectId
 *   readonly name?: string
 *   fetch(requestOrUrl: Request | string, requestInit?: RequestInit | Request): Promise<Response>
 * }} DurableObjectStub
 */
