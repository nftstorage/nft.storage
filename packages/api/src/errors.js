import { JSONResponse } from './utils/json-response.js'
import { DBError } from './utils/db-client.js'

// FIXME: ava gives an error when trying to import ErrorCode from @magic-sdk/admin:
// SyntaxError: The requested module '@magic-sdk/admin' does not provide an export named 'ErrorCode'
// Re-declaring here to make progress, but it would be good to figure out how to import it correctly.
const MagicErrors = {
  MissingAuthHeader: 'ERROR_MISSING_AUTH_HEADER',
  TokenExpired: 'ERROR_DIDT_EXPIRED',
  TokenCannotBeUsedYet: 'ERROR_DIDT_CANNOT_BE_USED_YET',
  IncorrectSignerAddress: 'ERROR_INCORRECT_SIGNER_ADDR',
  FailedRecoveryProof: 'ERROR_FAILED_RECOVERING_PROOF',
  ApiKeyMissing: 'ERROR_SECRET_API_KEY_MISSING',
  MalformedTokenError: 'ERROR_MALFORMED_TOKEN',
  ServiceError: 'SERVICE_ERROR',
  ExpectedBearerString: 'EXPECTED_BEARER_STRING',
}

/** @typedef {{ code: string }} Coded */

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
   * @param {import('./bindings.js').RouteContext} ctx
   */
  static respond(err, ctx) {
    const { message, code, status } = maybeCapture(err, ctx)
    return new JSONResponse(
      {
        ok: false,
        error: { code, message },
      },
      {
        status,
      }
    )
  }
}

/**
 * Pass me an error and I might send it to sentry if it's important. Either way
 * I'll give you back a HTTPError with a user friendly error message and code.
 *
 * @param {any} err
 * @param {import('./bindings.js').RouteContext} ctx
 * @returns {HTTPError & Coded} A HTTPError with an error code.
 */
