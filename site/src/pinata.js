import { pinata } from './constants.js'

const endpoint = new URL('https://api.pinata.cloud')

/**
 * @typedef {import('./models/users.js').User} User
 * @typedef {{ok: true, value: {IpfsHash:string, PinSize:number, Timestamp:string}}|{ok:false, error:Response}} PinataResponse
 * @typedef {import('./utils/multipart/index.js').FileParts} FileParts
 */

/**
 * @see https://pinata.cloud/documentation#PinFileToIPFS
 * @param {Blob} blob
 * @param {User} user
 * @returns {Promise<PinataResponse>}
 */
export const pinFile = async (blob, user) => {
  // create form data
  const body = new FormData()
  body.append('file', blob, `${user.nickname}-${Date.now()}`)
  body.append(
    'pinataOptions',
    JSON.stringify({
      cidVersion: 1,
      wrapWithDirectory: false,
    })
  )
  body.append(
    'pinataMetadata',
    JSON.stringify({
      name: `${user.nickname}-${Date.now()}`,
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

/**
 * @param {FileParts} files
 * @param {User} user
 * @returns {Promise<PinataResponse>}
 */
export async function pinFiles(files, user) {
  const body = new FormData()
  for (const file of files) {
    body.append(
      'file',
      new File([file.data], file.filename, { type: file.contentType }),
      'base/' + file.filename
    )
  }

  body.append(
    'pinataOptions',
    JSON.stringify({
      cidVersion: 1,
      wrapWithDirectory: false,
    })
  )
  body.append(
    'pinataMetadata',
    JSON.stringify({
      name: `${user.nickname}-${Date.now()}`,
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
