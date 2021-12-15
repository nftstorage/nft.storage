import debug from 'debug'

const log = debug('backup:register')

const INSERT_BACKUP = 'INSERT INTO backup (upload_id, url) VALUES ($1, $2)'

/**
 * @param {import('pg').Client} db
 */
export function registerBackup(db) {
  /**
   * @param {AsyncIterable<import('./bindings').RemoteBackup} source
   */
  return async function (source) {
    for await (const bak of source) {
      log(`saving backup for upload ${bak.uploadId}: ${bak.backupUrl}`)
      await db.query(INSERT_BACKUP, [bak.uploadId, bak.backupUrl.toString()])
      log('done')
    }
  }
}
