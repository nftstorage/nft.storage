import * as cluster from '../cluster.js'
import * as pins from '../models/pins.js'
import * as followups from '../models/followups.js'

export async function updatePinStatuses() {
  for await (const [cid, pin] of followups.entries()) {
    try {
      const pinStatus = cluster.toPSAStatus(await cluster.status(cid))
      if (pinStatus === pin.status) continue // not changed since last check
      const prevPin = { ...pin }
      pin.status = pinStatus
      // for successful pin we can update the size
      if (pinStatus === 'pinned') {
        pin.size = await cluster.dagSize(cid)
      }
      await pins.set(cid, pin) // Note: sets followup if status is not pinned or failed
      if (isPinnedOrFailed(pin.status)) {
        await followups.remove(cid)
      }
      console.log(
        `${cid}: status ${prevPin.status} => ${pin.status}, size ${prevPin.size} => ${pin.size}`
      )
    } catch (err) {
      console.error(
        `${cid}: failed to update pin status and size: ${err.stack}`
      )
    }
  }
}

/**
 * @param {string} status
 */
function isPinnedOrFailed(status) {
  return ['pinned', 'failed'].includes(status)
}
