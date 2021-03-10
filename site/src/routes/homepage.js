import { authorize } from '../utils/auth0'
import { getUser } from '../models/users'
import { getAsset, hydrateState } from '../utils/utils'

/**
 *
 * @param {FetchEvent} event
 */
export async function homepage(event) {
  const [authorized, { authorization, redirectUrl }] = await authorize(event)
  if (authorized) {
    const rsp = await getAsset(event)
    const userInfo = await getUser(authorization.userInfo.sub)

    return new HTMLRewriter().on('head', hydrateState(userInfo)).transform(rsp)
  }
  return Response.redirect(redirectUrl)
}
