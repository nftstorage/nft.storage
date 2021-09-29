import { JSONResponse } from '../utils/json-response.js'
import { stores } from '../constants.js'
import { CID } from 'multiformats'

/**
 * Special route to get nfts for the migration
 */

/** @type {import('../utils/router.js').Handler} */
export async function getNFT(event, ctx) {
  const { searchParams } = new URL(event.request.url)
  const key = searchParams.get('key') || ''

  const parts = key.split(':')
  const cid = parts[parts.length - 1]

  try {
    CID.parse(cid)
  } catch (err) {
    return new JSONResponse({ ok: false, error: `${key} invalid cid` })
  }

  const [pin, nft] = await Promise.all([
    await stores.pins.getWithMetadata(cid),
    await stores.nfts.get(key, 'json'),
  ])

  if (!pin.metadata) {
    return new JSONResponse({ ok: false, error: `${key} pin not found` })
  }
  if (!nft) {
    return new JSONResponse({ ok: false, error: `${key} nft not found` })
  }

  return new JSONResponse({
    ok: true,
    nft,
    pin: {
      status: pin.metadata.status,
      size: pin.metadata.size,
    },
  })
}
