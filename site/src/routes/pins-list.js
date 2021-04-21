import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import * as cluster from '../cluster.js'
import { JSONResponse } from '../utils/json-response.js'

/**
 * @typedef {{
 *   name?: string,
 *   meta?: Record<string, string>,
 *   pinStatus: import('../pinata-psa').Status,
 *   size: number,
 *   created: string
 *   createdSort?: number
 * }} NFTMetadata
 * @typedef {{ name: string, metadata: NFTMetadata }} Key
 */

/**
 * @param {FetchEvent} event
 * @returns {Promise<JSONResponse>}
 */
export async function pinsList(event) {
  const result = await verifyToken(event)
  if (!result.ok) {
    return HTTPError.respond(result.error)
  }
  const { user } = result
  const { searchParams } = new URL(event.request.url)

  let count = 0
  /** @type {Key[]} */
  let keys = []
  const options = queryToListOptions(searchParams)
  const limit = options.limit || 10
  const filter = makeFilter(options)

  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const nftList = await stores.nfts.list({
      prefix: user.sub,
      cursor,
      limit: 1000,
    })
    for (const key of nftList.keys) {
      if (!filter(key)) continue
      count++
      key.metadata.createdSort = key.metadata.created
        ? new Date(key.metadata.created).getTime()
        : 0
      keys.push(key)
    }
    if (keys.length >= limit) {
      // @ts-ignore
      keys = keys
        .sort((a, b) => b.metadata.createdSort - a.metadata.createdSort)
        .slice(0, limit)
    }
    cursor = nftList.cursor
    done = nftList.list_complete
  }

  /** @type import('../pinata-psa').PinStatus[] */
  const results = keys.map((k) => {
    const cid = k.name.split(':')[1]
    return {
      requestid: cid,
      status: k.metadata.pinStatus,
      created: k.metadata.created || new Date(0).toISOString(),
      delegates: cluster.delegates(),
      pin: { cid, name: k.metadata.name, meta: k.metadata.meta },
    }
  })

  return new JSONResponse({ count, results })
}

/**
 * @param {URLSearchParams} searchParams
 * @returns {import('../pinata-psa').ListOptions}
 */
function queryToListOptions(searchParams) {
  const queryObj = Object.fromEntries(searchParams.entries())
  const cid = queryObj.cid ? queryObj.cid.split(',') : undefined
  let meta
  if (queryObj.meta) {
    meta = JSON.parse(queryObj.meta)
    if (meta == null || typeof meta !== 'object' || Array.isArray(meta)) {
      throw new Error('invalid meta')
    }
  }
  const name = queryObj.name
  /** @type import('../pinata-psa.js').ListOptions['match'] */
  let match
  if (queryObj.match) {
    if (
      queryObj.match === 'exact' ||
      queryObj.match === 'iexact' ||
      queryObj.match === 'partial' ||
      queryObj.match === 'ipartial'
    ) {
      match = queryObj.match
    } else {
      throw new Error('invalid match value')
    }
  }
  /** @type import('../pinata-psa.js').Status[] | undefined */
  let status
  if (queryObj.status) {
    status = []
    for (const s of queryObj.status.split(',')) {
      if (
        s !== 'queued' &&
        s !== 'pinning' &&
        s !== 'pinned' &&
        s !== 'failed'
      ) {
        throw new Error('invalid status value')
      }
      status.push(s)
    }
  }
  const before = queryObj.before ? new Date(queryObj.before) : undefined
  const after = queryObj.before ? new Date(queryObj.after) : undefined

  let limit
  if (queryObj.limit) {
    const parsedLimit = parseInt(queryObj.limit)
    if (isNaN(parsedLimit)) {
      throw new Error('invalid limit')
    }
    if (parsedLimit < 1 || parsedLimit > 1000) {
      throw new RangeError('limit out of bounds')
    }
    limit = parsedLimit
  }

  return { cid, meta, name, match, status, before, after, limit }
}

/**
 * @param {import('../pinata-psa.js').ListOptions} options
 * @returns {(key: Key) => boolean}
 */
function makeFilter(options) {
  return (key) => {
    if (options.cid) {
      const cid = key.name.split(':')[1]
      if (!options.cid.includes(cid)) {
        return false
      }
    }
    if (options.meta) {
      const meta = key.metadata.meta || {}
      for (const [k, v] of Object.entries(options.meta)) {
        if (meta[k] !== v) {
          return false
        }
      }
    }
    if (options.name) {
      const match = options.match || 'exact'
      const name = key.metadata.name || ''
      if (match === 'exact') {
        if (options.name !== name) {
          return false
        }
      } else if (match === 'iexact') {
        if (options.name.toLowerCase() !== name.toLowerCase()) {
          return false
        }
      } else if (match === 'partial') {
        if (!name.includes(options.name)) {
          return false
        }
      } else if (match === 'ipartial') {
        if (!name.toLowerCase().includes(options.name.toLowerCase())) {
          return false
        }
      }
    }
    if (options.status && !options.status.includes(key.metadata.pinStatus)) {
      return false
    }
    if (options.before || options.after) {
      const created = key.metadata.created
        ? new Date(key.metadata.created).getTime()
        : 0
      if (options.before && options.before.getTime() < created) {
        return false
      }
      if (options.after && options.after.getTime() > created) {
        return false
      }
    }
    return true
  }
}
