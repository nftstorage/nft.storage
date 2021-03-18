import { authorize } from '../utils/auth0.js'
import { getUser } from '../models/users.js'
import { getAsset, hydrateState } from '../utils/utils.js'

/**
 *
 * @param {FetchEvent} event
 */
export async function homepage(event) {
  const result = await authorize(event)
  const rsp = await getAsset(event)
  let state
  if (result.ok) {
    const user = await getUser(result.value.userInfo.sub)
    state = { user }
  } else {
    state = { loginUrl: result.error.redirectUrl }
  }

  return new HTMLRewriter().on('head', hydrateState(state)).transform(rsp)
}
