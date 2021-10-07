import { stores } from '../constants.js'

/**
 * Adds an event to the EVENTS store.
 *
 * @param {string} name Arbitrary event identifier.
 * @param {any} [data] Information about the event (<1024 bytes).
 * @returns {Promise<void>}
 */
export async function add(name, data = {}) {
  await stores.events.put(new Date().toISOString(), '', {
    metadata: { name, data },
  })
}
