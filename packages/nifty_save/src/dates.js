/**
 *
 * @param {string} date
 * @returns {boolean}
 */
export const isDate = date =>
  date.length > 0 && new Date(date).toString() !== 'Invalid Date'

/**
 * @param {string} binStart
 * @param {string} binEnd
 * @returns {boolean}
 */
export const checkIsBinRange = (binStart, binEnd) =>
  isDate(binEnd) && isDate(binStart)
