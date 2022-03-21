const pipe =
  (/** @type {any[]} */ ...fns) =>
  (/** @type {any} */ x) =>
    fns.reduce((v, f) => f(v), x)
const uploadKeysToSum = [
  'uploads_blob_total',
  'uploads_car_total',
  'uploads_nft_total',
  'uploads_remote_total',
  'uploads_multipart_total',
]

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
 * Uploads Total
 * @param {import('./types').StatsPayload} statsObject
 * @returns {any}
 */
function uploadsTotal(statsObject) {
  const total = Object.keys(statsObject).reduce((acc, key) => {
    if (uploadKeysToSum.includes(key)) {
      return acc + statsObject[key]
    }
    return acc
  }, 0)

  const totalBefore = total - statsObject.uploads_past_7_total
  const uploadsGrowthRate =
    totalBefore > 0 ? calcuateGrowthRate(total, totalBefore) : 0
  return { ...statsObject, totalUploads: total, growthRate: uploadsGrowthRate }
}

/**
 * Calculate Growth Rate
 * @param {number} total
 * @param {number} totalBefore
 * @returns {string}
 */
export function calcuateGrowthRate(total, totalBefore) {
  try {
    // open to suggestions on refactoring math
    return (((total - totalBefore) / totalBefore) * 100).toFixed(2)
  } catch (e) {
    throw new Error(`Could not calculate growth rate: ${e}`)
  }
}

const decorateAdditionalCalculatedValues = pipe(uploadsTotal)

export default decorateAdditionalCalculatedValues
