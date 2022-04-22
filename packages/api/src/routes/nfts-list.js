import { Validator } from '@cfworker/json-schema'
import { JSONResponse } from '../utils/json-response.js'
import { checkAuth } from '../utils/auth.js'
import { toNFTResponse } from '../utils/db-transforms.js'
import { HTTPError } from '../errors.js'

const DEFAULT_LIMIT = 10
const MAX_LIMIT = 1000

const validator = new Validator({
  type: 'object',
  required: ['before', 'limit'],
  properties: {
    before: { type: 'string', format: 'date-time' },
    limit: { type: 'integer', minimum: 1, maximum: MAX_LIMIT },
  },
})

/** @type {import('../bindings').Handler} */
export async function nftList(event, ctx) {
  const { user } = checkAuth(ctx)
  const { db } = ctx
  const { searchParams } = new URL(event.request.url)
  const options = {
    limit: searchParams.get('limit')
      ? Number(searchParams.get('limit'))
      : DEFAULT_LIMIT,
    before: searchParams.get('before') || new Date().toISOString(),
  }

  const result = validator.validate(options)
  if (!result.valid) {
    throw new HTTPError('invalid params', 400)
  }

  const nfts = await db.listUploads(user.id, options)

  return new JSONResponse({
    ok: true,
    value: nfts?.map((n) => toNFTResponse(n)),
  })
}
