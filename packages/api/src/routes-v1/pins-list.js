import * as cluster from '../cluster.js'
import { validate } from '../utils/auth-v1.js'
import { JSONResponse } from '../utils/json-response.js'
import { Validator } from '@cfworker/json-schema'

/**
 * @typedef {import('../bindings').PinsListQueryParams} PinsListQueryParams
 */

/** @type {import('../utils/router.js').Handler} */
export async function pinsListV1(event, ctx) {
  const { user, db } = await validate(event, ctx)
  const { searchParams } = new URL(event.request.url)

  /** @type {PinsListQueryParams} */
  // @ts-ignore
  const params = parseSearchParams(searchParams)

  // Validation Schema
  const validator = new Validator({
    type: 'object',
    required: ['status'],
    properties: {
      name: { type: 'string' },
      after: { type: 'string', format: 'date-time' },
      before: { type: 'string', format: 'date-time' },
      cid: { type: 'array', items: { type: 'string' } },
      limit: { type: 'number' },
      meta: { type: 'object' },
      match: {
        type: 'string',
        enum: ['exact', 'iexact', 'ipartial', 'partial'],
      },
      status: {
        type: 'string',
      },
    },
  })

  const result = validator.validate(params)
  if (!result.valid) {
    return new JSONResponse(
      {
        error: {
          reason: 'Validation error',
          validation: result.errors,
        },
      },
      { status: 400 }
    )
  } else {
    // Query database
    const match = params.match || 'exact'
    let query = db.client
      .from('upload')
      .select(`cid,name,inserted_at,content(size, pin(status, service))`)
      .eq('issuer', user.issuer)
      .eq('content.pin.service', 'IPFS_CLUSTER')
      .filter('content.pin.status', 'in', `(${params.status})`)
      .limit(params.limit || 10)

    if (params.name && match === 'exact') {
      query = query.like('name', `${params.name}`)
    }

    if (params.name && match === 'iexact') {
      query = query.ilike('name', `${params.name}`)
    }

    if (params.name && match === 'partial') {
      query = query.like('name', `%${params.name}%`)
    }

    if (params.name && match === 'ipartial') {
      query = query.ilike('name', `%${params.name}%`)
    }

    if (params.before) {
      query = query.lte('inserted_at', params.before)
    }

    if (params.after) {
      query = query.gte('inserted_at', params.after)
    }

    const { data, error } = await query
    if (error) {
      throw new Error(JSON.stringify(error))
    }

    // Not found
    if (!data || data.length === 0) {
      return new JSONResponse(
        {
          error: {
            reason: 'The specified resource was not found',
          },
        },
        { status: 404 }
      )
    }

    // Aggregate result into proper output
    let count = 0
    const results = []
    for (const upload of data) {
      if (upload.content.pin.length > 0) {
        count++
        /** @type {import('../bindings').PinsResponse} */
        const res = {
          requestid: upload.cid,
          status: upload.content.pin[0].status,
          created: upload.inserted_at,
          pin: {
            cid: upload.cid,
            meta: upload.meta,
            name: upload.name,
            origins: upload.origins,
          },
          delegates: cluster.delegates(),
        }
        results.push(res)
      }
    }

    return new JSONResponse({ count, results })
  }
}

/**
 *
 * @param {URLSearchParams} params
 */
function parseSearchParams(params) {
  /** @type {Record<string, string|string[]|number>} */
  const out = {}
  for (const [key, value] of params.entries()) {
    if (!Number.isNaN(Number(value))) {
      out[key] = Number(value)
      continue
    }
    out[key] = value
  }

  return out
}
