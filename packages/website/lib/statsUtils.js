/**
 * Format Bytes
 * @param {number} bytes
 * @param {number} decimals
 * @returns {string}
 */
export function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals || 1
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i]
}

/**
 * Calculate Growth Rate
 * @param {any} total
 * @param {any} previousTotal
 * @returns {string}
 */
export function calcuateGrowthRate(total, previousTotal) {
  try {
    return (((total - previousTotal) / previousTotal) * 100).toFixed(2)
  } catch (e) {
    throw new Error(`Could not calculate growth rate: ${e}`)
  }
}

/** @type {string[]} */
const uploadKeysToSum = [
  'uploads_blob_total',
  'uploads_car_total',
  'uploads_nft_total',
  'uploads_remote_total',
  'uploads_multipart_total',
]

/**
 * Get Total Uploads
 * @param {any} stats
 * @param {any} keys
 * @returns {any}
 */
const getTotalUploads = (stats, keys) => {
  const keysToNumber = (/** @type {any} */ acc, /** @type {string} */ key) =>
    keys.includes(key) ? acc + stats[key] : acc
  return Object.keys(stats).reduce(keysToNumber, 0)
}

/**
 * Get Previous Total
 * @param {any} stats
 * @param {any} totalUploads
 * @returns {number}
 */
const getPreviousTotal = (stats, totalUploads) =>
  totalUploads - stats.uploads_past_7_total

/**
 * Format Bytes
 * @param {any} stats
 * @returns {any}
 */
export function calculateStats(stats) {
  let growthRate = '0'
  const totalUploads = getTotalUploads(stats, uploadKeysToSum)
  const previousTotal = getPreviousTotal(stats, totalUploads)

  if (previousTotal > 0) {
    growthRate = calcuateGrowthRate(totalUploads, previousTotal)
  }

  return { ...stats, totalUploads, growthRate }
}
