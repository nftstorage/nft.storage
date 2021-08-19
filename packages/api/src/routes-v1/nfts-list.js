import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth-v1.js'

/** @type {import('../utils/router.js').Handler} */
export async function nftListV1(event, ctx) {
  const { fauna } = await validate(event, ctx)
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

  const { listUploads } = await fauna.listUploads({
    size: options.limit || 10,
    before: options.before || new Date().toISOString(),
  })
  /** @type {import('../bindings').NFTResponse[]} */
  const rsp = []

  if (listUploads) {
    for (const up of listUploads) {
      /** @type {import('../bindings').NFTResponse} */
      const nft = {
        cid: up.cid,
        created: up.created,
        files: up.files || [],
        scope: up.key?.name || 'session',
        size: up.content.dagSize || 0,
        type: up.type,
        deals: [],
        pin: {
          cid: up.cid,
          created: up.created,
          size: up.content.dagSize || 0,
          status: up.content.pins.data[0]?.status || 'queued',
        },
      }
      rsp.push(nft)
    }
  }

  return new JSONResponse({
    ok: true,
    value: rsp,
  })
}
