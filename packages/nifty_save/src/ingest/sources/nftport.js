import { sleep } from '../../timers'

export async function fetchNFTs(event) {
  await sleep(500)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Call NFTPORT NFTs' }),
  }
}
