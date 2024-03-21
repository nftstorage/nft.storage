import * as W3UP from '@web3-storage/w3up-client'
import * as ed25519 from '@ucanto/principal/ed25519'
import { StoreMemory } from '@web3-storage/access/stores/store-memory'
import { CID } from 'multiformats/cid'
import * as bases from 'multiformats/bases/base'
import { base64 } from 'multiformats/bases/base64'
import { identity } from 'multiformats/hashes/identity'
import { CarReader, CarWriter } from '@ipld/car'
import { importDAG } from '@ucanto/core/delegation'
import * as ucanto from '@ucanto/core'
import * as W3upClient from '@web3-storage/w3up-client'
import { connect } from '@ucanto/client'
import { CAR, HTTP } from '@ucanto/transport'

/**
 * @param {object} env
 * @param {string|undefined} [env.principal]
 * @param {string|undefined} [env.proof]
 */
export async function getW3upClient({ principal, proof } = {}) {
  const signer = principal ? ed25519.parse(principal) : await ed25519.generate()
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
 * @param {import('@ucanto/interface').Delegation} delegation - delegation to encode
 */
export async function encodeDelegationAsCid(delegation) {
  const { writer, out } = CarWriter.create()
  /** @type {Array<Uint8Array>} */
  const carChunks = []
  await Promise.all([
    // write delegation blocks
    (async () => {
      for (const block of delegation.export()) {
        // @ts-expect-error different Block types
        await writer.put(block)
      }
      await writer.close()
    })(),
    // read out
    (async () => {
      for await (const chunk of out) {
        carChunks.push(chunk)
      }
    })(),
  ])
  // now get car chunks
  const car = new Blob(carChunks)
  const bytes = new Uint8Array(await car.arrayBuffer())
  const cid = CID.createV1(ucanto.CAR.code, identity.digest(bytes))
  return cid
}

/**
 * @param {object} options
 * @param {string} options.url
 * @param {string} options.principal
 * @param {string} options.proof
 */
export async function createW3upClientFromConfig(options) {
  const url = new URL(options.url)
  const principal = ed25519.parse(options.principal)
  const connection = connect({
    id: { did: () => 'did:web:web3.storage' },
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