export function maybeCapture(err, { log }) {
  let code = err.code || 'HTTP_ERROR'
  let message = err.message
  let status = err.status || 500

  switch (err.code) {
    case ErrorUserNotFound.CODE:
    case ErrorTokenNotFound.CODE:
    case ErrorInvalidCid.CODE:
    case ErrorMaintenance.CODE:
      break
    case DBError.CODE:
      message = 'Database error'
      log.error(err)
      break
    // Magic SDK errors
    case MagicErrors.TokenExpired:
      status = 401
      message = 'API Key has expired.'
      break
    case MagicErrors.ExpectedBearerString:
      status = 401
      message =
        'API Key is missing, make sure the `Authorization` header has a value in the following format `Bearer {api key}`.'
      break
    case MagicErrors.MalformedTokenError:
      status = 401
      message = 'API Key is malformed or failed to parse.'
      break
    case MagicErrors.TokenCannotBeUsedYet:
    case MagicErrors.IncorrectSignerAddress:
    case MagicErrors.FailedRecoveryProof:
    case MagicErrors.ApiKeyMissing:
      status = 401
      code = 'AUTH_ERROR'
      message = 'Authentication failed.'
      log.error(err)
      break
    case MagicErrors.ServiceError:
      status = 500
      code = 'SERVER_ERROR'
      log.error(err)
      break
    default:
      // catch all server errors
      if (status >= 500) {
        code = err.name
        message = err.message
        log.error(err)
      }
      break
  }

  return Object.assign(new HTTPError(message, status), { code })
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

export class ErrorTokenBlocked extends Error {
  constructor(msg = 'API Key is blocked. Please contact support@nft.storage') {
    super(msg)
    this.name = 'TokenBlocked'
    this.status = 403
    this.code = ErrorTokenBlocked.CODE
  }
}
ErrorTokenBlocked.CODE = 'ERROR_TOKEN_BLOCKED'

export class ErrorTokenNotFound extends Error {
  constructor(msg = 'API Key not found.') {
    super(msg)
    this.name = 'TokenNotFound'
    this.status = 401
    this.code = ErrorTokenNotFound.CODE
  }
}
ErrorTokenNotFound.CODE = 'ERROR_TOKEN_NOT_FOUND'

export class ErrorInvalidCid extends Error {
  /**
   * @param {string} cid
   */
  constructor(cid) {
    super(`Invalid CID: ${cid}`)
    this.name = 'InvalidCid'
    this.status = 400
    this.code = ErrorInvalidCid.CODE
  }
}
ErrorInvalidCid.CODE = 'ERROR_INVALID_CID'

export class InvalidCarError extends Error {
  /**
   * @param {string} reason
   */
  constructor(reason) {
    super(`Invalid CAR file received: ${reason}`)
    this.name = 'InvalidCar'
    this.status = 400
    this.code = InvalidCarError.CODE
  }
}
InvalidCarError.CODE = 'ERROR_INVALID_CAR'

export class ErrorMetaplexTokenNotFound extends Error {
  constructor(msg = 'Metaplex token not found.') {
    super(msg)
    this.name = 'MetaplexTokenNotFound'
    this.status = 401
    this.code = ErrorMetaplexTokenNotFound.CODE
  }
}
ErrorMetaplexTokenNotFound.CODE = 'ERROR_METAPLEX_TOKEN_NOT_FOUND'

export class ErrorInvalidMetaplexToken extends Error {
  /**
   * @param {string} reason
   */
  constructor(reason) {
    super(`Invalid metaplex token: ${reason}`)
    this.name = 'InvalidMetaplexToken'
    this.status = 401
    this.code = ErrorInvalidMetaplexToken.CODE
  }
}

ErrorInvalidMetaplexToken.CODE = 'ERROR_INVALID_METAPLEX_TOKEN'

export class ErrorPinningUnauthorized extends HTTPError {
  constructor(
    msg = 'Pinning not authorized for this user, email support@nft.storage to request authorization.'
  ) {
    super(msg, 401)
    this.name = 'PinningUnauthorized'
    this.code = ErrorPinningUnauthorized.CODE
  }
}
ErrorPinningUnauthorized.CODE = 'ERROR_PINNING_UNAUTHORIZED'

export class ErrorDeleteRestricted extends HTTPError {
  constructor(msg = 'Delete operations restricted.') {
    super(msg, 403)
    this.name = 'DeleteRestricted'
    this.code = ErrorDeleteRestricted.CODE
  }
}
ErrorDeleteRestricted.CODE = 'ERROR_DELETE_RESTRICTED'

export class ErrorAccountRestricted extends HTTPError {
  constructor(msg = 'Account restricted.') {
    super(msg, 403)
    this.name = 'AccountRestricted'
    this.code = ErrorAccountRestricted.CODE
  }
}
ErrorAccountRestricted.CODE = 'ERROR_ACCOUNT_RESTRICTED'

export class ErrorUnauthenticated extends HTTPError {
  constructor(msg = 'Unauthenticated') {
    super(msg, 401)
    this.name = 'Unauthenticated'
    this.code = ErrorUnauthenticated.CODE
  }
}
ErrorUnauthenticated.CODE = 'ERROR_UNAUTHENTICATED'

export class ErrorMaintenance extends HTTPError {
  constructor(
    msg = 'API undergoing maintenance, check https://status.nft.storage for more info'
  ) {
    super(msg, 503)
    this.name = 'Maintenance'
    this.code = ErrorMaintenance.CODE
  }
}
ErrorMaintenance.CODE = 'ERROR_MAINTENANCE'

export class ErrorDIDNotFound extends HTTPError {
  constructor(msg = 'User does not have a DID registered.') {
    super(msg, 400)
    this.name = 'DIDNotFound'
    this.code = ErrorDIDNotFound.CODE
  }
}
ErrorDIDNotFound.CODE = 'ERROR_DID_NOT_FOUND'

export class ErrorAgentDIDRequired extends HTTPError {
  constructor(
    msg = 'UCAN authorized request must be supplied with x-agent-did header set to the DID of the UCAN issuer',
    status = 401
  ) {
    super(msg, status)
    this.name = 'ErrorAgentDIDRequired'
    this.name = 'AgentDIDRequired'
    this.code = ErrorAgentDIDRequired.CODE
  }
}
ErrorAgentDIDRequired.CODE = 'ERROR_AGENT_DID_REQUIRED'
