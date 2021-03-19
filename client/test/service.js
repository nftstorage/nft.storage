import { CID } from 'multiformats'
import { importBlob, importDirectory } from './importer.js'
import { Response, Request } from './mock-server.js'
/**
 * @param {Request} request
 */
const headers = ({ headers }) => ({
  'Access-Control-Allow-Origin': headers.get('origin') || '*',
  'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
  // Allow all future content Request headers to go back to browser
  // such as Authorization (Bearer) or X-Client-Name-Version
  'Access-Control-Allow-Headers':
    headers.get('Access-Control-Request-Headers') || '',
  'Content-Type': 'application/json;charset=UTF-8',
})

/**
 * @param {Request} request
 */
const importUpload = async (request) => {
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('multipart/form-data')) {
    const data = await request.formData()
    const files = /** @type {File[]} */ (data.getAll('file'))
    return await importDirectory(files)
  } else {
    const content = await request.arrayBuffer()
    return await importBlob(new Uint8Array(content))
  }
}

/**
 * @typedef {{AUTH_TOKEN:string, store: Map<string, any>}} State
 * @returns {State}
 */
export const init = (token = Math.random().toString(32).slice(2)) => ({
  AUTH_TOKEN: token,
  store: new Map(),
})

/**
 * @param {Request} request
 * @param {State} state
 */
export const handle = async (request, { store, AUTH_TOKEN }) => {
  const url = new URL(request.url)

  const [_, api, param] = url.pathname.split('/')
  const auth = request.headers.get('authorization')
  const [, token] = (auth && auth.match(/Bearer (.+)/)) || []

  // If preflight
  if (request.method === 'OPTIONS') {
    return new Response('', { headers: headers(request) })
  }

  // If not authorized 401
  if (token !== AUTH_TOKEN) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: { message: 'Unauthorized' },
      }),
      {
        status: 401,
        headers: headers(request),
      }
    )
  }

  switch (`${request.method} /${api}/${param}`) {
    case 'POST /api/upload': {
      const { cid } = await importUpload(request)
      const key = `${token}:${cid}`
      if (!store.get(key)) {
        const created = new Date()
        store.set(key, {
          cid: cid.toString(),
          deals: { status: 'ongoing', deals: [] },
          pin: {
            cid: cid.toString(),
            status: 'pinned',
            created,
          },
          created,
        })
      }
      const result = { ok: true, value: { cid: cid.toString() } }

      return new Response(JSON.stringify(result), {
        headers: headers(request),
      })
    }
    case `GET /api/${param}`: {
      const cid = CID.parse(param || '')
      const value = store.get(`${token}:${cid}`)
      const [status, result] = value
        ? [200, { ok: true, value }]
        : [
            404,
            {
              ok: false,
              error: { message: `NFT with a CID ${cid} not found` },
            },
          ]

      return new Response(JSON.stringify(result), {
        status,
        headers: headers(request),
      })
    }
    case `DELETE /api/${param}`: {
      const cid = CID.parse(param || '')
      store.delete(`${token}:${cid}`)
      return new Response(JSON.stringify({ ok: true }), {
        headers: headers(request),
      })
    }
    default: {
      const result = {
        ok: false,
        error: { message: `No such API endpoint ${url.pathname}` },
      }

      return new Response(JSON.stringify(result), {
        status: 404,
        headers: headers(request),
      })
    }
  }
}
