import { spawn } from "child_process"
import { activate, deactivate, Response, Request } from "./mock-server.js"
import { CID } from 'multiformats'
import { readFile } from './importer.js'
/**
 * @param {Request} request
 */
const headers = ({headers}) => ({
  'Access-Control-Allow-Origin': headers.get('origin') || '*',
  'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
  // Allow all future content Request headers to go back to browser
  // such as Authorization (Bearer) or X-Client-Name-Version
  'Access-Control-Allow-Headers':
  headers.get('Access-Control-Request-Headers') || '',
  'Content-Type': 'application/json;charset=UTF-8'
})


const main = async () => {
  const AUTH_TOKEN = Math.random().toString(32).slice(2)
  const store = new Map()

  const service = await activate(async (request) => {
    const url = new URL(request.url)
    const [_, api, endpoint, param] = url.pathname.split('/')
    const auth = request.headers.get('authorization')
    const [, token] = (auth && auth.match(/Bearer (.+)/)) || []


    // If preflight
    if (request.method === 'OPTIONS') {
      return new Response('', { headers: headers(request) })

    }

    // If not authorized 401
    if (token !== AUTH_TOKEN) {
      return new Response(JSON.stringify({
        ok: false,
        error: { message: 'Unauthorized' }
      }), {
        status: 401,
        headers: headers(request)
      })
    }

    switch (`${request.method} /${api}/${endpoint}`) {
      case 'POST /api/upload': {
        const contentType = request.headers.get('content-type') || ''
        if (contentType.includes('multipart/form-data')) {
          throw new Error('Not Implemented')
        } else {
          const content = await request.arrayBuffer()
          const { cid } = await readFile(new Uint8Array(content))
          const key = `${token}:${cid}`
          if (!store.get(key)) {
            const created = new Date()
            store.set(key, {
              cid: cid.toString(),
              deals: { status: 'ongoing', deals: [] },
              pin: {
                cid: cid.toString(),
                status: "pinned",
                created
              },
              created
            })
          }
          const result = { ok: true, value: { cid: cid.toString() }}
          return new Response(JSON.stringify(result), {
            headers: headers(request)
          })
        }
      }
      case 'GET /api/status': {
        const cid = CID.parse(param || '')
        const value = store.get(`${token}:${cid}`)
        const [status, result] = value
          ? [200, { ok: true, value }]
          : [404, { ok: false, error: { message: `NFT with a CID ${cid} not found` } }]

        return new Response(JSON.stringify(result), {
          status,
          headers: headers(request)
        })
      }
      case 'DELETE /api/delete': {
        const cid = CID.parse(param || '')
        store.delete(`${token}:${cid}`)
        return new Response(JSON.stringify({ ok: true }), {
          headers: headers(request)
        })
      }
      default: {
        const result = {
          ok: false,
          error: { message: `No such API endpoint ${url.pathname}` }
        }

        return new Response(JSON.stringify(result), {
          status: 404,
          headers: headers(request)
        })
      }
    }
  })

  const SERVICE_ENDPOINT = `http://${service.address.host}:${service.address.port}`

  console.log(`Mock service running on: ${SERVICE_ENDPOINT}`)

  const test = spawn('playwright-test',['**/*.spec.js', '-r', 'zora'], {
    stdio: "inherit",
    env: {
      ...process.env,
      SERVICE_ENDPOINT,
      AUTH_TOKEN
    }
  })

  const code = await new Promise(resolve => test.once('exit', code => resolve(code)))

  deactivate(service)

  process.exit(code)
}

main()
