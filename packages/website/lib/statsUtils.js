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

  const dealsSizeGrowthRate = calcuateGrowthRate(
    stats.deals_size_total,
    stats.deals_size_total_prev
  )

  return { ...stats, totalUploads, growthRate, dealsSizeGrowthRate }
}
