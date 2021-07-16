import fetch from '@web-std/fetch'

/**
 * @param {URL} resourceURL
 * @returns {Promise<Blob>}
 */

export const fetchWebResource = async (resourceURL) => {
  const response = await fetch(resourceURL.href)

  if (response.ok) {
    return await response.blob()
  } else {
    throw new Error(
      `Fetch error: Status ${response.status} ${response.statusText}`
    )
  }
}
