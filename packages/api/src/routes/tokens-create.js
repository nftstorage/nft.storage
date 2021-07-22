import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { signJWT } from '../utils/jwt.js'
import { secrets } from '../constants.js'

/** @type {import('../utils/router.js').Handler} */
export const tokensCreate = async (event, ctx) => {
  const { fauna, login } = await validate(event, ctx)
  const body = await event.request.json()

  if (body.name) {
    const created = new Date()
    const token = await signJWT(
      {
        sub: login.issuer,
        iss: 'nft-storage',
        iat: created.valueOf(),
        name: body.name,
      },
      secrets.salt
    )
    await fauna.createKey({
      input: {
        name: body.name,
        secret: token,
        created: created.toISOString(),
        user: { connect: login.ref },
      },
    })
  } else {
    throw new Error('Token name is required.')
  }

  return new JSONResponse({
    ok: true,
  })
}
