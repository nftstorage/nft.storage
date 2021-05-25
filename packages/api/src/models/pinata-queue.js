import { stores } from '../constants.js'

/**
 * Adds an item to the queue. If it already exists in the queue, the origins are
 * merged.
 *
 * @param {string} cid
 * @param {{ origins?: string[] }} [options]
 * @returns {Promise<void>}
 */
export async function add(cid, options = {}) {
  /** @type {{ value: string | null, metadata: { origins: string[] } | null }} */
  let { metadata } = await stores.pinataQueue.getWithMetadata(cid)
  if (metadata) {
    const oldOrigins = metadata.origins || []
    const newOrigins = options.origins || []
    const origins = Array.from(new Set([...newOrigins, ...oldOrigins]).values())
    metadata = { ...metadata, origins }
  } else {
    metadata = { origins: options.origins || [] }
  }
  await stores.pinataQueue.put(cid, '', { metadata })
}
