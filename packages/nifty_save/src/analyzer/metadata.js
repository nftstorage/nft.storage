import AWS from 'aws-sdk'

export async function parse() {
  return {}
}

const httpsPrefix = 'https://'
const ipfsPrefix = 'ipfs://'
const dataPrefix = 'data:'
const jsonPrefix = 'application/json'
const base64Prefix = 'base64,'

export function detectFormat(input) {
  if (input.startsWith(httpsPrefix)) {
    return 'HTTPS'
  }

  if (input.startsWith(ipfsPrefix)) {
    return 'IPFS'
  }

  const isData = input.startsWith(dataPrefix)

  if (isData) {
    const next = input.slice(dataPrefix.length)
    const isJSON = next.startsWith(jsonPrefix)

    if (isJSON) {
      const next = input.slice(dataPrefix.length + jsonPrefix.length)
      if (next.startsWith(`;${base64Prefix}`)) {
        return 'BASE64'
      }
      return 'JSON'
    }
  }

  return 'UNKNOWN_FORMAT'
}

export const detectTokenURIFormat = (tokenUri) => detectFormat(tokenUri)

export function cleanJSON(tokenURI) {
  const data = tokenURI.replace(`${dataPrefix}${jsonPrefix},`, '')
  return JSON.parse(decodeURI(data))
}

export async function tokenUriToJSON(tokenURI) {
  let tokenURIFormat = detectTokenURIFormat(tokenURI)

  if (tokenURIFormat === 'JSON') {
    return cleanJSON(tokenURI)
  }

  return tokenURI
}
