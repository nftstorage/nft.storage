import { CID } from 'multiformats'
import { File } from '../src/platform.js'
import { sha256 } from 'multiformats/hashes/sha2'
import { importBlob, importDirectory } from './importer.js'
import { Response, Request } from './mock-server.js'
import CBOR from '@ipld/dag-cbor'
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
    const metadata = JSON.parse(JSON.stringify(data))

    for (const [path, content] of form.entries()) {
      if (path !== 'meta') {
        const file = /** @type {File} */ (content)
        const cid = await importAsset(file)
        const href = `ipfs://${cid}/${file.name}`
        setAt(path.split('.'), dag, cid)
        setAt(path.split('.'), data, { '@': 'URL', href })
        setAt(path.split('.'), metadata, href)
      }
    }

    dag.meta = await importAsset(
      new File([JSON.stringify(metadata)], 'data.json')
    )

    const bytes = CBOR.encode(dag)
    const hash = await sha256.digest(bytes)
    const cid = CID.create(1, CBOR.code, hash)

    const result = {
      ok: true,
      value: {
        ipld: cid.toString(),
        metadata: { '@': 'URL', href: `ipfs://${dag.meta}/data.json` },
        data,
      },
    }

    return result
  } else {
    throw Error('/api/store expects multipart/form-data')
  }
}

/**
 * Sets a given `value` at the given `path` on a passed `object`.
 *
 * @example
 * ```js
 * const obj = { a: { b: { c: 1 }}}
 * setAt('a.b.c', obj, 5)
 * obj.a.b.c //> 5
 * ```
 * 
 * @template V
 * @param {string[]} path
 * @param {any} object
 * @param {V} value
 */
const setAt = (path, object, value) => {
  const n = path.length - 1
  let target = object
  for (let [index, key] of path.entries()) {
    if (index === n) {
      target[key] = value
    } else {
      target = target[key]
    }
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
  try {
    switch (`${request.method} /${api}/${param}`) {
      case 'POST /api/store': {
        const result = await importToken(request)
        return new Response(JSON.stringify(result), {
          headers: headers(request),
        })
      }
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
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: { message: error.message },
      }),
      {
        status: 500,
        headers: headers(request),
      }
    )
  }
}
