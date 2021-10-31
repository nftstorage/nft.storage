import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { signJWT } from '../utils/jwt.js'
import { secrets } from '../constants.js'

/** @type {import('../bindings').Handler} */
export const tokensCreateV1 = async (event, ctx) => {
  const { user } = await validate(event, ctx)
  const { db } = ctx
  const body = await event.request.json()

  if (body.name) {
    const created = new Date()
    const token = await signJWT(
      {
        sub: user.magic_link_id,
        iss: 'nft-storage',
        iat: created.valueOf(),
        name: body.name,
      },
      secrets.salt
    )

    const key = await db.createKey({
      name: body.name,
      secret: token,
      userId: user.id,
    })
    return new JSONResponse({
      ok: true,
      value: key,
    })
  } else {
    throw new Error('Token name is required.')
  }
}
