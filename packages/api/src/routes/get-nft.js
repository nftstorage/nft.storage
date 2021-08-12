import { JSONResponse } from '../utils/json-response.js'
import { stores } from '../constants.js'

/**
 * Special route to get nfts for the fauna migration
 */

/** @type {import('../utils/router.js').Handler} */
export async function getNFT(event, ctx) {
  const { searchParams } = new URL(event.request.url)
  const key = searchParams.get('key') || ''

  const nft = await stores.nfts.get(key, 'json')
  if (nft) {
    return new JSONResponse({ ok: true, nft })
  } else {
    return new JSONResponse({ ok: false, error: `${key} not found` })
  }
}
