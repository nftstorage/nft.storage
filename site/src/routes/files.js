import { authorize } from '../utils/auth0.js'
import { getUser } from '../models/users.js'
import { getAsset, hydrateState } from '../utils/utils.js'
import { list } from '../models/nfts.js'

/**
 * @param {FetchEvent} event
 */
export async function files(event) {
  const result = await authorize(event)
  // Must be logged in to list files
  if (!result.ok) {
    return Response.redirect(result.error.redirectUrl)
  }

  const [rsp, user, nfts] = await Promise.all([
    getAsset(event),
    getUser(result.value.userInfo.sub),
    list(result.value.userInfo.sub),
  ])

  return new HTMLRewriter()
    .on('head', hydrateState({ user, nfts }))
    .transform(rsp)
}
