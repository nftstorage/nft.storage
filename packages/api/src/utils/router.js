import regexparam from 'regexparam'
import { getSentry } from './debug'

/**
 * @typedef {import('../bindings').RouteContext} RouteContext
 * @typedef {import('toucan-js').default} Sentry
 * @typedef {(event: FetchEvent, ctx: RouteContext) => Promise<Response> | Response} Handler
 * @typedef {(req: Request) => boolean | Record<string,string>} Condition
 * @typedef {(req: Request) => Response} BasicHandler
 * @typedef {(req: Request, err: Error, ctx: RouteContext) => Response} ErrorHandler
 * @typedef {(req: Request, rsp: Response) => Response} ResponseHandler
 */

/**
 * Match route params
 *
 * @param {string} path
 * @param {{ keys: string[]; pattern: RegExp;}} result
 */
function matchParams(path, result) {
  let i = 0
  /** @type {Record<string, string>} */
  const out = {}
  const { keys, pattern } = result
  let matches = pattern.exec(path)
  if (!matches) {
    return out
  }
  while (i < keys.length) {
    out[keys[i]] = matches[++i]
  }
  return out
}

/**
 * The Router handles determines which handler is matched given the
 * conditions present for each request.
 */
class Router {
  /**
   * @param {object} [options]
   * @param {BasicHandler} [options.onNotFound]
   * @param {ErrorHandler} [options.onError]
   */
  constructor(options) {
    const defaults = {
      onNotFound() {
        return new Response(null, {
          status: 404,
          statusText: 'Not Found',
        })
      },
      onError() {
        return new Response(null, {
          status: 500,
          statusText: 'Internal Server Error',
        })
      },
    }
    this.options = {
      ...defaults,
      ...options,
    }
    /** @type {{ conditions: Condition[]; handler: Handler; postHandlers: ResponseHandler[] }[]} */
    this.routes = []
  }

  /**
   * Add route
   *
   * @example Route example
   * ```text
   * Static (/foo, /foo/bar)
   * Parameter (/:title, /books/:title, /books/:genre/:title)
   * Parameter w/ Suffix (/movies/:title.mp4, /movies/:title.(mp4|mov))
   * Optional Parameters (/:title?, /books/:title?, /books/:genre/:title?)
   * Wildcards (*, /books/*, /books/:genre/*)
   * ```
   * @see https://github.com/lukeed/regexparam
   *
   *
   * @param {string} method
   * @param {string} route
   * @param {Handler} handler
   * @param {Array<ResponseHandler> } [postHandlers]
   */
  add(method, route, handler, postHandlers = []) {
    const methodCondition = (/** @type {Request} */ req) => {
      const m = method.trim().toLowerCase()
      if (m === 'all') {
        return true
      }
      return req.method.toLowerCase() === m
    }

    const parsed = regexparam(route)
    const routeCondition = (/** @type {Request} */ req) => {
      const url = new URL(req.url)
      const path = url.pathname

      const match = parsed.pattern.test(path)
      if (match) {
        return matchParams(path, parsed)
      }
      return false
    }

    this.routes.push({
      conditions: [methodCondition, routeCondition],
      handler,
      postHandlers,
    })
  }

  /**
   * Resolve returns the matching route for a request that returns
   * true for all conditions (if any).
   *
   * @param {Request} req
   * @return {[Handler|false, Record<string,string>, ResponseHandler[]]}
   */
  resolve(req) {
    for (let i = 0; i < this.routes.length; i++) {
      const { conditions, handler, postHandlers } = this.routes[i]
      const method = conditions[0](req)
      const routeParams = conditions[1](req)
      if (method && typeof routeParams !== 'boolean') {
        return [handler, routeParams, postHandlers]
      }
    }

    return [false, {}, []]
  }

  /**
   * @param {FetchEvent} event
   */
  async route(event) {
    this.sentry = getSentry(event)
    const req = event.request
    const [handler, params, postHandlers] = this.resolve(req)
    let rsp

    if (handler) {
      try {
        rsp = await handler(event, { sentry: this.sentry, params })
      } catch (err) {
        rsp = this.options.onError(req, err, { sentry: this.sentry, params })
      }
    } else {
      rsp = this.options.onNotFound(req)
    }

    return postHandlers.reduce((r, handler) => handler(req, r), rsp)
  }

  /**
   * Listen to fetch event
   *
   * @param {FetchEvent} event
   */
  listen(event) {
    event.respondWith(this.route(event))
  }
}

export { Router }
