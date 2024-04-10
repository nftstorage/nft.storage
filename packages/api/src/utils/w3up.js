import * as W3UP from '@web3-storage/w3up-client'
import * as ed25519 from '@ucanto/principal/ed25519'
import { StoreMemory } from '@web3-storage/access/stores/store-memory'
import * as contentClaims from '@web3-storage/content-claims/client'
import { CID } from 'multiformats/cid'
import { base64 } from 'multiformats/bases/base64'
import { identity } from 'multiformats/hashes/identity'
import { CarReader } from '@ipld/car'
import { importDAG } from '@ucanto/core/delegation'
import * as W3upClient from '@web3-storage/w3up-client'
import { parseLink } from '@ucanto/core'
import { connect } from '@ucanto/client'
import { CAR, HTTP } from '@ucanto/transport'

/**
 * @param {object} env
 * @param {string|undefined} [env.principal]
 * @param {string|undefined} [env.proof]
 */
export async function getW3upClient({ principal, proof } = {}) {
  if (!principal) {
    throw new Error('could not get w3up client, no principal was passed')
  }
  const signer = ed25519.parse(principal)
  const store = new StoreMemory()
  const w3up = await W3UP.create({ principal: signer, store })
  if (proof) {
    await w3up.addSpace(await parseW3Proof(proof))
  }
  return { w3up, store, principal }
}

/**
 * @param {string} proof - UCAN Delegation encoded as CID (multicodec=CAR, multihash=identity)
 */
async function parseW3Proof(proof) {
  let cid
  try {
    cid = CID.parse(proof, base64)
  } catch (/** @type {any} */ err) {
    if (err?.message?.includes('Unexpected end of data')) {
      console.error(
        `Error: failed to read proof. The string has been truncated.`
      )
    }
    throw err
  }

  if (cid.multihash.code !== identity.code) {
    throw new Error('expected cid to have identity code')
  }
  const delegation = await readProofFromBytes(cid.multihash.digest)
  return delegation
}

/**
 * @param {Uint8Array} bytes Path to the proof file.
 */
export async function readProofFromBytes(bytes) {
  const blocks = []
  try {
    const reader = await CarReader.fromBytes(bytes)
    for await (const block of reader.blocks()) {
      blocks.push(block)
    }
  } catch (/** @type {any} */ err) {
    console.error(`Error: failed to parse proof: ${err.message}`)
    throw err
  }
  try {
    // @ts-expect-error Block types are slightly different but it works
    return importDAG(blocks)
  } catch (/** @type {any} */ err) {
    console.error(`Error: failed to import proof: ${err.message}`)
    throw err
  }
}

/**
 * @param {object} options
 * @param {string} options.url
 * @param {string} options.principal
 * @param {string} options.proof
 * @param {import('@ucanto/interface').DID} options.did
 */
export async function createW3upClientFromConfig(options) {
  const url = new URL(options.url)
  const principal = ed25519.parse(options.principal)
  const connection = connect({
    id: { did: () => options.did },
    codec: CAR.outbound,
    channel: HTTP.open({
      url,
      method: 'POST',
    }),
  })
  const store = new StoreMemory()
  const w3up = await W3upClient.create({
    principal,
    store,
    serviceConf: {
      upload: connection,
      access: connection,
      filecoin: connection,
    },
    receiptsEndpoint: new URL('/receipt/', options.url),
  })
  await w3up.addSpace(await parseW3Proof(options.proof))
  return w3up
}

/**
 *
 * @param {W3upClient.Client} client
 * @param {import('@web3-storage/upload-client/types').UploadListItem} upload
 * @returns {Promise<import('@web3-storage/access').Result<import('@web3-storage/access').FilecoinInfoSuccess>[]>}
 */
async function getFilecoinInfos(client, upload) {
  return await Promise.all(
    // for each shard of the upload
    upload.shards
      ? upload.shards.map(async (shard) => {
          // find the equivalent piece link
          const pieceClaims = await contentClaims.read(shard)
          const pieceClaim =
            /** @type {import('@web3-storage/content-claims/client/api').EqualsClaim} */ (
              pieceClaims.find((c) => c.type === 'assert/equals')
            )
          if (pieceClaim) {
            const pieceLink = pieceClaim.equals
            // and get filecoin info for it
            const filecoinInfo = await client.capability.filecoin.info(
              /** @type {import('@web3-storage/access').PieceLink} */ (
                pieceLink
              )
            )
            return filecoinInfo.out
          } else {
            return {
              error: {
                name: 'PieceLinkClaimNotFound',
                message: `could not find piece link equivalent of ${shard}`,
              },
            }
          }
        })
      : []
  )
}

/**
 *
 * @param {W3upClient.Client | undefined} client
 * @param {string} contentCid
 * @returns {Promise<import('../bindings').Deal[]>}
 */
export async function getW3upDeals(client, contentCid) {
  if (client) {
    const link = parseLink(contentCid)
    // get the upload
    const upload = await client.capability.upload.get(link)
    const filecoinInfoResults = await getFilecoinInfos(client, upload)
    /**
     * @type {import('../bindings').Deal[]}
     */
    const filecoinInfos = []
    for (const result of filecoinInfoResults) {
      if (result.ok) {
        const info = result.ok
        for (const deal of info.deals) {
          filecoinInfos.push({
            pieceCid: info.piece.toString(),
            status: 'published',
            // TODO: figure these two out
            datamodelSelector: '',
            batchRootCid: deal.aggregate,
          })
        }
      } else {
        // @ts-expect-error - in practice this will just be undefined if message doesn't exist
        console.warn(`error getting filecoininfo: ${result.error.message}`)
      }
    }
    return filecoinInfos
  } else {
    return []
  }
}
