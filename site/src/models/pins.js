import { stores } from '../constants.js'

/** @typedef {{ status: import('../bindings.js').PinStatus, size: number, created: string }} Pin */

/**
 * @param {string} cid CID of the pin
 * @returns {Promise<Pin>}
 */
export const get = async (cid) => {
  const { metadata } = await stores.pins.getWithMetadata(cid)
  // @ts-ignore
  return metadata
}

/**
 * @param {string} cid CID of the pin
 * @param {Pin} pin
 * @returns {Promise<void>}
 */
export const set = async (cid, pin) => {
  if (pin.status !== 'pinned' && pin.status !== 'failed') {
    await Promise.all([
      stores.pins.put(cid, '', { metadata: pin }),
      stores.followups.put(cid, '', { metadata: pin }),
    ])
  } else {
    await stores.pins.put(cid, '', { metadata: pin })
  }
}

/**
 * @returns {AsyncIterable<[string, Pin]>}
 */
export async function* entries() {
  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const list = await stores.pins.list({ cursor })
    for (const k of list.keys) {
      if (k == null) continue
      yield [k.name, k.metadata]
    }
    cursor = list.cursor
    done = list.list_complete
  }
}
