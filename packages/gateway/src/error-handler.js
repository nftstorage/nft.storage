import { JSONResponse } from './utils/json-response.js'

/**
 * @param {Error & {status?: number;code?: string;}} err
 */
export function errorHandler(err) {
  // TODO: setup sentry
  console.error(err.stack)

  let error = {
    code: err.code || 'HTTP_ERROR',
    message: err.message || 'Server Error',
  }
  let status = err.status || 500

  return new JSONResponse(error, { status })
}
