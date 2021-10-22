import { JSONResponse } from '../utils/json-response.js'
import { stores } from '../constants.js'

/**
 * Special route to get nfts for the migration
 */

/** @type {import('../utils/router.js').Handler} */
export async function listNfts(event, ctx) {
  const { searchParams } = new URL(event.request.url)
  const cursorInput = searchParams.get('cursor') || ''

  const { list_complete, cursor, keys } = await stores.nfts.list({
    cursor: cursorInput,
  })

  return new JSONResponse({
    ok: true,
    list_complete,
    cursor,
    data: keys.map(k => k.name),
  })
}
