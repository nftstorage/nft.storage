import { getMagicUserToken } from './magic'
import constants from './constants'
import { NFTStorage } from 'nft.storage'

const API = constants.API

export async function getStorageClient() {
  return new NFTStorage({
    token: await getMagicUserToken(),
    endpoint: new URL(API + '/'),
  })
}

/**
 *
 * @param {string} route
 * @param {object} fetchOptions options to pass through to `fetch`
 * @returns
 */
export async function fetchAuthenticated(route, fetchOptions = {}) {
  if (!route.startsWith('/')) {
    route = '/' + route
  }
  const url = API + route
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (await getMagicUserToken()),
    },
    ...fetchOptions,
  }

  const res = await fetch(url, options)

  const body = await res.json()

  if (body.ok) {
    return body
  } else {
    throw new Error(body.error.message)
  }
}

/**
 * Get tokens
 */
export async function getTokens() {
  return (await fetchAuthenticated('/internal/tokens')).value
}

/**
 * Delete Token
 *
 * @param {string} name
 */
export async function deleteToken(name) {
  return fetchAuthenticated('/internal/tokens', {
    method: 'DELETE',
    body: JSON.stringify({ id: name }),
  })
}

/**
 * Create Token
 *
 * @param {string} name
 */
export async function createToken(name) {
  return fetchAuthenticated('/internal/tokens', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })
}

/**
 * Get NFTs
 *
 * @param {{limit: number, before: string }} query
 */
export async function getNfts({ limit, before }) {
  const params = new URLSearchParams({ before, limit: String(limit) })
  const result = await fetchAuthenticated(`/?${params}`)
  return result.value.filter(Boolean)
}

export async function getUserTags() {
  return (await fetchAuthenticated('/user/tags')).value
}

export async function getVersion() {
  const route = '/version'
  const res = await fetch(`${API}${route}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.ok) {
    return await res.json()
  } else {
    throw new Error(`failed to get version ${res.status} - ${res.statusText}`)
  }
}

export async function getStats() {
  const res = await fetch(`${API}/stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.ok) {
    return res.json()
  }
  throw new Error(`failed to get stats: ${res.status} - ${res.statusText}`)
}
