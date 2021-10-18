import fs from 'fs'
import { NFTStorage } from 'nft.storage'
import { packToBlob } from 'ipfs-car/pack/blob'

/** @param {string} host */
const getAPIUrl = (host) => {
  switch (host) {
    case 'staging.nft.storage':
      return 'https://api-staging.nft.storage'
    case 'dev.nft.storage':
      return 'https://api-dev.nft.storage'
    case 'nft.storage':
      return 'https://api.nft.storage'
    default:
      return process.env.NEXT_PUBLIC_API || ''
  }
}

export default async function handler(req, res) {
  const { token, tempFilePath } = req.query

  const client = new NFTStorage({
    token,
    endpoint: new URL(getAPIUrl(req.headers.host) + '/v1'),
  })

  const file = await fs.createReadStream(
    Buffer.from(tempFilePath, 'base64').toString('ascii')
  )

  const { car } = await packToBlob({ input: [file] })
  await client.storeBlob(car)

  return res.redirect(302, '/files')
}
