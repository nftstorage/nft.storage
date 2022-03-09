import Toucan from 'toucan-js'
import { DBClient } from './db-client.js'
import { S3BackupClient } from './s3-backup-client.js'
import { secrets, database, isDebug, s3 as s3Config } from '../constants.js'
import { Logging } from './logs.js'
import pkg from '../../package.json'
import { Service } from 'ucan-storage/service'

const db = new DBClient(database.url, secrets.database)

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
 * @returns {Promise<import('../bindings').RouteContext>}
 */
export async function getContext(event, params) {
  const sentry = new Toucan({
    event,
    ...sentryOptions,
  })
  const log = new Logging(event, {
    token: secrets.logtail,
    debug: isDebug,
    sentry,
  })

  const ucanService = await Service.fromPrivateKey(secrets.privateKey)
  return { params, db, backup, log, ucanService }
}
