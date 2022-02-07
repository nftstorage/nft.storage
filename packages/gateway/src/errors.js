export class InvalidUrlError extends Error {
  /**
   * @param {string} message
   */
  constructor(message = 'invalid URL') {
    super(message)
    this.name = 'InvalidUrlError'
    this.status = 400
    this.code = InvalidUrlError.CODE
  }
}
InvalidUrlError.CODE = 'ERROR_INVALID_URL'

export class TimeoutError extends Error {
  /**
   * @param {string} message
   */
  constructor(message = 'timeout error') {
    super(message)
    this.name = 'TimeoutError'
    this.status = 408
    this.code = TimeoutError.CODE
  }
}
TimeoutError.CODE = 'ERROR_TIMEOUT'
