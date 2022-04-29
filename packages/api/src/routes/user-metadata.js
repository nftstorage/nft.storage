import { checkAuth } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../bindings').Handler} */
export const userMetadata = async (event, ctx) => {
  const { user } = checkAuth(ctx)

  const issuer = user.magic_link_id ?? user.did ?? user.github_id
  const publicAddress = user.public_address

  const meta = { issuer, publicAddress }
  return new JSONResponse({
    ok: true,
    value: meta,
  })
}
