import debug from 'debug'
import { Upload } from '@aws-sdk/lib-storage'
import { Readable } from 'stream'

/**
 * @param {import('@aws-sdk/client-s3').S3Client} s3
 * @param {string} bucketName
 */
export function uploadCar(s3, bucketName) {
  /**
   * @param {AsyncIterable<import('./bindings').BackupContent} source
   */
  return async function* (source) {
    for await (const bak of source) {
      const backupUrl = await s3Upload(s3, bucketName, bak)
      /** @type {import('./bindings').RemoteBackup} */
      const backup = { ...bak, backupUrl }
      yield backup
    }
  }
}

/**
 * @param {import('@aws-sdk/client-s3').S3Client} s3
 * @param {string} bucketName
 * @param {import('./bindings').BackupContent} bak
 */
async function s3Upload(s3, bucketName, bak) {
  const log = debug(`backup:remote:${bak.sourceCid}`)
  const key = `complete/${bak.contentCid}.car`
  const region = await s3.config.region()
  const url = new URL(`https://${bucketName}.s3.${region}.amazonaws.com/${key}`)
  log(`uploading to ${url}`)
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: bucketName,
      Key: key,
      Body: Readable.from(bak.content),
      Metadata: { structure: 'Complete' },
    },
  })
  await upload.done()
  log('done')
  return url
}
