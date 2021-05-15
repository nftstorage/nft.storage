import * as cluster from '../cluster.js'
import * as pins from '../models/pins.js'
import * as pinataQueue from '../models/pinata-queue.js'
import * as pinata from '../pinata.js'

/**
 * Submits CIDs to Pinata for pinning.
 *
 * @param {import('../bindings.js').CronContext} ctx
 */
export async function processPinataQueue({ sentry }) {
  for await (const [key, item] of pinataQueue.entries()) {
    try {
      await pinata.pinByHash(item.cid, {
        pinataOptions: { hostNodes: item.origins },
      })
      await pinataQueue.remove(key)
    } catch (err) {
      console.error(`${item.cid}: failed to pin to pinata`, err)
      sentry.captureException(err)
    }
  }
}
