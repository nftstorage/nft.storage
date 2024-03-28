import pRetry from 'p-retry'
import { LinkIndexer } from 'linkdex'
import { CarBlockIterator } from '@ipld/car'
import { LinkdexError } from '../errors'

export const MissingApiUrlCode = 'ERR_MISSING_API_URL'

/**
 * Fetch DAG structure from remote linkdex-api
 * It iterates the blocks in the CARs in S3.
 */
export class LinkdexApi {
  /**
   * @param {object} config
   * @param {URL} [config.apiUrl]
   * @param {R2Bucket} config.bucket Bucket where CARs are stored.
   */
  constructor({ apiUrl, bucket }) {
    this.linkdexUrl = apiUrl
    this.bucket = bucket
  }

  /**
   * @param {string} s3Key
   * @returns {Promise<import('../bindings').DagStructure>}
   */
  async getDagStructure(s3Key) {
    const apiUrl = this.linkdexUrl
    if (!apiUrl)
      throw Object.assign(new Error('missing linkdex API url'), {
        code: MissingApiUrlCode,
      })
    const fetchFromApi = async () => {
      const url = new URL(`/?key=${s3Key}`, apiUrl.toString())
      const res = await fetch(url.toString())
      if (!res.ok) {
        throw new LinkdexError(res.status, res.statusText)
      }
      const report = await res.json()
      if (!report.structure) {
        throw new Error('linkdex-api report missing structure property')
      }
      return report.structure
    }
    return pRetry(fetchFromApi, {
      retries: 3,
      onFailedAttempt: (err) => console.log('LinkdexApi Error', err),
    })
  }

  /** @param {import('@web3-storage/w3up-client/types').CARLink[]} cids */
  async getDagStructureForCars(cids) {
    const index = new LinkIndexer()
    await Promise.all(
      cids.map(async (cid) => {
        const key = `${cid}/${cid}.car`
        const res = await this.bucket.get(key)
        if (!res || !res.body) throw new Error(`failed to get CAR: ${cid}`)
        const carBlocks = await CarBlockIterator.fromIterable(res.body)
        for await (const block of carBlocks) {
          // @ts-expect-error block types not match up
          index.decodeAndIndex(block)
        }
      })
    )
    return index.getDagStructureLabel()
  }
}
