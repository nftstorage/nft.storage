import pRetry from 'p-retry'
import { sha256 } from 'multiformats/hashes/sha2'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import { createCarIndex } from '../car.js'

/**
 * @typedef {import('../../bindings').Uploader} Uploader
 * @implements {Uploader}
 */
export class R2Uploader {
  /**
   * @param {object} config
   * @param {R2Bucket} config.carpark
   * @param {R2Bucket} config.dudewhere
   * @param {R2Bucket} config.satnav
   * @param {string} config.publicUrl
   */
  constructor({ carpark, dudewhere, satnav, publicUrl }) {
    if (!carpark) throw new Error('missing carpark R2 bucket')
    if (!dudewhere) throw new Error('missing dudewhere R2 bucket')
    if (!satnav) throw new Error('missing satnav R2 bucket')
    if (!publicUrl) throw new Error('missing public url for carpark R2 bucket')
    this._carpark = carpark
    this._dudewhere = dudewhere
    this._satnav = satnav
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

    const put = () => this._carpark.put(key, carBytes, opts)

    try {
      await pRetry(put, { retries: 3, onFailedAttempt: console.log })
      await Promise.all([
        this.uploadDudeWhereLink(metadata.rootCid, carCid),
        this.uploadSatNavIndex(carBytes, carCid),
      ])
      return { key, url }
    } catch (cause) {
      // @ts-expect-error wen ts understand Error object?
      throw new Error(`Failed to upload CAR to R2: ${key}`, { cause })
    }
  }

  /**
   * Write a CARv2 index for the passed CAR file to R2.
   * @param {import('multiformats').CID} carCid
   * @param {Uint8Array} carBytes
   */
  async uploadSatNavIndex(carBytes, carCid) {
    const indexBytes = await createCarIndex(carBytes)
    const digest = await sha256.encode(indexBytes)
    const key = `${carCid}/${carCid}.car.idx`
    const opts = { sha256: uint8ArrayToString(digest, 'base16') }
    try {
      return await pRetry(async () => this._satnav.put(key, indexBytes, opts), {
        retries: 3,
      })
    } catch (cause) {
      // @ts-expect-error error.cause is legit.
      throw new Error(`Failed to write satnav index to R2: ${key}`, { cause })
    }
  }

  /**
   * @param {string} rootCid
   * @param {import('multiformats').CID} carCid
   */
  async uploadDudeWhereLink(rootCid, carCid) {
    const key = `${rootCid}/${carCid}`
    const data = new Uint8Array()
    try {
      return await pRetry(async () => this._dudewhere.put(key, data), {
        retries: 3,
      })
    } catch (cause) {
      // @ts-expect-error error.cause is legit.
      throw new Error(`Failed to write dudewhere index to R2: ${key}`, {
        cause,
      })
    }
  }
}
