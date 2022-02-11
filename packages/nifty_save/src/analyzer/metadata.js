import AWS from 'aws-sdk'
import fetch from 'node-fetch'
export async function parse() {
  return {}
}

const httpsPrefix = 'https://'
const httpPrefix = 'http://'
const ipfsPrefix = 'ipfs://'
const dataPrefix = 'data:'
const jsonPrefix = 'application/json'
const base64Prefix = 'base64,'

export async function detectFormat(input) {
  if (input === '') {
    return 'EMPTY'
  }

  if (input.startsWith(httpsPrefix)) {
    return 'HTTPS'
  }

  if (input.startsWith(httpPrefix)) {
    return 'HTTP'
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

export const detectTokenURIFormat = async (tokenUri) =>
  await detectFormat(tokenUri)

export function cleanJSON(tokenURI) {
  const data = tokenURI.replace(`${dataPrefix}${jsonPrefix},`, '')
  return JSON.parse(decodeURI(data))
}

const fetchMetadata = async (route) =>
  await fetch(route, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then((r) => r.json())

export async function tokenUriToJSON(tokenURI) {
  let tokenURIFormat = await detectTokenURIFormat(tokenURI)

  if (tokenURIFormat === 'EMPTY') {
    return {}
  }

  if (tokenURIFormat === 'JSON') {
    return cleanJSON(tokenURI)
  }

  if (tokenURIFormat === 'HTTPS' || tokenURIFormat === 'HTTP') {
    const results = await fetchMetadata(tokenURI)
    return results
  }

  return tokenURI
}
