import AWS from 'aws-sdk'

export async function parse() {
  return {}
}

const httpsPrefix = 'https://'
const ipfsPrefix = 'ipfs://'
const dataPrefix = 'data:'
const jsonPrefix = 'application/json'
const base64Prefix = 'base64,'

export function detectTokenURIFormat(tokenURI) {
  if (tokenURI.startsWith(httpsPrefix)) {
    return 'HTTPS'
  }

  if (tokenURI.startsWith(ipfsPrefix)) {
    return 'IPFS'
  }

  const isData = tokenURI.startsWith(dataPrefix)

  if (isData) {
    const next = tokenURI.slice(dataPrefix.length)
    const isJSON = next.startsWith(jsonPrefix)

    if (isJSON) {
      const next = tokenURI.slice(dataPrefix.length + jsonPrefix.length)
      if (next.startsWith(`;${base64Prefix}`)) {
        return 'BASE64'
      }
      return 'JSON'
    }
  }

  return 'UNKNOWN_FORMAT'
}

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
