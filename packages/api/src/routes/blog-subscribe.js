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
 *  @param {import('../bindings').RouteContext} ctx
 */
export const isChimpUser = async (email, ctx) => {
  ctx.log.time('isChimpUser')
  const url = `${urlPrefix}${encodeURIComponent(email)}`

  const res = await fetch(url, {
    method: 'GET',
    headers,
  })
  try {
    ctx.log.info(
      JSON.stringify({
        timeTaken: ctx.log.timeEnd('isChimpUser').value,
        method: 'isChimpUser',
        url: urlPrefix + 'email',
        status: res.status,
      })
    )
  } catch (e) {}
  return res.ok
}

/**
 *  @param {string} email
 *  @param {import('../bindings').RouteContext} ctx
 */
export const addSubscriber = async (email, ctx) => {
  ctx.log.time('addSubscriber')
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
    ctx.log.info(
      JSON.stringify({
        timeTaken: ctx.log.timeEnd('addSubscriber').value,
        mailChimp: false,
        method: 'addSubscriber',
        url: url,
        status: res.status,
      })
    )
  } catch (e) {}
  return res
}

/**
 *  @param {string} email
 *  @param {import('../bindings').RouteContext} ctx
 */
const updateSubscriber = async (email, ctx) => {
  ctx.log.time('updateSubscriber')
  const url = `${urlPrefix}${encodeURIComponent(email)}/tags`

  const body = JSON.stringify({
    tags: [{ name: 'nft_storage_blog_subscriber', status: 'active' }],
  })

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body,
  })

  try {
    ctx.log.info(
      JSON.stringify({
        timeTaken: ctx.log.timeEnd('updateSubscriber').value,
        mailChimp: true,
        method: 'updateSubscriber',
        url: urlPrefix + 'email/tags',
        status: res.status,
      })
    )
  } catch (e) {}
  return res
}

/** @type {import('../bindings').Handler} */
export const blogSubscribe = async (event, ctx) => {
  ctx.log.time('blogSubscribe')
  const body = await event.request.json()

  ;(await isChimpUser(body.email, ctx))
    ? await updateSubscriber(body.email, ctx)
    : await addSubscriber(body.email, ctx)

  try {
    ctx.log.info(
      JSON.stringify({
        timeTaken: ctx.log.timeEnd('blogSubscribe').value,
        method: 'blogSubscribe',
      })
    )
  } catch (e) {}
  return new JSONResponse({
    ok: true,
  })
}

export default blogSubscribe
