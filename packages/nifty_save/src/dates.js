/**
 *
 * @param {string} date
 * @returns {boolean}
 */
export const isDate = date => {
  console.log(date)
  let _date = date
  //todo differntiate betwenn weird dates and nums differntly

  const asTime = parseInt(date)

  _date = asTime > new Date('2017').getTime() ? asTime : _date
  console.log(_date, new Date(_date))
  return _date.length > 0 && new Date(_date).toString() !== 'Invalid Date'
}

/**
 * @param {string} binStart
 * @param {string} binEnd
 * @returns {boolean}
 */
export const checkIsBinRange = (binStart, binEnd) =>
  isDate(binEnd) && isDate(binStart)

export const dateInSeconds = date =>
  isDate(date) ? Math.round(new Date(date).getTime() / 1000) : 0
