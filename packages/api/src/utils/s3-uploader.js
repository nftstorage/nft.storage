// @ts-ignore missing types
import { S3Client } from '@aws-sdk/client-s3/dist-es/S3Client.js'
// @ts-ignore missing types
import { PutObjectCommand } from '@aws-sdk/client-s3/dist-es/commands/PutObjectCommand.js'
import { sha256 } from 'multiformats/hashes/sha2'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

/**
 * @typedef {import('../bindings').Uploader} Uploader
 * @implements {Uploader}
 */
export class S3Uploader {
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

    // https://github.com/aws/aws-sdk-js-v3/issues/1941
    let endpoint
    if (options.endpoint) {
      const endpointUrl = new URL(options.endpoint)
      endpoint = { protocol: endpointUrl.protocol, hostname: endpointUrl.host }
    }

    /**
     * @private
     * @type {import('@aws-sdk/client-s3').S3Client}
     */
    this._s3 = new S3Client({
      endpoint,
      forcePathStyle: !!endpoint, // Force path if endpoint provided
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
   * @param {string} sourceCid
   * @param {Blob} car
   * @param {import('../bindings').DagStructure} [structure]
   */
  async uploadCar(userId, sourceCid, car, structure = 'Unknown') {
    const multihash = await this._getMultihash(car)
    const hashStr = uint8ArrayToString(multihash.bytes, 'base32')
    const key = `raw/${sourceCid}/${this._appName}-${userId}/${hashStr}.car`
    const cmdParams = {
      Bucket: this._bucketName,
      Key: key,
      Body: car,
      Metadata: { structure },
      // ChecksumSHA256 specifies the base64-encoded, 256-bit SHA-256 digest of the object, used as a data integrity check to verify that the data received is the same data that was originally sent.
      // see: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html#AmazonS3-PutObject-request-header-ChecksumSHA256
      ChecksumSHA256: this._getAwsChecksum(multihash),
    }

    try {
      try {
        await this._s3.send(new PutObjectCommand(cmdParams))
      } catch (err) {
        console.warn('Failed to upload CAR, retrying once...', err)
        await this._s3.send(new PutObjectCommand(cmdParams))
      }
    } catch (/** @type {any} */ err) {
      // @ts-ignore TS does not know about `cause` yet.
      throw new Error('Failed to upload CAR', { cause: err })
    }

    return new URL(key, this._baseUrl.toString())
  }
}
