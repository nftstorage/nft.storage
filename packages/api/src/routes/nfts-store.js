import { checkAuth } from '../utils/auth.js'
import { setIn } from '../utils/utils.js'
import { JSONResponse } from '../utils/json-response.js'
import * as CBOR from '@ipld/dag-cbor'
import * as cluster from '../cluster.js'
import { CID } from 'multiformats'
import { sha256 } from 'multiformats/hashes/sha2'
import * as Block from 'multiformats/block'
import * as CAR from '../utils/car.js'

/**
 * @typedef {import('../bindings').NFT} NFT
 */

/** @type {import('../bindings').Handler} */
export async function nftStore(event, ctx) {
  const { user, key } = checkAuth(ctx)
  const { db } = ctx
  const form = await event.request.formData()

  const meta = /** @type {string} */ (form.get('meta'))
  const data = JSON.parse(meta)
  const dag = JSON.parse(meta)

  const files = []

  for (const entry of form.entries()) {
    const [name, content] = /** @type {[key: string, value: string | File]} */ (
      /** @type {unknown}*/ (entry)
    )
    if (name !== 'meta') {
      const file = /** @type {File} */ (content)
      const asset = await cluster.importAsset(file, {
        local: false,
      })
      const cid = CID.parse(asset)

      const href = `ipfs://${cid}/${file.name}`
      const path = name.split('.')
      setIn(data, path, href)
      setIn(dag, path, cid)
      files.push({ name: file.name, type: file.type })
    }
  }

  const blob = new Blob([JSON.stringify(data)])
  const metadata = await cluster.add(blob, {
    local: true,
  })
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
  const { cid, bytes } = await cluster.addCar(car, {
    local: true,
  })

  await db.createUpload({
    type: 'Nft',
    content_cid: cid,
    source_cid: cid,
    dag_size: bytes,
    user_id: user.id,
    key_id: key?.id,
  })

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
