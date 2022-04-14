/**
 * If it's a different day, it returns the day, otherwise it returns the hour
 * @param {*} timestamp
 * @returns {string}
 */
export function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

/**
 * If it's a different day, it returns the day, otherwise it returns the hour
 * @param {string} cid
 * @returns {string}
 */
export function truncateCID(cid) {
  return `${cid.substring(0, 8)}...${cid.substring(cid.length - 8)}`
}
