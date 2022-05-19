// @ts-ignore missing types
import { S3Client } from '@aws-sdk/client-s3/dist-es/S3Client.js'
// @ts-ignore missing types
import { PutObjectCommand } from '@aws-sdk/client-s3/dist-es/commands/PutObjectCommand.js'
import { sha256 } from 'multiformats/hashes/sha2'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

/**
 * @typedef {import('../bindings').BackupClient} BackupClient
 * @implements {BackupClient}
 */
export class S3BackupClient {
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
    this._s3 = new S3Client({
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
   * Gets a sha256 multihash digest of a blob.
   * @param {Blob} blob
   */
  async _getMultihash(blob) {
    const buf = await blob.arrayBuffer()
    return sha256.digest(new Uint8Array(buf))
  }

  /**
   * Gets base64pad-encoded string from a multihash
   * @param {import('multiformats').digest.MultihashDigest} multihash
   */
  _getAwsChecksum(multihash) {
    // strip the multihash varint prefix to get the raw sha256 digest for aws upload integrity check
    const rawSha256 = multihash.bytes.subarray(2)
    return uint8ArrayToString(rawSha256, 'base64pad')
  }

  /**
   * Backup given CAR file keyed by /raw/${rootCid}/${appName}-${userId}/${carHash}.car
   * @param {number} userId
   * @param {import('multiformats').CID} rootCid
   * @param {Blob} car
   * @param {import('../bindings').DagStructure} [structure]
   */
  async backupCar(userId, rootCid, car, structure = 'Unknown') {
    const multihash = await this._getMultihash(car)
    const hashStr = uint8ArrayToString(multihash.bytes, 'base32')
    const key = `raw/${rootCid}/${this._appName}-${userId}/${hashStr}.car`
    const cmdParams = {
      Bucket: this._bucketName,
      Key: key,
      Body: car,
      Metadata: { structure },
      // ChecksumSHA256 specifies the base64-encoded, 256-bit SHA-256 digest of the object, used as a data integrity check to verify that the data received is the same data that was originally sent.
      // see: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html#AmazonS3-PutObject-request-header-ChecksumSHA256
      ChecksumSHA256: this._getAwsChecksum(multihash),
    }
    /** @type {import('@aws-sdk/client-s3').PutObjectCommand} */

    try {
      await this._s3.send(new PutObjectCommand(cmdParams))
    } catch (/** @type {any} */ err) {
      if (err.name === 'BadDigest') {
        // s3 returns a 400 Bad Request `BadDigest` error if the hash does not match their calculation.
        // see: https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html#RESTErrorResponses
        // see: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html#troubleshooting
        console.log(
          'BadDigest: sha256 of data recieved did not match what we sent. Maybe bits flipped in transit. Retrying once.'
        )
        await this._s3.send(new PutObjectCommand(cmdParams))
      } else {
        throw err
      }
    }

    return new URL(key, this._baseUrl.toString())
  }
}
