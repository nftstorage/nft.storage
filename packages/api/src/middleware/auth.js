import {
  ErrorAccountRestricted,
  ErrorDeleteRestricted,
  ErrorPinningUnauthorized,
} from '../errors'
import { validate } from '../utils/auth'
import { hasTag } from '../utils/utils'

/**
 *
 * @param {import('../bindings').Handler} handler
 * @param {import('../bindings').AuthOptions} [options]
 * @returns {import('../bindings').Handler}
 */
export function withAuth(handler, options) {
  return async (event, ctx) => {
    const auth = await validate(event, ctx, options)

    if (
      options?.checkHasAccountRestriction &&
      hasTag(auth.user, 'HasAccountRestriction', 'true')
    ) {
      throw new ErrorAccountRestricted()
    }

    if (
      options?.checkHasDeleteRestriction &&
      hasTag(auth.user, 'HasDeleteRestriction', 'true')
    ) {
      throw new ErrorDeleteRestricted()
    }

    if (
      options?.checkHasPsaAccess &&
      !hasTag(auth.user, 'HasPsaAccess', 'true')
    ) {
      throw new ErrorPinningUnauthorized()
    }

    return handler(event, { ...ctx, auth })
  }
}
