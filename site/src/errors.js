import { JSONResponse } from './utils/json-response'

export class HTTPError extends Error {
  /**
   *
   * @param {string} message
   * @param {number} [status]
   */
  constructor(message, status = 500) {
    super(message)
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
   * @param {Error & { status?: number }} error
   */
  static respond(error) {
    return new JSONResponse(
      {
        ok: false,
        error: {
          name: error.name,
          message: error.message,
        },
      },
      {
        statusText: error.message,
        status: error.status || 500,
      }
    )
  }
}
