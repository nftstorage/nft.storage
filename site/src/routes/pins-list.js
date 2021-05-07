import * as cluster from '../cluster.js'
import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nftsIndex from '../models/nfts-index.js'

/**
 * @param {FetchEvent} event
 * @returns {Promise<JSONResponse>}
 */
export async function pinsList(event) {
  const result = await validate(event)
  const { user } = result
  const { searchParams } = new URL(event.request.url)

  let count = 0
  /** @type import('../pinata-psa').PinStatus[] */
  const results = []
  const options = queryToListOptions(searchParams)
  const limit = options.limit || 10
  const filter = makeFilter(options)

  for await (const [key, data] of nftsIndex.entries(user.sub)) {
    if (!filter(key, data)) continue
    count++
    results.push({
      requestid: key.cid,
      status: data.pinStatus || 'queued',
      created: key.created || new Date(0).toISOString(),
      delegates: cluster.delegates(),
      pin: { cid: key.cid, name: data.name, meta: data.meta },
    })
    if (results.length >= limit) {
      break
    }
  }

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
 * @returns {(key: import('../models/nfts-index.js').Key, data: import('../models/nfts-index.js').IndexData) => boolean}
 */
function makeFilter(options) {
  return (key, data) => {
    if (options.cid) {
      if (!options.cid.includes(key.cid)) {
        return false
      }
    }
    if (options.meta) {
      const meta = data.meta || {}
      for (const [k, v] of Object.entries(options.meta)) {
        if (meta[k] !== v) {
          return false
        }
      }
    }
    if (options.name) {
      const match = options.match || 'exact'
      const name = data.name || ''
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
    if (options.status && !options.status.includes(data.pinStatus)) {
      return false
    }
    if (options.before || options.after) {
      const created = new Date(key.created).getTime()
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
