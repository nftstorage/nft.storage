import * as constants from './constants.js'
import { CID } from 'multiformats'
import { ndjson } from './utils/ndjson.js'
import { HTTPError } from './errors.js'

const ENDPOINT = new URL(`http://${constants.ipfs.host}/`)

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
    if (!response.body) {
      return []
    }

    const result = []
    for await (const json of ndjson(response.body)) {
      result.push(json)
    }

    return result
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

  const [{ Hash: hash }] = await request({
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

  const [_file, { Hash: hash }] = await request({
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

  const [{ Key: hash }] = await request({
    path: 'block/put',
    params: {
      pin: 'true',
      format: 'cbor',
      mhtype: 'sha2-256',
    },
    body,
  })

  return CID.parse(hash).toV1()
}

/**
 * @param {CID} cid
 */
export const stat = async (cid) => {
  const [{ NumBlocks: numBlocks, Size: size }] = await request({
    path: 'dag/stat',
    params: {
      arg: `/ipfs/${cid}`,
      progress: 'false',
    },
  })

  return {
    size,
    numBlocks,
  }
}

export const version = async () =>
  request({
    path: 'version',
  })
