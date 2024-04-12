import { createServer } from 'node:http'
import { Store, Upload, Filecoin } from '@web3-storage/capabilities'
import * as Server from '@ucanto/server'
import * as CAR from '@ucanto/transport/car'
import { ed25519 } from '@ucanto/principal'
import { delegate } from '@ucanto/core'
import * as consumers from 'stream/consumers'
import { CarWriter } from '@ipld/car'
import * as ucanto from '@ucanto/core'
import { CID } from 'multiformats/cid'
import { identity } from 'multiformats/hashes/identity'
import { base64 } from 'multiformats/bases/base64'

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
 *
 * @param {import('../bindings').MockW3up} mockW3up
 * @param {string[]} capabilities
 */
export async function w3upMiniflareOverrides(
  mockW3up,
  capabilities = ['store/add', 'upload/add']
) {
  const nftStorageSpace = await ed25519.generate()
  const nftStorageSpaceDid = nftStorageSpace.did()
  const nftStorageApiPrincipal = await ed25519.generate()
  return {
    W3UP_URL: locate(mockW3up.server).url.toString(),
    W3UP_DID: mockW3up.did,
    W3_NFTSTORAGE_SPACE: nftStorageSpaceDid,
    W3_NFTSTORAGE_PRINCIPAL: ed25519.format(nftStorageApiPrincipal),
    W3_NFTSTORAGE_PROOF: (
      await encodeDelegationAsCid(
        await delegate({
          issuer: nftStorageSpace,
          audience: nftStorageApiPrincipal,
          // @ts-expect-error not sure why this is failing
          capabilities: capabilities.map((can) => ({
            can,
            with: nftStorageSpaceDid,
          })),
        })
      )
    ).toString(base64),
  }
}

/**
 * @param {import('../bindings').MockW3upOptions} options
 */
export async function createMockW3upServer(options = {}) {
  const { did, listener } = await createMockW3up(options)
  const server = createServer(listener)
  server.listen(0)
  await new Promise((resolve) =>
    server.addListener('listening', () => resolve(undefined))
  )
  return {
    did,
    server,
  }
}

/**
 * create a RequestListener that can be a mock up.web3.storage
 * @param {import('../bindings').MockW3upOptions} [options] - options
 */
export async function createMockW3up(
  options = { did: 'did:web:test.web3.storage' }
) {
  const did = options.did ?? 'did:web:test.web3.storage'
  const service = {
    filecoin: {
      offer: Server.provide(Filecoin.offer, async (invocation) => {
        return {
          ok: {},
        }
      }),
      info: Server.provide(Filecoin.info, async (invocation) => {
        const result = await options.onHandleFilecoinInfo?.(invocation)
        if (result) {
          return {
            ok: result,
          }
        } else {
          return {
            error: {
              name: 'UnexpectedError',
              message: `onUploadGet was not defined or return ${result}`,
            },
          }
        }
      }),
    },
    store: {
      add: Server.provide(Store.add, async (invocation) => {
        await options.onHandleStoreAdd?.(invocation)
        /** @type {import('@web3-storage/access').StoreAddSuccessDone} */
        const success = {
          status: 'done',
          allocated: invocation.capability.nb.size,
          link: invocation.capability.nb.link,
          with: invocation.capability.with,
        }
        return {
          ok: success,
        }
      }),
    },
    upload: {
      add: Server.provide(Upload.add, async (invocation) => {
        await options.onHandleUploadAdd?.(invocation)
        /** @type {import('@web3-storage/access').UploadAddSuccess} */
        const success = {
          root: invocation.capability.nb.root,
        }
        return {
          ok: success,
        }
      }),

      get: Server.provide(Upload.get, async (invocation) => {
        const result = await options.onHandleUploadGet?.(invocation)
        if (result) {
          return {
            ok: result,
          }
        } else {
          return {
            error: {
              name: 'UnexpectedError',
              message: `onUploadGet was not defined or return ${result}`,
            },
          }
        }
      }),
    },
  }
  const serverId = (await ed25519.generate()).withDID(
    ucanto.DID.parse(did).did()
  )
  const server = Server.create({
    id: serverId,
    service,
    codec: CAR.inbound,
    validateAuthorization: () => ({ ok: {} }),
  })
  /** @type {import('node:http').RequestListener} */
  const listener = async (req, res) => {
    try {
      const requestBody = new Uint8Array(await consumers.arrayBuffer(req))
      const response = await server.request({
        body: requestBody,
        // @ts-expect-error slight mismatch. ignore like w3infra does
        headers: req.headers,
      })
      res.writeHead(200, response.headers)
      res.write(response.body)
    } catch (error) {
      console.error('error in mock w3up', error)
      res.writeHead(500)
      res.write(JSON.stringify(error))
    } finally {
      res.end()
    }
  }
  return {
    did,
    listener,
  }
}

/**
 * Get location of a server
 * @param {import('http').Server} server - server that should be listening on the returned url
 */
export function locate(server) {
  const address = server.address()
  if (typeof address === 'string' || !address)
    throw new Error(`unexpected address string`)
  const { port } = address
  const url = new URL(`http://localhost:${port}/`)
  return { url }
}
