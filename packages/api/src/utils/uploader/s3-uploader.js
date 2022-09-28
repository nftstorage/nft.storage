import pRetry from 'p-retry'
// @ts-ignore missing types
import { S3Client } from '@aws-sdk/client-s3/dist-es/S3Client.js'
// @ts-ignore missing types
import { PutObjectCommand } from '@aws-sdk/client-s3/dist-es/commands/PutObjectCommand.js'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

/**
 * @typedef {import('../../bindings').Uploader} Uploader
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
   * Backup given CAR file keyed by /raw/${rootCid}/${appName}-${userId}/${carHash}.car
   * @param {Uint8Array} carBytes
   * @param {import('multiformats').CID} carCid
   * @param {number} userId
   * @param {import('../../bindings').BackupMetadata} metadata
   */
  async uploadCar(carBytes, carCid, userId, metadata) {
    const carHash = uint8ArrayToString(carCid.multihash.bytes, 'base32')
    const key = `raw/${metadata.rootCid}/${this._appName}-${userId}/${carHash}.car`
    const url = new URL(key, this._baseUrl.toString())

    /** @type {import('@aws-sdk/client-s3').PutObjectCommandInput} */
    const opts = {
      Bucket: this._bucketName,
      Key: key,
      Body: carBytes,
      Metadata: metadata,
      // ChecksumSHA256 specifies the base64-encoded, 256-bit SHA-256 digest of the object, used as a data integrity check to verify that the data received is the same data that was originally sent.
      // see: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html#AmazonS3-PutObject-request-header-ChecksumSHA256
      ChecksumSHA256: uint8ArrayToString(carCid.multihash.digest, 'base64pad'),
    }

    const put = () => this._s3.send(new PutObjectCommand(opts))

    try {
      await pRetry(put, { retries: 3 })
      return { key, url }
    } catch (cause) {
      // @ts-expect-error
      throw new Error('Failed to upload CAR to S3', { cause })
    }
  }
}
