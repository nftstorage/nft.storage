import { CID } from 'multiformats'
import { JSONResponse } from '../utils/json-response.js'
import * as cluster from '../cluster.js'
import { validate } from '../utils/auth-v1.js'
import { debug } from '../utils/debug.js'

const log = debug('pins-add')

/** @type {import('../utils/router.js').Handler} */
export async function pinsAddV1(event, ctx) {
  const { db, user, key } = await validate(event, ctx)

  /** @type {import('../bindings').PinsAddInput} */
  const pinData = await event.request.json()

  // validate CID
  try {
    CID.parse(pinData.cid)
  } catch {
    return new JSONResponse(
      { error: { reason: 'INVALID_PIN_DATA', details: 'invalid CID' } },
      { status: 400 }
    )
  }

  // validate name
  if (pinData.name && typeof pinData.name !== 'string') {
    return new JSONResponse(
      { error: { reason: 'INVALID_PIN_DATA', details: 'invalid name' } },
      { status: 400 }
    )
  }
  let meta

  // validate meta
  if (pinData.meta) {
    if (typeof pinData.meta !== 'object' || Array.isArray(pinData.meta)) {
      return new JSONResponse(
        { error: { reason: 'INVALID_PIN_DATA', details: 'invalid metadata' } },
        { status: 400 }
      )
    }
    meta = Object.fromEntries(
      Object.entries(pinData.meta).filter(([, v]) => typeof v === 'string')
    )
  }

  await cluster.pin(pinData.cid, {
    origins: pinData.origins,
    name: pinData.name,
    metadata: pinData.meta,
  })

  const upload = await db.createUpload({
    type: 'remote',
    cid: pinData.cid,
    issuer: user.issuer,
    key_id: key?.key_id,
    origins: pinData.origins,
    meta: pinData.meta,
    name: pinData.name,
    pins: [
      {
        status: 'queued',
        service: 'IPFS_CLUSTER',
      },
      {
        status: 'queued',
        service: 'PINATA',
      },
    ],
  })

  /** @type import('../bindings').PinsResponse */
  const pinStatus = {
    requestid: upload.cid,
    status: upload.content.pin[0].status,
    created: upload.inserted_at,
    pin: {
      cid: upload.cid,
      name: upload.name,
      meta: upload.meta,
      origins: upload.origins,
    },
    delegates: cluster.delegates(),
  }

  if (pinStatus.status === 'failed') {
    await cluster.recover(upload.cid)
  }

  return new JSONResponse(pinStatus)
}
