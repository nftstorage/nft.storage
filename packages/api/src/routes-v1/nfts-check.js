import { JSONResponse } from '../utils/json-response.js'
import { HTTPError } from '../errors.js'
import { createSupabaseClient } from './../utils/supabase'

const supa = createSupabaseClient()

/** @type {import('../utils/router.js').Handler} */
export const checkV1 = async (event, { params }) => {
  const { cid } = params

  const content = await supa.checkUpload(cid)

  if (content) {
    return new JSONResponse({ ok: true, content })
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
