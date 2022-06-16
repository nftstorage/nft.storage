import { checkAuth } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { getPendingProposals, getTagValue, hasTag } from '../utils/utils.js'
import { getServiceConfig } from '../config.js'
import { DBClient } from '../utils/db-client.js'

/** @type {import('../bindings').Handler} */
export const userRequestsAdd = async (event, ctx) => {
  const { user } = checkAuth(ctx)

  const userId = user.id
  const { tagName, requestedTagValue, userProposalForm } =
    await event.request.json()
  const res = await ctx.db.createUserRequest(
    userId,
    tagName,
    requestedTagValue,
    userProposalForm
  )

  try {
    notifySlack(userId, tagName, requestedTagValue, userProposalForm, ctx.db)
  } catch (e) {
    console.error('Failed to notify Slack: ', e)
  }

  return new JSONResponse({ ok: true, value: res })
}

/** @type {import('../bindings').Handler} */
export const userRequestsGet = async (event, ctx) => {
  const { user } = checkAuth(ctx)

  const userId = user.id
  const res = await ctx.db.getUserRequests(userId)

  return new JSONResponse({ ok: true, value: getPendingProposals(res) })
}

/**
 *
 * @param {number} userId
 * @param {string} userProposalForm
 * @param {string} tagName
 * @param {string} requestedTagValue
 * @param {DBClient} db
 */
const notifySlack = async (
  userId,
  tagName,
  requestedTagValue,
  userProposalForm,
  db
) => {
  const webhookUrl = getServiceConfig().SLACK_USER_REQUEST_WEBHOOK_URL

  if (!webhookUrl) {
    return
  }

  /** @type {import('../bindings').RequestForm} */
  let form
  try {
    form = JSON.parse(userProposalForm)
  } catch (e) {
    console.error('Failed to parse user request form: ', e)
    return
  }

  const user = await db.getUserById(userId)

  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      text: `
>*Username*
>${user.name}
>
>*Email*
>${user.email}
>
>*User Id*
>${userId}
>
>*Requested Tag Name*
>${tagName}
>
>*Requested Tag Value*
>${requestedTagValue}
>${form
        .map(
          ({ label, value }) => `
>*${label}*
>${value}
>`
        )
        .join('')}
`,
    }),
  })
}
