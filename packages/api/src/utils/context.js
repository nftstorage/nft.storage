import Toucan from 'toucan-js'
import { DBClient } from './db-client.js'
import { S3BackupClient } from './s3-backup-client.js'
import { getServiceConfig } from '../config.js'
import { Logging } from './logs.js'
import pkg from '../../package.json'
import { Service } from 'ucan-storage/service'

const { runtimeEnvironment, version, isDebugBuild, secrets, external } =
  getServiceConfig()

const db = new DBClient(external.database.url, external.database.authToken)

const backup = external.s3.accessKeyId
  ? new S3BackupClient(
      external.s3.region,
      external.s3.accessKeyId,
      external.s3.secretAccessKey,
      external.s3.bucketName,
      { endpoint: external.s3.endpoint, appName: 'nft' }
    )
  : undefined

if (!backup) {
  console.warn('⚠️ AWS S3 backups disabled')
}

const sentryOptions = {
  dsn: external.sentry.dsn,
  allowedHeaders: ['user-agent', 'x-client'],
  allowedSearchParams: /(.*)/,
  debug: false,
  environment: runtimeEnvironment,
  rewriteFrames: {
    root: '/',
  },
  release: version.semver,
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
    token: external.logtail.authToken,
    debug: isDebugBuild,
    sentry,
  })

  const ucanService = await Service.fromPrivateKey(secrets.ucanPrivateKey)
  return { params, db, backup, log, ucanService }
}
