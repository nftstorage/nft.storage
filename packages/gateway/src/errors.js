export class InvalidUrlError extends Error {
  /**
   * @param {string} message
   */
  constructor(message = 'invalid URL') {
    const status = 400
    super(createErrorHtmlContent(status, message))
    this.name = 'InvalidUrlError'
    this.status = status
    this.code = InvalidUrlError.CODE
    this.contentType = 'text/html'
  }
}
InvalidUrlError.CODE = 'ERROR_INVALID_URL'

export class TimeoutError extends Error {
  /**
   * @param {string} message
   */
  constructor(message = 'Gateway Time-out') {
    const status = 408
    super(createErrorHtmlContent(status, message))
    this.name = 'TimeoutError'
    this.status = status
    this.code = TimeoutError.CODE
    this.contentType = 'text/html'
  }
}
TimeoutError.CODE = 'ERROR_TIMEOUT'

export const createErrorHtmlContent = (status, message) => `<html>
<head><title>${status} ${message}</title></head>
<body>
<div style="text-align:center">
<h1>${status} ${message}</h1>
</div>
</body>
</html>
`
