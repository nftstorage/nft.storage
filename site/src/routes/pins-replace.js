import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import * as PinataPSA from '../pinata-psa.js'
import * as pinata from '../pinata.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'
import * as cluster from '../cluster.js'

/**
 * @param {FetchEvent} event
 * @param {Record<string,string>} params
 * @returns {Promise<JSONResponse>}
 */
export async function pinsReplace(event, params) {
  const result = await verifyToken(event)
  if (!result.ok) {
    return HTTPError.respond(result.error)
  }
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

  /** @type import('@nftstorage/ipfs-cluster').PinResponse | undefined */
  let pin
  /** @type import('../pinata-psa').Status */
  let status = 'pinning'
  let size = 0
  try {
    pin = await cluster.allocation(pinData.cid)
  } catch (err) {
    // if 404 we can continue, we have not pinned this CID
    if (!err.response || err.response.status !== 404) {
      throw err
    }
  }

  if (pin) {
    // if we cached the size then use it
    if (pin.metadata && pin.metadata.size) {
      size = parseInt(pin.metadata.size)
    }
    // we have this pin already allocated in our cluster, get the status...
    status = cluster.toPSAStatus(await cluster.status(pin.cid))
    // if this failed to pin, try again
    if (status === 'failed') {
      await cluster.recover(pinData.cid)
    }
  } else {
    pin = await cluster.pin(pinData.cid)
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

  const created = new Date()
  /** @type import('../bindings').NFT */
  const nft = {
    cid: pin.cid,
    size,
    created: created.toISOString(),
    type: 'remote',
    scope: tokenName,
    files: [],
    pin: {
      cid: pin.cid,
      name,
      meta,
      size,
      status,
      created: created.toISOString(),
    },
  }
  const metadata = {
    name,
    meta,
    pinStatus: status,
    size,
    created: created.toISOString(),
  }
  await Promise.all([
    nfts.set({ user, cid: pin.cid }, nft, { metadata }),
    nfts.remove({ user, cid: existingCID }),
  ])

  /** @type import('../pinata-psa').PinStatus */
  const pinStatus = {
    requestid: pin.cid,
    status,
    created: created.toISOString(),
    pin: { cid: pin.cid, name, meta },
    delegates: cluster.delegates(),
  }
  return new JSONResponse(pinStatus)
}
