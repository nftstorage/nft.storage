import pRetry from 'p-retry'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

/**
 * @typedef {import('../../bindings').Uploader} Uploader
 * @implements {Uploader}
 */
export class R2Uploader {
  /**
   * @param {R2Bucket} bucket
   * @param {string} publicUrl
   */
  constructor(bucket, publicUrl) {
    if (!bucket) throw new Error('missing R2 bucket')
    if (!publicUrl) throw new Error('missing public url for R2 bucket')

    /**
     * @private
     */
    this._bucket = bucket

    /**
     * @private
     */
    this._publicUrl = new URL(publicUrl)
  }

  /**
   * Backup given CAR file keyed by ${carCid}/${carCid}.car
   * @param {Uint8Array} carBytes
   * @param {import('multiformats').CID} carCid
   * @param {number} userId
   * @param {import('../../bindings').BackupMetadata} metadata
   */
  async uploadCar(carBytes, carCid, userId, metadata) {
    const key = `${carCid}/${carCid}.car`
    const url = new URL(key, this._publicUrl.toString())

    /** @type R2PutOptions */
    const opts = {
      sha256: uint8ArrayToString(carCid.multihash.digest, 'base16'), // put fails if hash not match
      customMetadata: metadata,
    }

    const put = () => this._bucket.put(key, carBytes, opts)

    try {
      await pRetry(put, { retries: 3, onFailedAttempt: console.log })
      return { key, url }
    } catch (cause) {
      // @ts-expect-error wen ts understand Error object?
      throw new Error('Failed to upload CAR to R2', { cause })
    }
  }
}
