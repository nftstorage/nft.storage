import { getMagic } from './magic'
import constants from './constants'

export const API = constants.API

const LIFESPAN = 60 * 60 * 2 // 2 hours
/** @type {string | undefined} */
let token
let created = Date.now() / 1000

export async function getToken() {
  const magic = getMagic()
  const now = Date.now() / 1000

  const loggedIn = await getIsLoggedIn()
  if (loggedIn) return token || ''

  if (token === undefined || now - created > LIFESPAN - 10) {
    token = await magic.user.getIdToken({ lifespan: LIFESPAN })
    created = Date.now() / 1000
  }
  return token
}

export async function getIsLoggedIn() {
  const loggedIn = await fetch(`${API}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
  return loggedIn.ok || false
}

/**
 * @param {string} version
 */
export async function getTokens(version) {
  const route = `${version ? `/v${version}` : ''}/internal/tokens`
  const res = await fetch(API + route, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (await getToken()),
    },
  })

  const body = await res.json()

  if (body.ok) {
    return body.value
  } else {
    throw new Error(body.error.message)
  }
}

/**
 * Delete Token
 *
 * @param {string} name
 * @param {string | undefined} [version]
 */
export async function deleteToken(name, version) {
  const route = `${version ? `/v${version}` : ''}/internal/tokens`
  const data = version !== '0' ? { id: name } : { name }
  const res = await fetch(API + route, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (await getToken()),
    },
    body: JSON.stringify(data),
  })

  const body = await res.json()

  if (body.ok) {
    return body
  } else {
    throw new Error(body.error.message)
  }
}

/**
 * Create Token
 *
 * @param {string} name
 * @param {string | undefined} [version]
 */
export async function createToken(name, version) {
  const route = `${version ? `/v${version}` : ''}/internal/tokens`
  const res = await fetch(API + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (await getToken()),
    },
    body: JSON.stringify({ name }),
  })

  const body = await res.json()

  if (body.ok) {
    return body
  } else {
    throw new Error(body.error.message)
  }
}

/**
 * Get NFTs
 *
 * @param {{limit: number, before: string }} query
 * @param {string} version
 * @returns
 */
export async function getNfts({ limit, before }, version = '') {
  const route = version ? `/v${version}` : '/'
  const params = new URLSearchParams({ before, limit: String(limit) })
  const res = await fetch(`${API}${route}?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (await getToken()),
    },
  })

  const body = await res.json()

  if (body.ok) {
    return body.value.filter(Boolean)
  } else {
    throw new Error(body.error.message)
  }
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
    throw new Error(`failed to get version ${res.status}`)
  }
}
