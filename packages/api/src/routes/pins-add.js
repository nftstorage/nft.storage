import mergeOptions from 'merge-options'
import { CID } from 'multiformats'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'
import * as pins from '../models/pins.js'
import * as pinataQueue from '../models/pinata-queue.js'
import * as cluster from '../cluster.js'
import { validate } from '../utils/auth.js'
import { debug } from '../utils/debug.js'

const merge = mergeOptions.bind({ ignoreUndefined: true })
const log = debug('pins-add')

/** @type {import('../utils/router.js').Handler} */
export async function pinsAdd(event, ctx) {
  const { user, tokenName } = await validate(event, ctx)
  const pinData = await event.request.json()

  try {
    CID.parse(pinData.cid)
  } catch {
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

  const pin = await obtainPin(pinData.cid)

  const origins = [...(pinData.origins || []), ...cluster.delegates()]
  event.waitUntil(pinataQueue.add(pinData.cid, { origins }))

  const nft = await obtainNft(user, tokenName, pin, { name, meta })

  /** @type import('../pinata-psa').PinStatus */
  const pinStatus = {
    requestid: pin.cid,
    status: pin.status,
    created: pin.created,
    pin: { cid: pin.cid, ...(nft.pin || {}) },
    delegates: cluster.delegates(),
  }
  return new JSONResponse(pinStatus)
}

/**
 * @param {string} cid
 * @returns {Promise<import('../models/pins.js').Pin>}
 */
export const obtainPin = async (cid) => {
  const pin = await pins.get(cid)
  return pin == null
    ? createPin(cid)
    : // if pin is failed, retry
    pin.status === 'failed'
    ? retryPin(pin)
    : pin
}

/**
 * @param {import('../models/pins.js').Pin} failed
 * @returns {Promise<import('../models/pins.js').Pin>}
 */
const retryPin = async (failed) => {
  /** @type {import('../models/pins.js').Pin} */
  const pin = { ...failed, status: 'queued' }
  await pins.set(failed.cid, pin)
  return pin
}

/**
 * @param {string} cid
 * @returns {Promise<import('../models/pins.js').Pin>}
 */
const createPin = async (cid) => {
  const created = new Date().toISOString()
  /** @type {import('../models/pins.js').Pin} */
  const pin = { cid, status: 'queued', size: 0, created }
  await cluster.pin(cid)
  await pins.set(cid, pin)
  return pin
}

/**
 * @param {import('../bindings').User} user
 * @param {string} tokenName
 * @param {import('../models/pins.js').Pin} pin
 * @param {import('../bindings').NFT['pin']} nftPin
 * @returns {Promise<import('../bindings').NFT>}
 */
export const obtainNft = async (user, tokenName, pin, nftPin) => {
  const nft = await nfts.get({ user, cid: pin.cid })
  return nft == null
    ? createNft(user, tokenName, pin, nftPin)
    : updateNft(user, nft, pin, nftPin)
}

/**
 * @param {import('../bindings').User} user
 * @param {string} tokenName
 * @param {import('../models/pins.js').Pin} pin
 * @param {import('../bindings').NFT['pin']} nftPin
 * @returns {Promise<import('../bindings').NFT>}
 */
const createNft = async (user, tokenName, pin, nftPin) => {
  /** @type import('../bindings').NFT */
  const nft = {
    cid: pin.cid,
    created: new Date().toISOString(),
    type: 'remote',
    scope: tokenName,
    files: [],
    pin: nftPin,
  }
  await nfts.set({ user, cid: pin.cid }, nft, pin)
  return nft
}

/**
 * @param {import('../bindings').User} user
 * @param {import('../bindings').NFT} nft
 * @param {import('../models/pins.js').Pin} pin
 * @param {import('../bindings').NFT['pin']} nftPin
 * @returns {Promise<import('../bindings').NFT>}
 */
const updateNft = async (user, nft, pin, nftPin) => {
  nft.pin = merge(nft.pin, nftPin)
  await nfts.set({ user, cid: nft.cid }, nft, pin)
  return nft
}
