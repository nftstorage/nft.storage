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
  if (token === undefined || now - created > LIFESPAN - 10) {
    token = await magic.user.getIdToken({ lifespan: LIFESPAN })
    created = Date.now() / 1000
  }
  return token
}

/**
 * Get tokens
 */
export async function getTokens() {
  const res = await fetch(API + `/internal/tokens`, {
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
 */
export async function deleteToken(name) {
  const res = await fetch(API + `/internal/tokens`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (await getToken()),
    },
    body: JSON.stringify({ id: name }),
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
  const res = await fetch(API + `/internal/tokens`, {
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

export async function getUserTags() {
  const res = await fetch(`${API}/user/tags`, {
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

export async function getUserRequests() {
  const res = await fetch(`${API}/user/request`, {
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

/**
 *
 * @param {string} tagName
 * @param {string} requestedTagValue
 * @param {string} userProposalForm
 */
export async function createUserRequest(
  tagName,
  requestedTagValue,
  userProposalForm
) {
  const res = await fetch(`${API}/user/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (await getToken()),
    },
    body: JSON.stringify({ tagName, requestedTagValue, userProposalForm }),
  })

  if (!res.ok) {
    throw new Error(`failed to create user request: ${await res.text()}`)
  }
}

/**
 *
 * @param {string|FormDataEntryValue} reason
 * @param {string|FormDataEntryValue} examples
 * @param {string|FormDataEntryValue} profile
 */
export async function createPinningRequest(reason, examples, profile) {
  await createUserRequest(
    'HasPsaAccess',
    'true',
    JSON.stringify([
      { label: 'Reason', value: reason },
      { label: 'Examples', value: examples },
      { label: 'Profile', value: profile },
    ])
  )
}
