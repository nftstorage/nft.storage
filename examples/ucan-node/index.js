import fs from 'fs'
import { NFTStorage, Blob } from 'nft.storage'
import { fetch } from 'undici'
import { KeyPair } from 'ucan-storage/keypair'
import { build } from 'ucan-storage/ucan-storage'

const endpoint = 'https://api.nft.storage' // the default
const token = process.env.API_KEY // your API key from https://nft.storage/manage
const privateKey = process.env.PRIVATE_KEY // Generate it with `npx ucan-storage keypair`

/**
 * Register you DID with the service
 *
 * @param {string} did
 */
async function registerDID(did) {
  const registerRes = await fetch(new URL('/user/did', endpoint), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      did,
    }),
  })
  if (!registerRes.ok) {
    throw Error('Failed to register DID')
  }
}

/**
 * Request a Root UCAN from the service
 *
 * @param {KeyPair} kp - Your own keypair
 * @param {string} serviceDID - Service DID
 * @returns
 */
async function requestRootUCAN() {
  const ucanReq = await fetch(new URL('/ucan/token', endpoint), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!ucanReq.ok) {
    throw Error('Failed to get UCAN')
  }

  const { value: rootUCAN } = await ucanReq.json()

  return rootUCAN
}

/**
 * Sign a new request UCAN to do an upload
 *
 * @param {KeyPair} kp
 * @param {string}} serviceDID
 * @param {string} rootUCAN
 * @returns
 */
async function signRequestUCAN(kp, serviceDID, rootUCAN) {
  return await build({
    issuer: kp,
    audience: serviceDID,
    lifetimeInSeconds: 1000,
    capabilities: [
      {
        with: `storage://${kp.did()}`,
        can: 'upload/IMPORT',
      },
    ],
    proofs: [rootUCAN],
  })
}

async function main() {
  if (!token) {
    throw new Error('Get a real API Key from https://nft.storage/manage')
  }

  if (!privateKey) {
    throw new Error('Get a keypair by running "npx ucan-storage keypair"')
  }

  const kp = await KeyPair.fromExportedKey(privateKey)

  // Get Service DID
  const didRes = await fetch(new URL('/did', endpoint))
  const { ok, value: serviceDID } = await didRes.json()

  // Register your DID generated from the Keypair and request Root UCAN.
  // You only need to do this once, if you already have a keypair and a Root UCAN
  // you can just save it in your system and re-use it for the next step.
  await registerDID(kp.did())
  const rootUCAN = await requestRootUCAN()

  // Sign a new request UCAN
  const ucan = await signRequestUCAN(kp, serviceDID, rootUCAN)

  const storage = new NFTStorage({
    endpoint,
    token: ucan,
    did: kp.did(),
  })
  const data = await fs.promises.readFile('pinpie.jpg')
  const cid = await storage.storeBlob(new Blob([data]))
  console.log({ cid })
  const check = await storage.check(cid)
  console.log(check.pin)
}
main()
