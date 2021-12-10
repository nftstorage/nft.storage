import constants from './constants'

const API = constants.API

/**
 *
 * @param {string} email
 */

export const subscribe = async (email) => {
  const subscribeURL = '/internal/blog/subscribe'
  const res = await fetch(API + subscribeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  })
  const body = await res.json()
  if (!body.ok) {
    throw new Error(body.error)
  }
}
