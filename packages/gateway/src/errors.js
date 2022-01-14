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
