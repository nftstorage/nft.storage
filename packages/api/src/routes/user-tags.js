import { checkAuth } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { getTagValue, hasTag } from '../utils/utils.js'

/** @type {import('../bindings').Handler} */
export const userTags = async (event, ctx) => {
  const { user } = checkAuth(ctx)

  const tags = {
    HasAccountRestriction: hasTag(user, 'HasAccountRestriction', 'true'),
    HasPsaAccess: hasTag(user, 'HasPsaAccess', 'true'),
    HasDeleteRestriction: hasTag(user, 'HasDeleteRestriction', 'true'),
    HasSuperHotAccess: hasTag(user, 'HasSuperHotAccess', 'true'),
    StorageLimitBytes: getTagValue(user, 'StorageLimitBytes', ''),
  }

  return new JSONResponse({
    ok: true,
    value: tags,
  })
}
