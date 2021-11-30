import { maybeCapture } from '../errors.js'
import { JSONResponse } from '../utils/json-response.js'

/**
 * Catch an error and respond with a response as required by the PSA spec,
 * logging the actual error with sentry.
 *
 * @typedef {import('../bindings').Handler} Handler
 * @param {Handler} handler
 * @returns {Handler}
 */
export function withPsaErrorHandler(handler) {
  return async (event, ctx) => {
    try {
      return await handler(event, ctx)
    } catch (err) {
      const { status } = maybeCapture(err, ctx)
      return new JSONResponse(
        {
          error: {
            reason: 'INTERNAL_SERVER_ERROR',
            details: 'An unexpected error occurred.',
          },
        },
        { status }
      )
    }
  }
}
