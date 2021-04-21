import { getMagic } from './magic'

export const API = process.env.NEXT_PUBLIC_API

const LIFESPAN = 900
let token = undefined
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

export async function getTokens() {
  const res = await fetch(API + '/api/internal/tokens', {
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

export async function deleteToken(name) {
  const res = await fetch(API + '/api/internal/tokens', {
    method: 'DELETE',
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

export async function createToken(name) {
  const res = await fetch(API + '/api/internal/tokens', {
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

export async function getNfts() {
  const res = await fetch(API + '/api', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (await getToken()),
    },
  })

  const body = await res.json()

  if (body.ok) {
    return body.value
      .filter(Boolean)
      .map((n) => {
        n.created = new Date(n.created)
        return n
      })
      .sort((a, b) => b.created.getTime() - a.created.getTime())
  } else {
    throw new Error(body.error.message)
  }
}
