import { pinata, ipfs } from './constants.js'

const endpoint = new URL('https://api.pinata.cloud')

/**
 * @typedef {import('./models/users.js').User} User
 * @typedef {{ok: true, value: {IpfsHash:string, PinSize:number, Timestamp:string}}|{ok:false, error:Response}} PinataResponse
 * @typedef {import('./utils/multipart/index.js').FilePart} FilePart
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
 * @typedef {{ok: true, value: {ipfsHash:string, id:string, name:string, status:'string'}}|{ok:false, error:Response}} PinResponse
 *
 * @see https://pinata.cloud/documentation#PinByHash
 * @param {import('multiformats').CID} cid
 * @param {User} user
 * @returns {Promise<PinataResponse>}
 */
export const pinCID = async (cid, user) => {
  const url = new URL('/pinning/pinByHash', endpoint)

  const response = await fetch(url.toString(), {
    body: JSON.stringify({
      hashToPin: `${cid}`,
      pinataMetadata: {
        name: `${user.nickname}-${Date.now()}`,
        keyvalues: {
          origin: 'https://nft.storage/',
        },
      },
      pinataOptions: {
        // Hardcoding this isn't great, but seems better than asknig node each
        // time.
        hostNodes: [
          `/dns4/${ipfs.host}/tcp/24001/p2p/12D3KooWF8wxbXQ4DNpFLzg44Gpb6NdsTHkG4Bn1Z7a4tWS6rrdq`,
          `/dns4/${ipfs.host}/udp/24001/quic/p2p/12D3KooWF8wxbXQ4DNpFLzg44Gpb6NdsTHkG4Bn1Z7a4tWS6rrdq`,
        ],
      },
    }),
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
 * @param {FilePart[]} files
 * @param {User} user
 * @returns {Promise<PinataResponse>}
 */
export async function pinFiles(files, user) {
  const body = new FormData()
  for (const file of files) {
    body.append(
      'file',
      new File([file.data], file.filename || file.name, {
        type: file.contentType,
      }),
      'base/' + (file.filename || file.name)
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

/**
 * @param {string} cid
 * @returns {Promise<{ ok: true, value?: any } | { ok: false, error: Response }>}
 */
export const pinInfo = async (cid) => {
  const url = new URL(
    `/data/pinList?status=pinned&hashContains=${encodeURIComponent(cid)}`,
    endpoint
  )

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      authorization: `Bearer ${pinata.jwt}`,
    },
  })

  if (response.ok) {
    const { rows } = await response.json()
    return { ok: true, value: rows[0] }
  } else {
    return { ok: false, error: response }
  }
}
