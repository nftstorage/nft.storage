import { JSONResponse } from '../utils/json-response.js'
import { loginOrRegister } from '../utils/auth-v1.js'

/** @type {import('../bindings').Handler} */
export async function loginV1(event, ctx) {
  const data = await event.request.json()
  const auth = await loginOrRegister(event, ctx, data)
  return new JSONResponse({
    ok: true,
    value: auth,
  })
}
