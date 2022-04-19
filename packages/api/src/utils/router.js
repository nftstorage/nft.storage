import { parse } from 'regexparam'
import { database, cluster } from '../../constants/constants.js'
import { ClientRequest } from 'http'
/**
 * @typedef {{ params: Record<string, string> }} BasicRouteContext
 * @typedef {(req: Request) => boolean | Record<string,string>} Condition
 * @typedef {(req: Request) => Response} BasicHandler
 * @typedef {(req: Request, rsp: Response) => Response} ResponseHandler
 * @typedef {import('../bindings').RouteContext} RouteContext
 */

/**
 * @typedef {(req: Request) => Promise<Response> | Response} Handler
 */

/**
 * @typedef {(req: Request, err: Error) => Response} ErrorHandler
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
 *
 * @template {RouteContext} C
 */
class Router {
  /**
   * @param {(params: Record<string, string>) => Promise<RouteContext>} getRouteContext
   * @param {object} [options]
   * @param {BasicHandler} [options.onNotFound]
   * @param {ErrorHandler} [options.onError]
   */
  constructor(getRouteContext, options) {
    /**
     * @private
     */
    this.getRouteContext = getRouteContext

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

    const parsed = parse(route)
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
   * @param {ClientRequest} req
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
   * @param {ClientRequest} req
   */
  async route(req) {
    const [handler, params, postHandlers] = this.resolve(req)
    // const ctx = await this.getRouteContext(event, params)
    let rsp

    // ctx.log.time('request')

    if (handler) {
      try {
        rsp = await handler(req)
      } catch (err) {
        // @ts-ignore
        rsp = this.options.onError(req, err, ctx)
      }
    } else {
      rsp = this.options.onNotFound(req)
    }

    const out = postHandlers.reduce((r, handler) => handler(req, r), rsp)

    ctx.log.timeEnd('request')
    return ctx.log.end(out)
  }

  /**
   * Listen to fetch event
   *
   * @param {ClientRequest} req
   */
  async listen(req) {
    const url = new URL(`${req.protocol}://${req.headers.host}${req.url}`)
    // Add more if needed for other backends
    const passThrough = [database.url, cluster.apiUrl]
    // Ignore http requests from the passthrough list above
    if (!passThrough.includes(`${url.protocol}//${url.host}`)) return
    const res = await this.route(req)
    console.log({ res })
  }
}

export { Router }
