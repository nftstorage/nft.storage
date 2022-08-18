import { JSONResponse } from '../utils/json-response.js'
import { getServiceConfig } from '../config.js'

const SERVER_PREFIX = 'us5'
const LIST_ID = '64f6e3fd11'
const API_KEY = getServiceConfig().MAILCHIMP_API_KEY
const TOKEN = btoa(`:${API_KEY}`)
const urlPrefix = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/`

const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
  Authorization: `Basic ${TOKEN}`,
}

/**
 *  @param {string} email
 */
export const isChimpUser = async (email) => {
  const url = `${urlPrefix}${encodeURIComponent(email)}`

  var t = Date.now()
  const res = await fetch(url, {
    method: 'GET',
    headers,
  })
  try {
    console.log(
      JSON.stringify({
        timeTaken: Date.now() - t,
        method: 'GET',
        url: urlPrefix + 'email',
        status: res.status,
      })
    )
  } catch (e) {}
  return res.ok
}

/**
 *  @param {string} email
 */
export const addSubscriber = async (email) => {
  const url = urlPrefix
  const body = JSON.stringify({
    email_address: email,
    status: 'subscribed',
    tags: ['nft_storage_blog_subscriber'],
  })
  var t = Date.now()
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body,
  })
  try {
    console.log(
      JSON.stringify({
        timeTaken: Date.now() - t,
        mailChimp: false,
        method: 'POST',
        url: url,
        status: res.status,
      })
    )
  } catch (e) {}
  return res
}

/**
 *  @param {string} email
 */
const updateSubscriber = async (email) => {
  const url = `${urlPrefix}${encodeURIComponent(email)}/tags`

  const body = JSON.stringify({
    tags: [{ name: 'nft_storage_blog_subscriber', status: 'active' }],
  })
  var t = Date.now()
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body,
  })
  try {
    console.log(
      JSON.stringify({
        timeTaken: Date.now() - t,
        mailChimp: true,
        method: 'POST',
        url: urlPrefix + 'email/tags',
        status: res.status,
      })
    )
  } catch (e) {}
  return res
}

/** @type {import('../bindings').Handler} */
export const blogSubscribe = async (event) => {
  const body = await event.request.json()

  var t = Date.now()
  ;(await isChimpUser(body.email))
    ? await updateSubscriber(body.email)
    : await addSubscriber(body.email)
  try {
    console.log(
      JSON.stringify({
        timeTaken: Date.now() - t,
        method: 'blogSubscribe',
      })
    )
  } catch (e) {}
  return new JSONResponse({
    ok: true,
  })
}

export default blogSubscribe
