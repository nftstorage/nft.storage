/**
 * @param {S3Client} s3
 */
export function uploadCars(s3) {
  /**
   * @param {AsyncIterable<import('./bindings').LocalBackup} source
   * @returns {AsyncIterableIterator<import('./bindings').RemoteBackup>}
   */
  return async function* (source) {
    for await (const c of source) {
      const backupUrl = await uploadCar(c)
      yield { ...c, backupUrl }
    }
  }
}

async function uploadCar(s3, { sourceCid, userId, origin }) {}
