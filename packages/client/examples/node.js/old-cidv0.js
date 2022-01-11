/**
 * A v0 CID can be obtained by downgrading a v1 CID of a DAG that is created
 * _without raw leaf nodes_.
 *
 * The client does not support this _directly_, but you can create a CAR file
 * with a DAG that does _not_ have raw leaf nodes using the ipfs-car module,
 * pass the result to the `storeCar` method of the client and then downgrade the
 * v1 CID to a v0 CID.
 *
 * ⚠️ Note that in the files listing returned from the API the v1 CID will be
 * referenced.
 */
import { NFTStorage, Blob } from 'nft.storage'
import { packToBlob } from 'ipfs-car/pack/blob'
import * as fs from 'fs'

const endpoint = 'https://api.nft.storage' // the default
const token = process.env.API_KEY // your API key from https://nft.storage/manage

async function main() {
  await storeBlobV0()
}

async function storeBlobV0() {
  const storage = new NFTStorage({ endpoint, token })
  const data = await fs.promises.readFile('pinpie.jpg')

  // create a CAR with a DAG that does not have raw leaf nodes
  const { root, car } = await packToBlob({
    input: new Blob([data]),
    rawLeaves: false,
    wrapWithDirectory: false,
  })
  await storage.storeCar(car)

  // downgrade the CID to v0
  const cidV0 = root.toV0()
  console.log({ cid: cidV0.toString() })
  // { cid: 'QmcLaoGJd1rAF1i7Q5Q4YknSuoC6eyFRFBaNXVRyANn1tA' }

  // the v0 CID can even be used in the /check API
  const status = await storage.check(cidV0)
  console.log(status)
}

main()
