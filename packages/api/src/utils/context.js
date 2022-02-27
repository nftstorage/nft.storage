import Toucan from 'toucan-js'
import { DBClient } from './db-client.js'
import { S3BackupClient } from './s3-backup-client.js'
import { secrets, isDebug, s3 as s3Config, getConstants } from '../constants'
import { Logging } from './logs.js'
import pkg from '../../package.json'

const { url: dbUrl } = getConstants(ENV)
const db = new DBClient(dbUrl, secrets.database)

const backup = s3Config.accessKeyId
  ? new S3BackupClient(
      s3Config.region,
      s3Config.accessKeyId,
      s3Config.secretAccessKey,
      s3Config.bucketName,
      { endpoint: s3Config.endpoint, appName: 'nft' }
    )
  : undefined

if (!backup) {
  console.warn('⚠️ AWS S3 backups disabled')
}

const sentryOptions = {
  dsn: secrets.sentry,
  allowedHeaders: ['user-agent', 'x-client'],
  allowedSearchParams: /(.*)/,
  debug: false,
  environment: ENV,
  rewriteFrames: {
    root: '/',
  },
  release: VERSION,
  pkg,
}

/**
 * Obtains a route context object.
 *
 * @param {FetchEvent} event
 * @param {Record<string, string>} params Parameters from the URL
 * @returns {import('../bindings').RouteContext}
 */
export function getContext(event, params) {
  const sentry = new Toucan({
    event,
    ...sentryOptions,
  })
  const log = new Logging(event, {
    token: secrets.logtail,
    debug: isDebug,
    sentry,
  })
  return { params, db, backup, log }
}
