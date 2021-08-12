import { JSONResponse } from '../utils/json-response.js'
import { loginOrRegister } from '../utils/auth-v1.js'

/** @type {import('../utils/router').Handler} */
export async function loginV1(event) {
  const data = await event.request.json()
  const auth = await loginOrRegister(event, data)
  return new JSONResponse({
    ok: true,
    value: auth,
  })
}
