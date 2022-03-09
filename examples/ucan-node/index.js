import fs from 'fs'
import { NFTStorage, Blob } from 'nft.storage'
import { fetch } from 'undici'
import { KeyPair } from 'ucan-storage/keypair'
import { build } from 'ucan-storage/ucan-storage'

/**
 * npx ucan-storage keypair
 *
 * DID:           did:key:z6Mkiim1bwsGbxGs1upx8afVSN92rYq4UzZ7vPFNcNFcnphm
 * Public Key:    P2c2JFGWmiBczwBSK/uEl5Dt8wMnqLoWGThGuBZf15A=
 * Private Key:   Iq6QntRbBtVUNjpolb2fr4IkdG5VpCRC4ve6XI2Prk0=
 */

const endpoint = 'https://api.nft.storage' // the default
const token = process.env.API_KEY // your API key from https://nft.storage/manage

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

async function getUCAN(kp, serviceDID) {
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
  const kp = await KeyPair.fromExportedKey(
    'Iq6QntRbBtVUNjpolb2fr4IkdG5VpCRC4ve6XI2Prk0='
  )
  const didRes = await fetch(new URL('/did', endpoint))
  const { ok, value: serviceDID } = await didRes.json()

  await registerDID(kp.did())

  const ucan = await getUCAN(kp, serviceDID)

  const storage = new NFTStorage({ endpoint, token: ucan })
  const data = await fs.promises.readFile('pinpie.jpg')
  const cid = await storage.storeBlob(new Blob([data]))
  console.log({ cid })
  const check = await storage.check(cid)
  console.log(check.pin)
}
main()
