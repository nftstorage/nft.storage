import { JSONResponse } from '../utils/json-response.js'

const SERVER_PREFIX = 'us5'
const LIST_ID = '64f6e3fd11'
const API_KEY = MAILCHIMP_API_KEY
const TOKEN = Buffer.from(`:${API_KEY}`).toString('base64')

const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
  Authorization: `Basic ${TOKEN}`,
}

/**
 *  @param {string} email
 */
export const isChimpUser = async (email) => {
  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${encodeURIComponent(
    email
  )}`
  const res = await fetch(url, {
    method: 'GET',
    headers,
  })
  return res.statusText === 'OK'
}

/**
 *  @param {string} email
 */
export const addSubscriber = async (email) => {
  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/`
  const body = JSON.stringify({
    email_address: email,
    status: 'subscribed',
    tags: ['nft_storage_blog_subscriber'],
  })

  return await fetch(url, {
    method: 'POST',
    headers,
    body,
  })
}

/**
 *  @param {string} email
 */
const updateSubscriber = async (email) => {
  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${encodeURIComponent(
    email
  )}/tags`
  const body = JSON.stringify({
    tags: [{ name: 'nft_storage_blog_subscriber', status: 'active' }],
  })

  return await fetch(url, {
    method: 'POST',
    headers,
    body,
  })
}

/** @type {import('../bindings').Handler} */
export const blogSubscribe = async (event) => {
  const body = await event.request.json()
  try {
    const response = (await isChimpUser(body.email))
      ? await updateSubscriber(body.email)
      : await addSubscriber(body.email)

    return new JSONResponse({
      ok: true,
      value: response,
    })
  } catch (/** @type {any} */ error) {
    console.error(error)
    throw Error(error)
  }
}

export default blogSubscribe
