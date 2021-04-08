import { HTTPError } from '../errors.js'
import { verifyToken, setIn } from '../utils/utils.js'
import { toFormData } from '../utils/form-data.js'
import * as nfts from '../models/nfts.js'
import { JSONResponse } from '../utils/json-response.js'
import { importAsset, importBlob, importBlock, stat } from '../ipfs.js'
import CBOR from '@ipld/dag-cbor'

/**
 * @typedef {import('../bindings').NFT} NFT
 */

/**
 * @param {FetchEvent} event
 */
export async function store(event) {
  const auth = await verifyToken(event)
  if (!auth.ok) {
    return HTTPError.respond(auth.error)
  }
  const { user, tokenName } = auth

  const form = await toFormData(event.request)

  const data = JSON.parse(/** @type {string} */ (form.get('meta')))
  const dag = JSON.parse(JSON.stringify(data))

  const files = []

  for (const [name, content] of form.entries()) {
    if (name !== 'meta') {
      const file = /** @type {File} */ (content)
      const cid = await importAsset(file)
      const href = `ipfs://${cid}/${file.name}`
      const path = name.split('.')
      setIn(data, path, href)
      setIn(dag, path, cid)
      files.push({ name: file.name, type: file.type })
    }
  }

  const bytes = CBOR.encode({
    ...dag,
    'metadata.json': await importBlob(new Blob([JSON.stringify(data)])),
    type: 'nft',
  })

  const ipnft = await importBlock(new Blob([bytes]))
  const { cumulativeSize: size } = await stat(ipnft)
  const created = new Date().toISOString()
  const cid = ipnft.toString()

  /** @type {NFT} */
  const nft = {
    cid,
    size,
    created,
    type: 'nft',
    scope: tokenName,
    files,
    pin: {
      cid,
      size,
      status: 'pinned',
      created,
    },
  }

  await nfts.set({ user, cid }, nft, {
    metadata: { pinStatus: 'pinned', size },
  })

  const result = {
    ok: true,
    value: {
      ipnft: ipnft.toString(),
      url: `ipfs://${ipnft}/metadata.json`,
      data,
    },
  }

  return new JSONResponse(result)
}
