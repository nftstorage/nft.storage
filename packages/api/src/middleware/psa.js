import { maybeCapture, ErrorPinningUnauthorized } from '../errors.js'
import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth.js'

/** @typedef {import('../bindings').Handler} Handler */

/**
 * Catch an error and respond with a response as required by the PSA spec,
 * logging the actual error with sentry.
 *
 * @param {Handler} handler
 * @returns {Handler}
 */
export function withPsaErrorHandler(handler) {
  return async (event, ctx) => {
    try {
      return await handler(event, ctx)
    } catch (err) {
      const { status } = maybeCapture(err, ctx)
      let reason = 'INTERNAL_SERVER_ERROR'
      let details = 'An unexpected error occurred.'
      if (err instanceof ErrorPinningUnauthorized) {
        reason = 'UNAUTHORIZED'
        details = err.message
      }
      return new JSONResponse({ error: { reason, details } }, { status })
    }
  }
}
/**
 * Return true if a user has a tag with a given name and value.
 *
 * @param {import('../utils/db-client-types.js').UserOutput} user
 * @param {string} tagName
 * @param {string} value
 * @returns  {boolean}
 */
function hasTag(user, tagName, value) {
  return Boolean(
    user.tags?.find(
      (tag) => tag.tag === tagName && tag.value === value && !tag.deleted_at
    )
  )
}

/**
 * Verify that the authenticated request is for a user who is authorized to use
 * the Pinning Service API.
 *
 * @param {Handler} handler
 * @returns {Handler}
 */
export function withPinningAuthorized(handler) {
  return async (event, ctx) => {
    // TODO: we need withAuth middleware so we don't have to do this twice
    const { user } = await validate(event, ctx)

    const authorized =
      hasTag(user, 'HasPsaAccess', 'true') &&
      !hasTag(user, 'HasAccountRestriction', 'true')

    if (!authorized) {
      throw new ErrorPinningUnauthorized()
    }
    return handler(event, ctx)
  }
}
