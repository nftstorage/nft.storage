import fs from 'fs'
import debug from 'debug'

const log = debug('backup:remote')

/**
 * @param {S3Client} s3
 */
export function uploadCar (s3) {
  /**
   * @param {AsyncIterable<import('./bindings').LocalBackup} source
   * @returns {AsyncIterableIterator<import('./bindings').RemoteBackup>}
   */
  return async function * (source) {
    for await (const localBackup of source) {
      const backupUrl = await s3Upload(s3, c)
      log(`removing local backup at ${localBackup.filePath}`)
      await fs.promises.rm(localBackup.filePath)
      yield { ...c, backupUrl }
    }
  }
}

async function s3Upload (s3, { sourceCid, userId, origin }) {

}
