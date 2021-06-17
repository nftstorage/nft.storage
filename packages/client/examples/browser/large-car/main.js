import { CarReader } from '@ipld/car'
import { NFTStorage } from 'nft.storage'

import { randomCar } from './large-car'

const endpoint = 'https://api.nft.storage' // the default
const token =
  new URLSearchParams(window.location.search).get('key') || 'API_KEY' // your API key from https://nft.storage/manage

function log(msg) {
  msg = JSON.stringify(msg, null, 2)
  document.getElementById('out').innerHTML += `${msg}\n`
}

async function main() {
  const store = new NFTStorage({ endpoint, token })
  const data = 'Hello nft.storage!'

  console.log('Start', new Date(Date.now()))

  const targetSize = 1024 * 1024 * 110 // ~110MB CARs
  // const targetSize = 1024 * 1024 * 2
  const carReader = await CarReader.fromIterable(await randomCar(targetSize))

  console.log('end')
  const roots = await carReader.getRoots()
  console.log('roots', roots)

  const expectedCid = roots[0].toString()
  console.log({ expectedCid })

  console.log('Middle', new Date(Date.now()))

  // send the CAR to nft.storage, the returned CID will match the one we created above.
  const cid = await store.storeCar(carReader)

  console.log('End', new Date(Date.now()))

  // verify the service is storing the CID we expect
  const cidsMatch = expectedCid === cid
  log({ data, cid, expectedCid, cidsMatch })
  console.log('cid', cid)

  // check that the CID is pinned
  const status = await store.status(cid)
  log(status)
}
main()
