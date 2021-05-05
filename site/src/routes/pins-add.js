import * as pinata from '../pinata.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'
import * as pins from '../models/pins.js'
import * as cluster from '../cluster.js'
import { validate } from '../utils/auth.js'

/**
 * @param {FetchEvent} event
 * @returns {Promise<JSONResponse>}
 */
export async function pinsAdd(event) {
  const result = await validate(event)
  const { user, tokenName } = result
  const pinData = await event.request.json()

  if (typeof pinData.cid !== 'string') {
    return new JSONResponse(
      { error: { reason: 'INVALID_PIN_DATA', details: 'invalid CID' } },
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
  await nfts.set({ user, cid: pinData.cid }, nft, pin)

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
