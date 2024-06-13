import * as Link from 'multiformats/link'
import * as Digest from 'multiformats/hashes/digest'
import { fromString } from 'uint8arrays'

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
  // get hash links to CARs that contain parts of this upload
  /** @type {string[]} */
  const parts = [
    // from upload table 'backup_urls' column
    ...carCidV1Base32sFromBackupUrls(upload.backup_urls ?? []),
  ]

  /** @type {import('../bindings').NFTResponse} */
  const nft = {
    cid: sourceCid || upload.source_cid,
    created: upload.inserted_at,
    type: typeMap[upload.type] || upload.mime_type || '',
    scope: upload.key ? upload.key.name : 'session',
    files: upload.files,
    size: upload.content.dag_size || 0,
    name: upload.name,
    parts,
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
 * @param {string[]} [delegates]
 */
export function toPinsResponse(upload, delegates = []) {
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
    delegates,
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

/**
 * given array of backup_urls from uploads table, return a corresponding set of CAR CIDv1 using base32 multihash
 * for any CAR files in the backup_urls.
 *
 * @param {unknown[]} backupUrls
 * @returns {Iterable<string>}
 */
function carCidV1Base32sFromBackupUrls(backupUrls) {
  const carCidStrings = new Set()
  for (const backupUrl of backupUrls) {
    let carCid
    try {
      // @ts-expect-error database exported types assumes unknown
      carCid = bucketKeyToPartCID(backupUrl)
    } catch (error) {
      console.warn('error extracting car CID from bucket URL', error)
    }
    if (!carCid) continue
    carCidStrings.add(carCid.toString())
  }
  return carCidStrings
}

const CAR_CODE = 0x0202

/**
 * Attempts to extract a CAR CID from a bucket key.
 *
 * @param {string} key
 */
const bucketKeyToPartCID = (key) => {
  const filename = String(key.split('/').at(-1))
  const [hash] = filename.split('.')
  try {
    // recent buckets encode CAR CID in filename
    const cid = Link.parse(hash).toV1()
    if (cid.code === CAR_CODE) return cid
    throw new Error('not a CAR CID')
  } catch (err) {
    // older buckets base32 encode a CAR multihash <base32(car-multihash)>.car
    try {
      const digestBytes = fromString(hash, 'base32')
      const digest = Digest.decode(digestBytes)
      return Link.create(CAR_CODE, digest)
    } catch (error) {
      // console.warn('error trying to create CID from s3 key', error)
    }
  }
}
