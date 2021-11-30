import { JSONResponse } from '../utils/json-response.js'
import { loginOrRegister } from '../utils/auth.js'

/** @type {import('../bindings').Handler} */
export async function login(event, ctx) {
  const data = await event.request.json()
  const auth = await loginOrRegister(event, data, ctx)
  return new JSONResponse({
    ok: true,
    value: auth,
  })
}
