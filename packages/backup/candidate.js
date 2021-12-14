import debug from 'debug'
import { CID } from 'multiformats'

const log = debug('backup:candidate')

const GET_UPLOADS = `
  SELECT id::TEXT, source_cid, user_id::TEXT
    FROM upload
   WHERE inserted_at > $1
     AND id <> ANY(SELECT upload_id FROM backup)
ORDER BY inserted_at ASC
  OFFSET $2
   LIMIT $3
`

/**
 * Fetch a list of CIDs that need to be backed up.
 *
 * @param {import('pg').Client} db Postgres client.
 * @param {Date} [startDate]
 * @returns {AsyncIterableIterator<import('./bindings').BackupCandidate>}
 */
export async function * getCandidate (db, startDate = new Date(0)) {
  let offset = 0
  const limit = 10000
  let total = 0
  while (true) {
    log(`fetching ${limit} uploads since ${startDate.toISOString()}`)
    const { rows: uploads, rowCount } = await db.query(GET_UPLOADS, [
      startDate.toISOString(),
      offset,
      limit
    ])
    if (!uploads.length) break

    log(`processing ${total + uploads.length}/${rowCount}`)
    for (const upload of uploads) {
      yield {
        sourceCid: CID.parse(upload.source_cid),
        userId: String(upload.user_id),
        uploadId: String(upload.id)
      }
    }

    offset += limit
    total += uploads.length
  }
}
