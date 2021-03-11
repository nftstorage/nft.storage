import { pinata } from './constants.js'

const endpoint = new URL('https://api.pinata.cloud')

/**
 * @see https://pinata.cloud/documentation#PinFileToIPFS
 * @param {Blob} blob
 * @returns {Promise<{ok: true, value: {IpfsHash:string, PinSize:number, Timestamp:string}}|{ok:false, error:Response}>}
 */
export const pinFile = async (blob) => {
  const body = new FormData()
  body.append('file', blob)
  body.append(
    'pinataMetadata',
    JSON.stringify({
      keyvalues: {
        origin: 'https://nft.storage/',
      },
    })
  )
  const url = new URL('/pinning/pinFileToIPFS', endpoint)

  const response = await fetch(url.toString(), {
    body,
    method: 'POST',
    headers: {
      authorization: `Bearer ${pinata.jwt}`,
    },
  })

  if (response.ok) {
    return { ok: true, value: await response.json() }
  } else {
    return { ok: false, error: response }
  }
}
