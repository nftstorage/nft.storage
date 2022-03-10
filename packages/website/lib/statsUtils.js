import _ from 'lodash/fp'

const uploadKeysToSum = [
  'uploads_blob_total',
  'uploads_car_total',
  'uploads_nft_total',
  'uploads_remote_total',
  'uploads_multipart_total',
]

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
  const uploadsGrowthRate = calcuateGrowthRate(total, totalBefore)

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

const decorateAdditionalCalculatedValues = _.pipe(uploadsTotal)

export default decorateAdditionalCalculatedValues
