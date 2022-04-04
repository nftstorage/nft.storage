import * as cluster from '../cluster.js'

/**
 * We mixed upload type and content type. This was split into `type` and
 * `mime_type` in the move to Postgres but the API was not changed. This object
 * maps the DB `type`s that we want to use in the API response `type`. Other
 * API response `type`s are DB `mime_type`.
 * @type {Record<string, string>}
 */
const typeMap = {
  Nft: 'nft',
  Multipart: 'directory',
  Remote: 'remote',
}

/**
 * Transform db response into NFT response
 *
 * @param {import('./db-client-types').UploadOutput} upload
 * @param {string} [sourceCid] - User input CID so we can return the same cid version back
 */
export function toNFTResponse(upload, sourceCid) {
  /** @type {import('../bindings').NFTResponse} */
  const nft = {
    cid: sourceCid || upload.source_cid,
    created: upload.inserted_at,
    type: typeMap[upload.type] || upload.mime_type || '',
    scope: upload.key ? upload.key.name : 'session',
    files: upload.files,
    size: upload.content.dag_size || 0,
    name: upload.name,
    pin: {
      cid: sourceCid || upload.source_cid,
      created: upload.content.pin[0].inserted_at,
      size: upload.content.dag_size || 0,
      status: transformPinStatus(upload.content.pin[0].status),
    },
    deals: upload.deals,
  }
  return nft
}

/**
 * Transform db response into Pin response
 *
 * @param {import('./db-client-types').UploadOutput} upload
 */
export function toPinsResponse(upload) {
  /** @type {import('../bindings').PinsResponse} */
  const rsp = {
    requestid: upload.source_cid,
    status: transformPinStatus(upload.content.pin[0].status),
    created: upload.inserted_at,
    pin: {
      cid: upload.source_cid,
      meta: upload.meta,
      name: upload.name,
      origins: upload.origins,
    },
    delegates: cluster.delegates(),
  }
  return rsp
}

/**
 * Transform db response into Check nft response
 *
 * @param {string} sourceCid
 * @param {import('./db-client-types').ContentOutput} content
 */
export function toCheckNftResponse(sourceCid, content) {
  /** @type {import('../bindings').CheckNFTResponse} */
  const rsp = {
    cid: sourceCid,
    pin: {
      cid: sourceCid,
      created: content?.pins[0].inserted_at,
      size: content?.dag_size,
      status: transformPinStatus(content?.pins[0].status),
    },
    deals: content.deals,
  }
  return rsp
}

/**
 *
 * @param {import('./db-types').definitions['pin']['status']} status
 * @return {import('../bindings').PinStatus}
 */
function transformPinStatus(status) {
  switch (status) {
    case 'PinQueued':
      return 'queued'
    case 'Pinned':
      return 'pinned'
    case 'Pinning':
      return 'pinning'
    default:
      return 'failed'
  }
}
