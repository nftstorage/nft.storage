import constants from './constants'

const API = constants.API

/**
 *
 * @param {string} email
 * @param {string} [version]
 */

export const subscribe = async (email, version = '') => {
  const loginURL = version
    ? `/v${version}/internal/blogSubscribe`
    : '/internal/blogSubscribe'
  const res = await fetch(API + loginURL, {
    method: 'POST',
    body: JSON.stringify({
      email,
    }),
  })
  const body = await res.json()
  if (body.ok) {
    return body.value
  } else {
    if (JSON.parse(body.response.text).title === 'Member Exists')
      throw new Error('exists')
    throw new Error(body.error)
  }
}
