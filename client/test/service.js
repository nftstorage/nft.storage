import { CID } from 'multiformats'
import { sha256 } from 'multiformats/hashes/sha2'
import { importBlob, importDirectory } from './importer.js'
import { Response, Request } from './mock-server.js'
import * as CBOR from '@ipld/dag-cbor'
import setIn from 'just-safe-set'
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
    if (files.length === 0) {
      throw Error('No files were provided')
    }
    return await importDirectory(files)
  } else {
    const content = await request.arrayBuffer()
    return await importBlob(new Uint8Array(content))
  }
}

/**
 * @param {File} file
 * @returns {Promise<CID>}
 */
const importAsset = async (file) => {
  const { cid } = await importDirectory([file])
  return CID.parse(cid.toString())
}

/**
 * @param {Request} request
 */
const importToken = async (request) => {
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData()

    const data = JSON.parse(/** @type {string} */ (form.get('meta')))
    const dag = JSON.parse(JSON.stringify(data))

    for (const [name, content] of form.entries()) {
      if (name !== 'meta') {
        const file = /** @type {File} */ (content)
        const cid = await importAsset(file)
        const href = `ipfs://${cid}/${file.name}`
        const path = name.split('.')
        setIn(data, path, href)
        setIn(dag, path, cid)
      }
    }

    const metadata = await importBlob(JSON.stringify(data))

    const bytes = CBOR.encode({
      ...dag,
      'metadata.json': metadata.cid,
      type: 'nft',
    })
    const hash = await sha256.digest(bytes)
    const ipnft = CID.create(1, CBOR.code, hash)

    const result = {
      ok: true,
      value: {
        ipnft: ipnft.toString(),
        url: `ipfs://${ipnft}/metadata.json`,
        data,
      },
    }

    return result
  } else {
    throw Error('/store expects multipart/form-data')
  }
}

/**
 * @typedef {{AUTH_TOKEN:string, store: Map<string, any>}} State
 * @param {string} [token]
 * @param {Map<string, any>} [store]
 * @returns {State}
 */
export const init = (
  token = Math.random().toString(32).slice(2),
  store = new Map()
) => ({
  AUTH_TOKEN: token,
  store,
})

/**
 * @param {Request} request
 * @param {State} state
 */
export const handle = async (request, { store, AUTH_TOKEN }) => {
  const url = new URL(request.url)

  const [_, ...pathParts] = url.pathname.split('/')
  const auth = request.headers.get('authorization')
  const [, token] = (auth && auth.match(/Bearer (.+)/)) || []

  // If preflight
  if (request.method === 'OPTIONS') {
    return new Response('', { headers: headers(request) })
  }

  const authorize = () => {
    // If not authorized 401
    if (token !== AUTH_TOKEN) {
      throw Object.assign(new Error('Unauthorized'), { status: 401 })
    }
  }

  try {
    switch (`${request.method} /${pathParts.join('/')}`) {
      case 'POST /upload': {
        authorize()
        const { cid } = await importUpload(request)
        const key = `${token}:${cid}`
        if (!store.get(key)) {
          const created = new Date()
          store.set(key, {
            cid: cid.toString(),
            deals: [],
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
      case 'POST /store': {
        authorize()
        const result = await importToken(request)
        return new Response(JSON.stringify(result), {
          headers: headers(request),
        })
      }
      case `GET /check/${pathParts[1]}`: {
        const cid = CID.parse(pathParts[1] || '')
        const value = store.get(`${AUTH_TOKEN}:${cid}`)
        if (!value) {
          throw Object.assign(new Error(`not found: ${cid}`), { status: 404 })
        }
        return new Response(
          JSON.stringify({
            ok: true,
            value: {
              cid: cid.toString(),
              pin: { status: value.pin.status },
              deals: value.deals,
            },
          }),
          {
            headers: headers(request),
          }
        )
      }
      case `GET /${pathParts[0]}`: {
        authorize()
        const cid = CID.parse(pathParts[0] || '')
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
      case `DELETE /${pathParts[0]}`: {
        authorize()
        const cid = CID.parse(pathParts[0] || '')
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
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: { message: error.message },
      }),
      {
        status: error.status || 500,
        headers: headers(request),
      }
    )
  }
}
