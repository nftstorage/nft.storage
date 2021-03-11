import { authorize } from '../utils/auth0.js'
import { getUser } from '../models/users.js'
import { getAsset, hydrateState } from '../utils/utils.js'

/**
 *
 * @param {FetchEvent} event
 */
export async function homepage(event) {
  const result = await authorize(event)
  if (result.ok) {
    const rsp = await getAsset(event)
    const userInfo = await getUser(result.value.userInfo.sub)

    return new HTMLRewriter().on('head', hydrateState(userInfo)).transform(rsp)
  }
  return Response.redirect(result.error.redirectUrl)
}
