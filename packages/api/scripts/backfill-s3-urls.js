import { S3Client } from '@aws-sdk/client-s3'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { getDbClient } from './cmds/db-sql.js'

/**
 * This script sets the `backup_urls` field for an upload by checking the storage on S3.
 *
 * See https://github.com/nftstorage/nft.storage/issues/1939 for motivation. TL;DR is that
 * a bug was causing us to only keep one backup url for chunked CAR uploads.
 */

async function entryPoint() {
  const context = await getContext()

  // bug was introduced in https://github.com/nftstorage/nft.storage/pull/1664
  // which was merged on 2022-03-17.
  const startDate = new Date('2022-03-17')
  const endDate = new Date()

  const uploads = await findUploadsWithMissingURLS(context, startDate, endDate)
  console.log(`Found ${uploads.length} uploads to check.`)
  console.log('here is the first one: ', uploads[0])

  process.exit(0)
}

// call the entry point fn
entryPoint().catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * @typedef {object} Context
 * @property {import('pg').Client} db
 * @property {import('@aws-sdk/client-s3').S3Client} s3
 * @property {string} s3BucketName
 * @property {URL} s3BaseURL
 *
 * @returns {Promise<Context>}
 */
async function getContext() {
  const dbConnection = getRequiredEnv('DATABASE_CONNECTION')
  const s3Region = getRequiredEnv('S3_REGION')
  const accessKeyId = getRequiredEnv('S3_ACCESS_KEY_ID')
  const secretAccessKey = getRequiredEnv('S3_SECRET_ACCESS_KEY')
  const s3BucketName = getRequiredEnv('S3_BUCKET_NAME')
  const s3Endpoint = process.env.S3_ENDPOINT

  const db = await getDbClient(dbConnection)
  const s3 = new S3Client({
    endpoint: s3Endpoint,
    forcePathStyle: !!s3Endpoint, // Force path if endpoint provided
    region: s3Region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  const s3BaseURL = s3Endpoint
    ? new URL(`${s3BucketName}/`, s3Endpoint)
    : new URL(`https://${s3BucketName}.s3.${s3Region}.amazonaws.com/`)

  return {
    db,
    s3,
    s3BucketName,
    s3BaseURL,
  }
}

/**
 * Queries the database to find uploads that may be missing backup_urls.
 *
 * Assumes that any upload with an `updated_at` > `inserted_at` is potentially
 * a chunked upload and may be missing one or more backup urls. Since the uploads
 * affected by the bug all have a single `backup_url`, we can further filter out
 * any rows with more than one `backup_url`.
 *
 * @param {Context} context
 * @param {Date} startDate
 * @param {Date} endDate
 *
 * @typedef {object} ResultRow
 * @property {string} id
 * @property {string} source_cid
 * @property {string} user_id
 *
 * @returns {Promise<ResultRow[]>}
 */
async function findUploadsWithMissingURLS(context, startDate, endDate) {
  const { db } = context

  console.log('querying db. start / end dates: ', startDate, endDate)

  const res = await db.query(
    'SELECT id, source_cid, user_id FROM upload' +
      ' WHERE updated_at >= $1 AND updated_at <= $2' +
      ' AND updated_at > inserted_at ' +
      ' AND cardinality(backup_urls) < 2' +
      ';',
    [startDate, endDate]
  )

  return res.rows
}

/**
 *
 * @param {Context} context
 * @param {string} sourceCid
 * @param {string} userId
 * @param {string} appName - name of uploading app. always "nft" for production uploads
 *
 * @returns {AsyncGenerator<URL>} all discovered backup URLs for the given cid+userId
 */
async function* getBackupURLsFromS3(
  context,
  sourceCid,
  userId,
  appName = 'nft'
) {
  const uploadDirPrefix = `raw/${sourceCid}/${appName}-${userId}/`

  for await (const key of listObjects(context, uploadDirPrefix)) {
    yield new URL(key, context.s3BaseURL.toString())
  }
}

/**
 *
 * @param {Context} context
 * @param {string} prefix - prefix (directory path) to list
 * @param {string|undefined} continuationToken - used to recursively fetch objects if more than 1000 keys match
 *
 * @returns {AsyncGenerator<string>} - yields the full key of each object found under the given prefix
 */
async function* listObjects(context, prefix, continuationToken = undefined) {
  const cmd = new ListObjectsV2Command({
    Bucket: context.s3BucketName,
    Prefix: prefix,
    ContinuationToken: continuationToken,
  })
  /** @type {import('@aws-sdk/client-s3').ListObjectsV2CommandOutput} */
  const response = await context.s3.send(cmd)
  const contents = response.Contents || []
  for (const obj of contents) {
    if (obj.Key) {
      yield obj.Key
    }
  }

  if (response.IsTruncated && response.NextContinuationToken) {
    for await (const key of listObjects(
      context,
      prefix,
      response.NextContinuationToken
    )) {
      yield key
    }
  }
}

/**
 * @param {string} key
 * @returns {string} process.env[key]
 * @throws if env var is not set
 */
function getRequiredEnv(key) {
  const val = process.env[key]
  if (val === undefined) {
    throw new Error('missing env var ' + key)
  }
  return val
}
