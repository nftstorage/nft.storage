import fs from 'fs'
import { packToFs } from 'ipfs-car/pack/fs'
import { CarIndexedReader } from '@ipld/car'
import { NFTStorage } from '../../src/lib.js'

const endpoint = 'https://api.nft.storage' // the default
const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ endpoint, token })

  // locally chunk'n'hash the file to get the CID and pack the blocks in to a CAR
  const { root } = await packToFs({
    input: `${process.cwd()}/pinpie.jpg`,
    output: `${process.cwd()}/output.car`,
  })
  const expectedCid = root.toString()
  console.log({ expectedCid })

  // Create the car reader
  const carReader = await CarIndexedReader.fromFile(
    `${process.cwd()}/output.car`
  )

  console.log('go')

  // send the CAR to nft.storage, the returned CID will match the one we created above.
  const cid = await storage.storeCar(carReader)

  // verify the service stored the CID we expected
  const cidsMatch = expectedCid === cid
  console.log({ cid, expectedCid, cidsMatch })

  // check that the CID is pinned
  const status = await storage.status(cid)
  console.log(status)

  // Delete car file created
  await fs.promises.rm(`${process.cwd()}/output.car`)
}
main()
