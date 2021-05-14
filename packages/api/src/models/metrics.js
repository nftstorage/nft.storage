import { stores as metrics } from '../constants.js'

/**
 * @param {string} key
 * @returns {Promise<any>}
 */
export async function get(key) {
  return metrics.metrics.get(key, 'json')
}

/**
 * @param {string} key
 * @param {any} value
 * @returns {Promise<void>}
 */
export const set = async (key, value) => {
  await metrics.metrics.put(key, JSON.stringify(value))
}
