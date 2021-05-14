export class JSONResponse extends Response {
  /**
   *
   * @param {unknown} body
   * @param {ResponseInit} [init]
   */
  constructor(body, init = {}) {
    const headers = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    }
    super(JSON.stringify(body), { ...init, ...headers })
  }
}
