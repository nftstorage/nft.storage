import * as PinataPSA from '../pinata-psa.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'
import { validate } from '../utils/auth.js'

/** @type {import('../bindings').Handler} */
export async function pinsDelete(event, ctx) {
  const { params } = ctx
  const { user } = await validate(event, ctx)
  let cid = params.requestid
  let nft = await nfts.get({ user, cid })

  if (!nft) {
    // maybe this is an old Pinata pin?
    const res = await PinataPSA.pinsGet(params.requestid)
    if (res.ok) {
      cid = res.value.pin.cid
      nft = await nfts.get({ user, cid })
    }
  }

  if (!nft) {
    return new JSONResponse(
      { error: { reason: 'NOT_FOUND', details: 'NFT not found' } },
      { status: 404 }
    )
  }

  await nfts.remove({ user, cid })

  return new Response()
}
