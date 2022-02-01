import { JSONResponse } from '../utils/json-response.js'
import { HTTPError } from '../errors.js'
import { secrets, database } from '../constants.js'
import { DBClient } from '../utils/db-client'
import { parseCid } from '../utils/utils.js'
import { toCheckNftResponse } from '../utils/db-transforms.js'

const CACHE_MAX_AGE_NO_DEAL_YET = 10 * 60 // in seconds (10 minutes)
const db = new DBClient(database.url, secrets.database)

/** @type {import('../bindings').Handler} */
export const nftCheck = async (event, { params }) => {
  const cache = await caches.open('nft:check')
  // @ts-ignore match function not found in type https://developer.mozilla.org/en-US/docs/Web/API/Cache
  let res = await caches.match(event.request.url)

  if (res) {
    return res
  }

  const cid = parseCid(params.cid)
  const content = await db.getContent(cid.contentCid)

  if (!content) {
    throw new HTTPError('NFT not found', 404)
  }

  const nftCheckResponseValue = toCheckNftResponse(cid.sourceCid, content)
  const headers =
    !!nftCheckResponseValue.deals.find((d) => d.status === 'active') &&
    nftCheckResponseValue.pin.status === 'pinned'
      ? {
          // cache status response with max age
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE_NO_DEAL_YET}`,
        }
      : undefined // cache default

  res = new JSONResponse(
    {
      ok: true,
      value: nftCheckResponseValue,
    },
    {
      headers,
    }
  )

  // Cache if pin status is pinned
  if (nftCheckResponseValue.pin.status === 'pinned') {
    event.waitUntil(cache.put(event.request, res.clone()))
  }

  return res
}
