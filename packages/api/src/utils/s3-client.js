// @ts-ignore missing types
import { S3Client as AwsS3Client } from '@aws-sdk/client-s3/dist-es/S3Client.js'
// @ts-ignore missing types
import { PutObjectCommand } from '@aws-sdk/client-s3/dist-es/commands/PutObjectCommand.js'
import { sha256 } from 'multiformats/hashes/sha2'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

/**
 * @typedef {import('../bindings').BackupClient} BackupClient
 * @implements {BackupClient}
 */
export class S3Client {
  /**
   * @param {string} region
   * @param {string} accessKeyId
   * @param {string} secretAccessKey
   * @param {string} bucketName
   * @param {object} [options]
   * @param {string} [options.endpoint]
   * @param {string} [options.appName]
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
    /**
     * @private
     */
    this._appName = options.appName || 'app'
  }

  /**
   * Get a base32 encoded sha256 hash of the user ID, prefixed with appName to
   * avoid collisions.
   * @param {string} userId
   */
  async _getUserHash(userId) {
    const data = new TextEncoder().encode(`${this._appName}${userId}`)
    return await this._getDataHash(data)
  }

  /**
   * Gets a base32 encoded sha256 hash of the passed data.
   * @param {Uint8Array} data
   */
  async _getDataHash(data) {
    const dataHash = await sha256.digest(new Uint8Array(data))
    return uint8ArrayToString(dataHash.bytes, 'base32')
  }

  /**
   * Backup given CAR file keyed by /raw/${rootCid}/${appName}${userId}/${carHash}.car
   * @param {number} userId
   * @param {import('multiformats').CID} rootCid
   * @param {Blob} car
   * @param {import('../bindings').DagStructure} [structure]
   */
  async backupCar(userId, rootCid, car, structure = 'Unknown') {
    const buf = await car.arrayBuffer()
    const dataHash = await this._getDataHash(new Uint8Array(buf))
    const userHash = await this._getUserHash(userId.toString())
    const key = `raw/${rootCid}/${userHash}/${dataHash}.car`
    const bucket = this._bucketName
    const cmdParams = {
      Bucket: bucket,
      Key: key,
      Body: car,
      Metadata: { structure },
    }
    /** @type {import('@aws-sdk/client-s3').PutObjectCommand} */
    const cmd = new PutObjectCommand(cmdParams)
    await this._s3.send(cmd)
    return new URL(key, this._baseUrl.toString())
  }
}
