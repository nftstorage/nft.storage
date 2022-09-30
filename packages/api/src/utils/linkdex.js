import pRetry from 'p-retry'
import { LinkdexError } from '../errors'

/**
 * Fetch DAG structure from remote linkdex-api
 * It iterates the blocks in the CARs in S3.
 */
export class LinkdexApi {
  /**
   * @param {string} linkdexUrl
   */
  constructor(linkdexUrl) {
    this.linkdexUrl = new URL(linkdexUrl)
  }

  /**
   * @param {string} s3Key
   * @returns {Promise<import('../bindings').DagStructure>}
   */
  async getDagStructure(s3Key) {
    const fetchFromApi = async () => {
      const url = new URL(`/?key=${s3Key}`, this.linkdexUrl.toString())
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
}
