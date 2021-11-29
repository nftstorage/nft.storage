/**
 *
 * @param {string} email
 */
export const subscribe = async (email) => {
  const res = await fetch('/api/subscribe', {
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

/**
 *
 * @param {string} email
 */
export const getInfo = async (email) => {
  const res = await fetch(`/api/user/?email=${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (res.ok) {
    return res.json()
  } else {
    throw new Error(res.status + ' ' + res.statusText)
  }
}

/**
 *
 * @param {string} email
 */
export const addTags = async (email) => {
  const res = await fetch('/api/addTags', {
    method: 'POST',
    body: JSON.stringify({
      email,
    }),
  })
  // mailchimp api returns null even on success when hitting this endpoint
  const body = await res.json()
  return body.value
}
