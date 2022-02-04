/**
 *
 * @param {string} date
 * @returns {boolean}
 */
export const isDate = (date) => {
  let _date = date
  //TODO: differntiate betwenn weird dates and nums differntly
  const asTime = parseInt(date)
  _date = asTime > new Date('2017').getTime() ? asTime : _date
  const hasVal = _date.length > 0 || _date > 0
  return hasVal && new Date(_date).toString() !== 'Invalid Date'
}

/**
 * @param {string} binStart
 * @param {string} binEnd
 * @returns {boolean}
 */
export const checkIsBinRange = (binStart, binEnd) =>
  isDate(binEnd) && isDate(binStart)

export const dateInSeconds = (date) =>
  isDate(date) ? Math.round(new Date(date).getTime() / 1000) : 0
