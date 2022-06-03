import { checkAuth } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { getPendingProposals, getTagValue, hasTag } from '../utils/utils.js'

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
  return new JSONResponse({ ok: true, value: res })
}

/** @type {import('../bindings').Handler} */
export const userRequestsGet = async (event, ctx) => {
  const { user } = checkAuth(ctx)

  const userId = user.id
  const res = await ctx.db.getUserRequests(userId)

  return new JSONResponse({ ok: true, value: getPendingProposals(res) })
}
