/**
 * @typedef {(event: FetchEvent) => Promise<Response> | Response} Handler
 * @typedef {(req: Request) => boolean} Condition
 * @typedef {string} Matcher
 */

/**
 * Helper functions that when passed a request will return a
 * boolean indicating if the request uses that HTTP method,
 * header, host or referrer.
 *
 * @param {string} method
 */
function Method(method) {
  return (/** @type {Request} */ req) =>
    req.method.toLowerCase() === method.toLowerCase()
}
const Connect = Method('connect')
const Delete = Method('delete')
const Get = Method('get')
const Head = Method('head')
const Options = Method('options')
const Patch = Method('patch')
const Post = Method('post')
const Put = Method('put')
const Trace = Method('trace')

// const Header = (header, val) => (req) => req.headers.get(header) === val
// const Host = (host) => Header('host', host.toLowerCase())
// const Referrer = (host) => Header('referrer', host.toLowerCase())

/**
 * @param {Matcher} regExp
 */
function Path(regExp) {
  return (/** @type {Request} */ req) => {
    const url = new URL(req.url)
    const path = url.pathname
    const match = path.match(regExp) || []
    return match[0] === path
  }
}

/**
 * The Router handles determines which handler is matched given the
 * conditions present for each request.
 */
class Router {
  constructor() {
    /** @type {{ conditions: Condition[]; handler: Handler; }[]} */
    this.routes = []
  }

  /**
   * @param {Condition[]} conditions
   * @param {Handler} handler
   */
  handle(conditions, handler) {
    this.routes.push({
      conditions,
      handler,
    })
    return this
  }

  /**
   * @param {Matcher} url
   * @param {Handler} handler
   */
  connect(url, handler) {
    return this.handle([Connect, Path(url)], handler)
  }

  /**
   * @param {Matcher} url
   * @param {Handler} handler
   */
  delete(url, handler) {
    return this.handle([Delete, Path(url)], handler)
  }
  /**
   * @param {Matcher} url
   * @param {Handler} handler
   */
  get(url, handler) {
    return this.handle([Get, Path(url)], handler)
  }
  /**
   * @param {Matcher} url
   * @param {Handler} handler
   */
  head(url, handler) {
    return this.handle([Head, Path(url)], handler)
  }
  /**
   * @param {Matcher} url
   * @param {Handler} handler
   */
  options(url, handler) {
    return this.handle([Options, Path(url)], handler)
  }
  /**
   * @param {Matcher} url
   * @param {Handler} handler
   */
  patch(url, handler) {
    return this.handle([Patch, Path(url)], handler)
  }
  /**
   * @param {Matcher} url
   * @param {Handler} handler
   */
  post(url, handler) {
    return this.handle([Post, Path(url)], handler)
  }
  /**
   * @param {Matcher} url
   * @param {Handler} handler
   */
  put(url, handler) {
    return this.handle([Put, Path(url)], handler)
  }
  /**
   * @param {Matcher} url
   * @param {Handler} handler
   */
  trace(url, handler) {
    return this.handle([Trace, Path(url)], handler)
  }
  /**
   * @param {Handler} handler
   */
  all(handler) {
    return this.handle([], handler)
  }

  /**
   * @param {FetchEvent} event
   */
  async route(event) {
    const origin = event.request.headers.get('origin')
    const route = this.resolve(event.request)
    const url = new URL(event.request.url)
    const isAPI = url.pathname.startsWith('/api')

    if (route) {
      const rsp = await route.handler(event)
      if (isAPI) {
        if (origin) {
          rsp.headers.set('Access-Control-Allow-Origin', origin)
          rsp.headers.set('Vary', 'Origin')
        } else {
          rsp.headers.set('Access-Control-Allow-Origin', '*')
        }
      }
      return rsp
    }

    return new Response('resource not found', {
      status: 404,
      statusText: 'not found',
      headers: {
        'content-type': 'text/plain',
      },
    })
  }

  /**
   * resolve returns the matching route for a request that returns
   * true for all conditions (if any).
   * @param {Request} req
   */
  resolve(req) {
    return this.routes.find((r) => {
      if (!r.conditions || (Array.isArray(r) && !r.conditions.length)) {
        return true
      }

      // if (typeof r.conditions === 'function') {
      //   return r.conditions(req)
      // }

      return r.conditions.every((c) => c(req))
    })
  }
}

export { Router }
