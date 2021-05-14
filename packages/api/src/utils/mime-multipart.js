/**
 * @param {string | number | boolean} s
 */
export function stringToArray(s) {
  const utf8 = unescape(encodeURIComponent(s))
  return Uint8Array.from(utf8, (_, i) => utf8.charCodeAt(i))
}
/**
 * @param {number[]} a
 */
export function arrayToString(a) {
  const utf8 = String.fromCharCode.apply(null, a)
  return decodeURIComponent(escape(utf8))
}
/**
 * @param {any[]} arrays
 */
export function mergeArrays(...arrays) {
  const out = new Uint8Array(
    arrays.reduce((total, arr) => total + arr.length, 0)
  )
  let offset = 0
  for (const arr of arrays) {
    out.set(arr, offset)
    offset += arr.length
  }
  return out
}
