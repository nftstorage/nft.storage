import { checkAuth } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { Validator } from '@cfworker/json-schema'
import { parseCidPinning } from '../utils/utils.js'
import { toPinsResponse } from '../utils/db-transforms.js'

const DEFAULT_LIMIT = 10
const MAX_LIMIT = 1000

/**
 * @typedef {import('../utils/db-client-types').ListUploadsOptions} ListUploadsOptions
 */

/** @type {import('../bindings').Handler} */
export async function pinsList(event, ctx) {
  const { user, db } = checkAuth(ctx)
  const { searchParams } = new URL(event.request.url)
  const result = parseSearchParams(searchParams)

  if (result.error) {
    return new JSONResponse(result.error, { status: 400 })
  } else {
    /** @type {ListUploadsOptions} */
    const params = {
      ...result.data,
      type: ['Remote'],
    }

    // Query database
    const data = await db.listUploads(user.id, params)

    // Not found
    if (!data) {
      return new JSONResponse(
        {
          error: {
            reason: 'NOT_FOUND',
            details: 'The specified resource was not found',
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
        results.push(toPinsResponse(upload))
      }
    }

    return new JSONResponse({ count, results })
  }
}

// Validation Schema
const validator = new Validator({
  type: 'object',
  required: ['status'],
  properties: {
    name: { type: 'string' },
    after: { type: 'string', format: 'date-time' },
    before: { type: 'string', format: 'date-time' },
    cid: { type: 'array', items: { type: 'string' } },
    limit: { type: 'integer', minimum: 1, maximum: MAX_LIMIT },
    meta: { type: 'object' },
    match: {
      type: 'string',
      enum: ['exact', 'iexact', 'ipartial', 'partial'],
    },
    status: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['PinError', 'PinQueued', 'Pinned', 'Pinning'],
      },
    },
  },
})

/**
 *
 * @param {URLSearchParams} params
 */
function parseSearchParams(params) {
  /** @type {ListUploadsOptions} */
  const out = {}

  const cidParam = params.get('cid')
  if (cidParam) {
    const cids = cidParam.split(',')
    const cidsV1 = []
    for (const cid of cids) {
      const parsed = parseCidPinning(cid)
      if (parsed) {
        cidsV1.push(parsed.sourceCid)
      } else {
        return {
          error: { reason: 'INVALID_CID', details: `Invalid cid ${cid}` },
          data: undefined,
        }
      }
    }
    out.cid = cidsV1
  }

  const nameParam = params.get('name')
  if (nameParam) {
    out.name = nameParam
  }

  const matchParam = params.get('match')
  if (matchParam) {
    out.match = /** @type {ListUploadsOptions["match"]} */ (matchParam)
  }

  const statusParam = params.get('status')
  if (statusParam) {
    // Note: undefined statuses from toDbPinStatus will fail validation below
    out.status = /** @type {ListUploadsOptions["status"]}*/ (
      statusParam.split(',').map(toDbPinStatus)
    )
  } else {
    // "when no filter is provided, only successful pins are returned"
    // https://ipfs.github.io/pinning-services-api-spec/#tag/pins/paths/~1pins/get
    out.status = ['Pinned']
  }

  const afterParam = params.get('after')
  if (afterParam) {
    out.after = afterParam
  }

  const beforeParam = params.get('before')
  if (beforeParam) {
    out.before = beforeParam
  }

  const limitParam = params.get('limit')
  if (limitParam) {
    out.limit = Number(limitParam)
  } else {
    out.limit = DEFAULT_LIMIT
  }

  const metaParam = params.get('meta')
  if (metaParam) {
    try {
      const parsed = JSON.parse(metaParam)
      out.meta = parsed
    } catch (err) {
      return {
        error: {
          reason: 'INVALID_META',
          details: 'Invalid json in the "meta" query parameter.',
        },
        data: undefined,
      }
    }
  }
  const result = validator.validate(out)

  if (result.valid) {
    return { data: out, error: undefined }
  } else {
    return {
      error: {
        reason: 'VALIDATION_ERROR',
        details: result.errors,
      },
      data: undefined,
    }
  }
}

/**
 * Return the DB pin status name or undefined if unknown.
 *
 * @param {string} status
 */
function toDbPinStatus(status) {
  switch (status) {
    case 'queued':
      return 'PinQueued'
    case 'pinning':
      return 'Pinning'
    case 'pinned':
      return 'Pinned'
    case 'failed':
      return 'PinError'
  }
}
