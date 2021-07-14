import Toucan from 'toucan-js'
import { ErrorCode as MagicErrors } from '@magic-sdk/admin'
import { JSONResponse } from './utils/json-response.js'

export class HTTPError extends Error {
  /**
   *
   * @param {string} message
   * @param {number} [status]
   */
  constructor(message, status = 500) {
    super(message)
    this.name = 'HTTPError'
    this.status = status
  }
  /**
   * @param {string} message
   * @param {number} [status]
   * @returns {never}
   */
  static throw(message, status) {
    throw new this(message, status)
  }

  /**
   * @param {Error & {status?: number;code?: string;}} err
   * @param {{sentry: Toucan}} ctx
   */
  static respond(err, { sentry }) {
    let error = {
      code: err.code,
      message: err.message,
    }
    let status = err.status || 500

    switch (err.code) {
      case ErrorUserNotFound.CODE:
      case ErrorTokenNotFound.CODE:
        break

      // Magic SDK errors
      case MagicErrors.TokenExpired:
        status = 401
        error.message = 'API Key has expired.'
        break
      case MagicErrors.ExpectedBearerString:
        status = 401
        error.message =
          'API Key is missing, make sure the `Authorization` header has a value in the following format `Bearer {api key}`.'
        break
      case MagicErrors.MalformedTokenError:
        status = 401
        error.message = 'API Key is malformed or failed to parse.'
        break
      case MagicErrors.TokenCannotBeUsedYet:
      case MagicErrors.IncorrectSignerAddress:
      case MagicErrors.FailedRecoveryProof:
      case MagicErrors.ApiKeyMissing:
        status = 401
        error.code = 'AUTH_ERROR'
        error.message = 'Authentication failed.'
        sentry.captureException(err)
        break
      case MagicErrors.ServiceError:
        status = 500
        error.code = 'SERVER_ERROR'
        sentry.captureException(err)
        break
      default:
        // catch all server errors
        if (status >= 500) {
          error = {
            code: err.name,
            message: err.message,
          }
          sentry.captureException(err)
        } else {
          // Custom HTTPError
          error = {
            code: err.code || 'HTTP_ERROR',
            message: err.message,
          }
        }
        break
    }

    return new JSONResponse(
      {
        ok: false,
        error,
      },
      {
        status,
      }
    )
  }
}

export class ErrorUserNotFound extends Error {
  constructor(msg = 'User not found.') {
    super(msg)
    this.name = 'UserNotFound'
    this.status = 401
    this.code = ErrorUserNotFound.CODE
  }
}
ErrorUserNotFound.CODE = 'ERROR_USER_NOT_FOUND'

export class ErrorTokenNotFound extends Error {
  constructor(msg = 'API Key not found.') {
    super(msg)
    this.name = 'TokenNotFound'
    this.status = 401
    this.code = ErrorTokenNotFound.CODE
  }
}
ErrorTokenNotFound.CODE = 'ERROR_TOKEN_NOT_FOUND'
