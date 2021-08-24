import { validate } from '../utils/auth-v1.js'
import setIn from 'just-safe-set'
import { toFormData } from '../utils/form-data.js'
import { JSONResponse } from '../utils/json-response.js'
import * as CBOR from '@ipld/dag-cbor'
import * as cluster from '../cluster.js'
import { CID } from 'multiformats'
import { sha256 } from 'multiformats/hashes/sha2'
import * as Block from 'multiformats/block'
import * as CAR from '../utils/car.js'
import { debug } from '../utils/debug.js'
import * as constants from '../constants.js'

const log = debug('nft-store')

/**
 * @typedef {import('../bindings').NFT} NFT
 */

/** @type {import('../utils/router.js').Handler} */
export async function nftStoreV1(event, ctx) {
  const { key, fauna } = await validate(event, ctx)
  const form = await toFormData(event.request)

  const data = JSON.parse(/** @type {string} */ (form.get('meta')))
  const dag = JSON.parse(JSON.stringify(data))

  const files = []

  for (const [name, content] of form.entries()) {
    if (name !== 'meta') {
      const file = /** @type {File} */ (content)
      const cid = CID.parse(
        await cluster.importAsset(file, {
          local: file.size > constants.cluster.localAddThreshold,
        })
      )
      const href = `ipfs://${cid}/${file.name}`
      const path = name.split('.')
      setIn(data, path, href)
      setIn(dag, path, cid)
      files.push({ name: file.name, type: file.type })
    }
  }

  const blob = new Blob([JSON.stringify(data)])
  const metadata = await cluster.add(blob, {
    local: blob.size > constants.cluster.localAddThreshold,
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
  const { cid, bytes } = await cluster.add(car, {
    local: car.size > constants.cluster.localAddThreshold,
  })

  await fauna.createUploadCustom({
    input: [
      {
        cid,
        dagSize: bytes,
        type: 'NFT',
        key: key?._id,
        pins: [
          {
            status: 'unknown',
            statusText: '',
            service: 'IPFS_CLUSTER',
          },
          {
            status: 'unknown',
            statusText: '',
            service: 'PINATA',
          },
        ],
      },
    ],
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
