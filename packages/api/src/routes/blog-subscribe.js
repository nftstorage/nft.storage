import { JSONResponse } from '../utils/json-response.js'
import btoa from 'btoa'

const SERVER_PREFIX = 'us5'
const LIST_ID = '64f6e3fd11'
const API_KEY = process.env.MAILCHIMP_API_KEY
const TOKEN = btoa(`:${API_KEY}`)

const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
  Authorization: `Basic ${TOKEN}`,
}

/**
 *  @param {string} email
 */
export const getMailChimpUser = async (email) => {
  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${email}`
  return await fetch(url, {
    method: 'GET',
    headers,
  })
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
  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${email}/tags`
  const body = JSON.stringify({
    tags: [{ name: 'nft_storage_blog_subscriber', status: 'active' }],
  })

  return await fetch(url, {
    method: 'POST',
    headers,
    body,
  })
}

/**
 * @param {any} mailChimpUser
 * @returns {boolean}
 */
const shouldUpdateMailChimpUser = (mailChimpUser) =>
  mailChimpUser?.statusText === 'OK'

/** @type {import('../bindings').Handler} */
export const blogSubscribe = async (event) => {
  console.log('HERE IS PROCESS.ENV, ', process.env)
  const body = await event.request.json()
  try {
    const mailChimpUser = await getMailChimpUser(body.email)
    const response = shouldUpdateMailChimpUser(mailChimpUser)
      ? await updateSubscriber(body.email)
      : await addSubscriber(body.email)

    return new JSONResponse({
      ok: true,
      value: response,
    })
  } catch (/** @type {any} */ error) {
    console.error('ping: ', error)
    throw new Error(error)
  }
}

export default blogSubscribe
