import _ from 'lodash/fp'

const uploadKeysToSum = [
  'uploads_blob_total',
  'uploads_car_total',
  'uploads_nft_total',
  'uploads_remote_total',
  'uploads_multipart_total',
]

function uploadsTotal(obj) {
  const total = Object.keys(obj).reduce((acc, key) => {
    if (uploadKeysToSum.includes(key)) {
      return acc + obj[key]
    }
    return acc
  }, 0)

  const totalBefore = total - obj.uploads_past_7_total
  const uploadsGrowthRate = calcuateGrowthRate(total, totalBefore)

  return { ...obj, totalUploads: total, growthRate: uploadsGrowthRate }
}

export function calcuateGrowthRate(total, totalBefore) {
  try {
    return parseFloat(((total - totalBefore) / totalBefore) * 100).toFixed(2)
  } catch (e) {
    throw new Error(`Could not calculate growth rate: ${e}`)
  }
}

const decorateAdditionalCalculatedValues = _.pipe(uploadsTotal)

export default decorateAdditionalCalculatedValues
