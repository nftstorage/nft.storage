import { getMagic } from './magic'
import constants from './constants'

export const API = constants.API

const LIFESPAN = 900
/** @type {string | undefined} */
let token
let created = Date.now() / 1000

export async function getToken() {
  const magic = getMagic()
  const now = Date.now() / 1000
  if (token === undefined || now - created > LIFESPAN - 10) {
    token = await magic.user.getIdToken({ lifespan: LIFESPAN })
    created = Date.now() / 1000
  }
  return token
}

/**
 *
 * @returns {Promise<Array<{_id: string, name: string, secret: string}>>}
 */
export async function getTokens() {
  const res = await fetch(API + '/internal/tokens', {
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
 * @param {string} id
 */
export async function deleteToken(id) {
  const res = await fetch(API + '/internal/tokens', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (await getToken()),
    },
    body: JSON.stringify({ id }),
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
 */
export async function createToken(name) {
  const res = await fetch(API + '/internal/tokens', {
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
 * @returns
 */
export async function getNfts({ limit, before }) {
  const params = new URLSearchParams({ before, limit: String(limit) })
  const res = await fetch(`${API}/?${params}`, {
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
