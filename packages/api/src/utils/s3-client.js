// @ts-ignore missing types
import { S3Client as AwsS3Client } from '@aws-sdk/client-s3/dist-es/S3Client.js'
// @ts-ignore missing types
import { PutObjectCommand } from '@aws-sdk/client-s3/dist-es/commands/PutObjectCommand.js'
import { sha256 } from 'multiformats/hashes/sha2'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

export class S3Client {
  /**
   * @param {string} region
   * @param {string} accessKeyId
   * @param {string} secretAccessKey
   * @param {string} bucketName
   * @param {object} [options]
   * @param {string} [options.endpoint]
   */
  constructor(region, accessKeyId, secretAccessKey, bucketName, options = {}) {
    if (!region) throw new Error('missing region')
    if (!accessKeyId) throw new Error('missing access key ID')
    if (!secretAccessKey) throw new Error('missing secret access key')
    if (!bucketName) throw new Error('missing bucket name')
    /**
     * @private
     * @type {import('@aws-sdk/client-s3').S3Client}
     */
    this._s3 = new AwsS3Client({
      endpoint: options.endpoint,
      forcePathStyle: !!options.endpoint, // Force path if endpoint provided
      region,
      credentials: { accessKeyId, secretAccessKey },
    })
    /**
     * @private
     */
    this._baseUrl = options.endpoint
      ? new URL(`${bucketName}/`, options.endpoint)
      : new URL(`https://${bucketName}.s3.${region}.amazonaws.com/`)
    /**
     * @private
     */
    this._bucketName = bucketName
  }

  /**
   * Backup given CAR file keyed by /raw/${rootCid}/${userId}/${carHash}.car
   * @param {number} userId
   * @param {import('multiformats').CID} rootCid
   * @param {Blob} car
   */
  async backupCar(userId, rootCid, car) {
    const buf = await car.arrayBuffer()
    const dataHash = await sha256.digest(new Uint8Array(buf))
    const key = `raw/${rootCid}/${userId}/${uint8ArrayToString(
      dataHash.bytes,
      'base32'
    )}.car`
    const bucket = this._bucketName
    const cmdParams = { Bucket: bucket, Key: key, Body: car }
    /** @type {import('@aws-sdk/client-s3').PutObjectCommand} */
    const cmd = new PutObjectCommand(cmdParams)
    await this._s3.send(cmd)
    return new URL(key, this._baseUrl.toString())
  }
}
