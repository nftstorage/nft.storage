import * as constants from './constants.js'
import { CID } from 'multiformats'
import { HTTPError } from './errors.js'

const ENDPOINT = new URL(constants.ipfs.host)

/**
 * @param {RequestInit & {
 *    path: string
 *    params?: URLSearchParams | Record<string, string>
 * }} init
 */
const request = async (init) => {
  const params = new URLSearchParams(init.params)
  const url = new URL(`/api/v0/${init.path}?${params}`, ENDPOINT)
  const response = await fetch(url.href, {
    method: 'POST',
    ...init,
  })

  if (response.ok) {
    return await response.json()
  } else {
    return HTTPError.throw(response.statusText, response.status)
  }
}

/**
 * @param {Blob} content
 */
export const importBlob = async (content) => {
  const body = new FormData()
  body.set('file', content)

  const { Hash: hash } = await request({
    path: 'add',
    params: {
      pin: 'true',
      'wrap-with-directory': 'false',
      'cid-version': '1',
    },
    body,
  })

  return CID.parse(hash)
}

/**
 * @param {File} file
 */
export const importAsset = async (file) => {
  const body = new FormData()
  body.set('file', file)

  const { Hash: hash } = await request({
    path: 'add',
    params: {
      pin: 'true',
      'wrap-with-directory': 'true',
      'cid-version': '1',
    },
    body,
  })

  return CID.parse(hash)
}

/**
 * @param {Blob} block
 */
export const importBlock = async (block) => {
  const body = new FormData()
  body.set('file', block)

  const { Key: Hash } = await request({
    path: 'block/put',
    params: {
      pin: 'true',
      format: 'dag-cbor',
      mhtype: 'sha2-256',
    },
    body,
  })

  return CID.parse(Hash).toV1()
}

/**
 * @param {CID} cid
 */
export const stat = async (cid) => {
  const {
    Blocks: blocks,
    CumulativeSize: cumulativeSize,
    Hash: hash,
    Local: local,
    Size: size,
    SizeLocal: sizeLocal,
    Type: type,
    WithLocality: withLocality,
  } = await request({
    path: 'files/stat',
    params: {
      arg: `/ipfs/${cid}`,
    },
  })

  return {
    blocks,
    cumulativeSize,
    cid: CID.parse(hash).toV1(),
    local,
    size,
    sizeLocal,
    type,
    withLocality,
  }
}
