/**
 *
 * @param {string} date
 * @returns {boolean}
 */
export const isDate = date => {
  console.log(date)
  let _date = date
  _date = parseInt(_date) || _date
  return _date.length > 0 && new Date(_date).toString() !== 'Invalid Date'
}

/**
 * @param {string} binStart
 * @param {string} binEnd
 * @returns {boolean}
 */
export const checkIsBinRange = (binStart, binEnd) =>
  isDate(binEnd) && isDate(binStart) && binStart < binEnd

export const dateInSeconds = date =>
  isDate(date) ? Math.round(new Date(date).getTime() / 1000) : 0
