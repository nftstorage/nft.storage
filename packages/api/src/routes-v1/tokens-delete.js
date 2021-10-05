import { validate } from '../utils/auth-v1.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../utils/router.js').Handler} */
export const tokensDelete = async (event, ctx) => {
  const { db } = await validate(event, ctx)
  const body = await event.request.json()

  if (body.id) {
    await db.deleteKey(body.id)
  } else {
    throw new Error('Token id is required.')
  }

  return new JSONResponse({
    ok: true,
  })
}
