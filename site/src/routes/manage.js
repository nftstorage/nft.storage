import { authorize } from '../utils/auth0.js'
import { getUser, tokens } from '../models/users.js'
import { getAsset, hydrateState } from '../utils/utils.js'

/**
 * @param {FetchEvent} event
 */
export async function manage(event) {
  const result = await authorize(event)
  // Must be logged in to manage API keys
  if (!result.ok) {
    return Response.redirect(result.error.redirectUrl)
  }

  const [rsp, user] = await Promise.all([
    getAsset(event),
    getUser(result.value.userInfo.sub),
  ])

  return new HTMLRewriter().on('head', hydrateState({ user })).transform(rsp)
}
