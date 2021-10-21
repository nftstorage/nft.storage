import { DBClient } from './db-client.js'
import { S3Client } from './s3-client.js'
import { getSentry } from './debug.js'
import { secrets, database, s3 as s3Config } from '../constants.js'

const db = new DBClient(database.url, secrets.database)

const s3 = s3Config.accessKeyId
  ? new S3Client(
      s3Config.region,
      s3Config.accessKeyId,
      s3Config.secretAccessKey,
      s3Config.bucketName,
      { endpoint: s3Config.endpoint }
    )
  : undefined

if (!s3) {
  console.warn('⚠️ AWS S3 backups disabled')
}

/**
 * Obtains a route context object.
 *
 * @param {FetchEvent} event
 * @param {Record<string, string>} params Parameters from the URL
 * @returns {import('../bindings').RouteContext}
 */
export function getContext(event, params) {
  const sentry = getSentry(event)
  return { params, sentry, db, s3 }
}
