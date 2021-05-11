import { validate } from '../utils/auth.js'
import setIn from 'just-safe-set'
import { toFormData } from '../utils/form-data.js'
import * as nfts from '../models/nfts.js'
import * as pins from '../models/pins.js'
import { JSONResponse } from '../utils/json-response.js'
import * as CBOR from '@ipld/dag-cbor'
import * as pinata from '../pinata.js'
import * as cluster from '../cluster.js'
import { CID } from 'multiformats'
import { sha256 } from 'multiformats/hashes/sha2'
import * as Block from 'multiformats/block'
import * as CAR from '../utils/car.js'
import { debug } from '../utils/debug.js'

const log = debug('nft-store')

/**
 * @typedef {import('../bindings').NFT} NFT
 */

/** @type {import('../utils/router.js').Handler} */
export async function store(event, ctx) {
  const { user, tokenName } = await validate(event, ctx)
  const form = await toFormData(event.request)

  const data = JSON.parse(/** @type {string} */ (form.get('meta')))
  const dag = JSON.parse(JSON.stringify(data))

  const files = []

  for (const [name, content] of form.entries()) {
    if (name !== 'meta') {
      const file = /** @type {File} */ (content)
      const cid = CID.parse(await cluster.importAsset(file))
      const href = `ipfs://${cid}/${file.name}`
      const path = name.split('.')
      setIn(data, path, href)
      setIn(dag, path, cid)
      files.push({ name: file.name, type: file.type })
    }
  }

  const metadata = await cluster.add(new Blob([JSON.stringify(data)]))
  const block = await Block.encode({
    value: {
      ...dag,
      'metadata.json': CID.parse(metadata.cid),
      type: 'nft',
    },
    codec: CBOR,
    hasher: sha256,
  })
  const car = await CAR.encode([block.cid], [block])
  const { cid, bytes } = await cluster.add(car)

  // We do want worker to wait for this, but we do not want to
  // block response waiting on this.
  event.waitUntil(
    pinata
      .pinByHash(cid, {
        pinataOptions: { hostNodes: cluster.delegates() },
        pinataMetadata: { name: `${user.nickname}-${Date.now()}` },
      })
      .catch((err) => {
        log(err)
        ctx.sentry.captureException(err)
      })
  )

  const created = new Date().toISOString()

  /** @type {NFT} */
  const nft = {
    cid,
    created,
    type: 'nft',
    scope: tokenName,
    files,
  }

  let pin = await pins.get(cid)
  if (!pin || pin.status !== 'pinned') {
    pin = { cid, status: 'pinned', size: bytes, created }
    await pins.set(cid, pin)
  }

  await nfts.set({ user, cid }, nft, pin)

  const result = {
    ok: true,
    value: {
      ipnft: cid,
      url: `ipfs://${cid}/metadata.json`,
      data,
    },
  }

  return new JSONResponse(result)
}
