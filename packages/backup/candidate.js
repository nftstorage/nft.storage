import debug from 'debug'
import { CID } from 'multiformats'
import formatNumber from 'format-number'

const fmt = formatNumber()

const log = debug('backup:candidate')

const COUNT_UPLOADS = `
  SELECT COUNT(*)
    FROM upload
   WHERE inserted_at > $1
     AND id <> ANY(SELECT upload_id FROM backup)
`

const GET_UPLOADS = `
  SELECT id::TEXT, source_cid, content_cid, user_id::TEXT
    FROM upload
   WHERE inserted_at > $1
     AND id <> ANY(SELECT upload_id FROM backup)
ORDER BY inserted_at ASC
  OFFSET $2
   LIMIT $3
`

async function countUploads(db, startDate) {
  const { rows } = await db.query(COUNT_UPLOADS, [startDate.toISOString()])
  return rows[0].count
}

/**
 * Fetch a list of CIDs that need to be backed up.
 *
 * @param {import('pg').Client} db Postgres client.
 * @param {import('./bindings').BackupCandidate['app']} app
 * @param {Date} [startDate]
 */
export async function* getCandidate(db, app, startDate = new Date(0)) {
  const totalCandidates = await countUploads(db, startDate)
  let offset = 0
  const limit = 10000
  let total = 0
  while (true) {
    log(`fetching ${fmt(limit)} uploads since ${startDate.toISOString()}`)
    const { rows: uploads } = await db.query(GET_UPLOADS, [
      startDate.toISOString(),
      offset,
      limit,
    ])
    if (!uploads.length) break

    log(`processing ${fmt(total + uploads.length)}/${fmt(totalCandidates)}`)
    for (const upload of uploads) {
      /** @type {import('./bindings').BackupCandidate} */
      const candidate = {
        sourceCid: CID.parse(upload.source_cid),
        contentCid: CID.parse(upload.content_cid),
        userId: String(upload.user_id),
        uploadId: String(upload.id),
        app,
      }
      yield candidate
    }

    offset += limit
    total += uploads.length
  }
}
