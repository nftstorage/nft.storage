import { checkAuth } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { hasTag } from '../utils/utils.js'

/** @type {import('../bindings').Handler} */
export const userPermissions = async (event, ctx) => {
  const { user } = checkAuth(ctx)

  const permissions = {
    hasAccountRestriction: hasTag(user, 'HasAccountRestriction', 'true'),
    hasPsaAccess: hasTag(user, 'HasPsaAccess', 'true'),
  }

  return new JSONResponse({
    ok: true,
    value: permissions,
  })
}
