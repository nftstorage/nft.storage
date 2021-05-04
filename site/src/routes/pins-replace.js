import * as PinataPSA from '../pinata-psa.js'
import * as pinata from '../pinata.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'
import * as pins from '../models/pins.js'
import * as cluster from '../cluster.js'
import { validate } from '../utils/auth.js'

/**
 * @param {FetchEvent} event
 * @param {Record<string,string>} params
 * @returns {Promise<JSONResponse>}
 */
export async function pinsReplace(event, params) {
  const result = await validate(event)
  const { user, tokenName } = result
  let existingCID = params.requestid
  let found = await nfts.get({ user, cid: existingCID })

  if (!found) {
    // maybe this is an old Pinata pin?
    const res = await PinataPSA.pinsGet(params.requestid)
    if (res.ok) {
      existingCID = res.value.pin.cid
      found = await nfts.get({ user, cid: existingCID })
    }
  }

  if (!found) {
    return new JSONResponse(
      { error: { reason: 'NOT_FOUND', details: 'pin not found' } },
      { status: 404 }
    )
  }

  const pinData = await event.request.json()
  if (typeof pinData.cid !== 'string') {
    return new JSONResponse(
      { error: { reason: 'INVALID_PIN_DATA', details: 'invalid CID' } },
      { status: 400 }
    )
  }
  if (pinData.cid === existingCID) {
    return new JSONResponse(
      {
        error: {
          reason: 'INVALID_PIN_DATA',
          details: 'exiting and replacement CID are the same',
        },
      },
      { status: 400 }
    )
  }
  if (pinData.name && typeof pinData.name !== 'string') {
    return new JSONResponse(
      { error: { reason: 'INVALID_PIN_DATA', details: 'invalid name' } },
      { status: 400 }
    )
  }

  const name = pinData.name

  let meta
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

  const created = new Date().toISOString()
  let pin = await pins.get(pinData.cid)
  if (pin) {
    // if this failed to pin, try again
    if (pin.status === 'failed') {
      await cluster.recover(pinData.cid)
      pin = { ...pin, status: 'queued' }
      await pins.set(pinData.cid, pin)
    }
  } else {
    await cluster.pin(pinData.cid)
    pin = { status: 'queued', size: 0, created }
    await pins.set(pinData.cid, pin)
  }

  event.waitUntil(
    (async () => {
      try {
        const hostNodes = [...(pinData.origins || []), ...cluster.delegates()]
        await pinata.pinByHash(pinData.cid, {
          pinataOptions: { hostNodes },
          pinataMetadata: { name: `${user.nickname}-${Date.now()}` },
        })
      } catch (err) {
        console.error(err)
      }
    })()
  )

  /** @type import('../bindings').NFT */
  const nft = {
    cid: pinData.cid,
    created,
    type: 'remote',
    scope: tokenName,
    files: [],
    pin: { name, meta },
  }
  await Promise.all([
    nfts.set({ user, cid: pinData.cid }, nft),
    nfts.remove({ user, cid: existingCID }),
  ])

  /** @type import('../pinata-psa').PinStatus */
  const pinStatus = {
    requestid: pinData.cid,
    status: pin.status,
    created: pin.created,
    pin: { cid: pinData.cid, name, meta },
    delegates: cluster.delegates(),
  }
  return new JSONResponse(pinStatus)
}
