import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth-v1.js'

/** @type {import('../utils/router.js').Handler} */
export async function nftListV1(event, ctx) {
  const { user, supa } = await validate(event, ctx)
  const options = {}
  const { searchParams } = new URL(event.request.url)

  const limit = searchParams.get('limit')
  if (limit) {
    options.limit = parseInt(limit)
  }

  const before = searchParams.get('before')
  if (before) {
    options.before = before
  }

  const nfts = await supa.listUploads({
    limit,
    before,
    issuer: user.issuer,
  })

  return new JSONResponse({
    ok: true,
    value: nfts,
  })
}
