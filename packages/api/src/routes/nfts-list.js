import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'
import { validate } from '../utils/auth.js'

/** @type {import('../utils/router.js').Handler} */
export async function list(event, ctx) {
  const auth = await validate(event, ctx)
  const options = {}
  const { searchParams } = new URL(event.request.url)

  const limit = searchParams.get('limit')
  if (limit) {
    options.limit = parseInt(limit)
  }

  const before = searchParams.get('before')
  if (before) {
    options.before = new Date(before)
  }

  return new JSONResponse({
    ok: true,
    value: await nfts.list(auth.user.sub, options),
  })
}
