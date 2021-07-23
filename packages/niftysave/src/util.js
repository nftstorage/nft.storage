/**
 * @param {URL} url
 */
export const printURL = (url) =>
  url.protocol === 'data:'
    ? `${url.href.slice(0, 8)}...${url.href.slice(-4)}}`
    : url.href
