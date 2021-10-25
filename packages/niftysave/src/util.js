/**
 * @param {URL} url
 */
export const printURL = (url) =>
  url.protocol === 'data:'
    ? `${url.href.slice(0, 8)}...${url.href.slice(-4)}}`
    : url.href

/**
 * @param {Object} data
 * @param {PropertyKey[]} [path]
 * @returns {Iterable<[string|number|boolean|null, PropertyKey[]]>}
 */
export const iterate = function* (data, path = []) {
  if (Array.isArray(data)) {
    for (const [index, element] of data) {
      yield* iterate(element, [...path, index])
    }
  } else if (data && typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      yield* iterate(value, [...path, key])
    }
  } else {
    yield [data, path]
  }
}
