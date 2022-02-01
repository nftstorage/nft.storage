export class JSONResponse extends Response {
  /**
   *
   * @param {unknown} body
   * @param {ResponseInitializerDict} [init]
   */
  constructor(body, init = {}) {
    super(JSON.stringify(body), {
      ...init,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        ...init.headers,
      },
    })
  }
}
