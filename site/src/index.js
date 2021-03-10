import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { authorize } from './auth0'
import { handleRedirect } from './redirect'
import { hydrateState, logout } from './utils'
import { getUser } from './users'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = true

addEventListener('fetch', (event) => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

/**
 *
 * @param {FetchEvent} event
 * @returns
 */
async function handleEvent(event) {
  let request = event.request
  const url = new URL(event.request.url)
  let options = {}
  if (DEBUG) {
    // customize caching
    options.cacheControl = {
      bypassCache: true,
    }
  }

  try {
    const [authorized, { authorization, redirectUrl }] = await authorize(event)
    if (authorized && authorization.accessToken) {
      // const userInfo = await getUser(authorization.userInfo.sub)
      // console.log("🚀 ~ file: index.js ~ line 56 ~ handleEvent ~ userInfo", userInfo)
      // request = new Request(request, {
      //     headers: {
      //         Authorization: `Bearer ${authorization.accessToken}`
      //     }
      // });
    }

    // Auth Route
    if (url.pathname === '/auth') {
      const authorizedResponse = await handleRedirect(event)
      if (!authorizedResponse) {
        return new Response('Unauthorized', { status: 401 })
      }
      return new Response(null, {
        ...authorizedResponse,
      })
    }
    if (url.pathname === '/api/refreshToken') {
      const authorizedResponse = await handleRedirect(event)
      if (!authorizedResponse) {
        return new Response('Unauthorized', { status: 401 })
      }
      return new Response(null, {
        ...authorizedResponse,
      })
    }

    // Redirect to autentication URL
    if (!authorized) {
      return Response.redirect(redirectUrl)
    }

    // Get page assets
    const page = await getAssetFromKV(event, options)

    // allow headers to be altered
    const response = new Response(page.body, page)

    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'unsafe-url')
    response.headers.set('Feature-Policy', 'none')

    // Logout route
    if (url.pathname === '/logout') {
      const { headers } = logout(event)
      return headers
        ? new Response(response.body, {
            ...response,
            headers: Object.assign({}, response.headers, headers),
          })
        : Response.redirect(url.origin)
    }

    const userInfo = await getUser(authorization.userInfo.sub)

    return new HTMLRewriter()
      .on('head', hydrateState(userInfo))
      .transform(response)
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: (req) =>
            new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404,
        })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}
