import { JSONResponse } from '../utils/json-response.js'
import { stores } from '../constants.js'

/**
 * Special route to get nfts for the migration
 */

/** @type {import('../utils/router.js').Handler} */
export async function getUser(event, ctx) {
  const { searchParams } = new URL(event.request.url)
  const key = searchParams.get('key') || ''

  const user = await stores.users.get(key, 'json')
  if (!user) {
    return new JSONResponse({ ok: false, error: `${key} user not found` })
  }

  return new JSONResponse({
    ok: true,
    user,
  })
}
