import { checkAuth } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { parse } from 'ucan-storage/did'

/** @type {import('../bindings').Handler} */
export const userDIDRegister = async (event, ctx) => {
  const { user } = checkAuth(ctx)
  const { db } = ctx
  const body = await event.request.json()

  if (body.did) {
    // Validate DID
    parse(body.did)

    await db.registerDid(body.did, user.id)

    return new JSONResponse({
      ok: true,
      value: body.did,
    })
  } else {
    throw new Error('did property is required.')
  }
}
