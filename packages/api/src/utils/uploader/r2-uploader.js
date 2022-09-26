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
   * @param {string} rootCid
   * @param {import('../../bindings').DagStructure} [structure]
   */
  async uploadCar(carBytes, carCid, userId, rootCid, structure = 'Unknown') {
    const key = `${carCid}/${carCid}.car`

    /** @type R2PutOptions */
    const opts = {
      // @ts-expect-error `sha256` is not added to @cloudflare/workers-types yet but is real
      sha256: uint8ArrayToString(carCid.multihash.digest, 'base16'), // put fails if hash not match
      customMetadata: {
        structure,
        rootCid,
        carCid: carCid.toString(),
      },
    }

    try {
      // assuming mostly unique cars, but could check for existence here before writing.
      await pRetry(async () => this._bucket.put(key, carBytes, opts), {
        retries: 3,
      })
      return {
        key,
        url: new URL(key, this._publicUrl.toString()),
      }
    } catch (cause) {
      throw new Error('Failed to upload CAR to R2', { cause })
    }
  }
}
