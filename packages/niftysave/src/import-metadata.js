import { db } from './sources.js'
import { mutate, query } from './graphql.js'
import * as Result from './result.js'
import * as Schema from '../gen/db/schema.js'
import * as IPFSURL from './ipfs-url.js'
import * as Cluster from './cluster.js'
import { fetchResource } from './net.js'

const { TokenAssetStatus } = db.schema

/**
 * @param {Object} options
 * @param {number} options.budget - Time budget
 * @param {number} options.batchSize - Number of tokens in each import
 */
export const spawn = async ({ budget, batchSize }) => {
  const deadline = Date.now() + budget
  while (deadline - Date.now() > 0) {
    console.log('🔍 Fetching token assets that were queued')
    const assets = await fetchTokenURIs({ batchSize })
    if (assets.length === 0) {
      return console.log('🏁 Finish, no more queued task were found')
    } else {
      console.log(`🤹 Spawn ${assets.length} tasks to process fetched assets`)
      const updates = await Promise.all(assets.map(analyze))
      await updateTokenAssets(updates)
      console.log(`✨ Processed batch of ${assets.length} assets`)
    }
  }
  console.log('⌛️ Finish, time is up')
}

/**
 * @typedef {{ tokenURI:string, _id:string }} TokenAsset
 *
 * @param {Object} options
 * @param {number} options.batchSize
 * @returns {Promise<TokenAsset[]>}
 */

const fetchTokenURIs = async ({ batchSize }) => {
  const result = await query(db, {
    findTokenAssets: [
      {
        where: {
          status: Schema.TokenAssetStatus.Queued,
        },
        _size: batchSize,
      },
      {
        data: {
          _id: 1,
          tokenURI: 1,
        },
      },
    ],
  })

  const assets =
    /** @type {TokenAsset[]} */
    (Result.value(result).findTokenAssets.data.filter(Boolean))

  return assets
}

/**
 * @param {TokenAsset} asset
 * @returns {Promise<Schema.TokenAssetUpdate>}
 */
const analyze = async (asset) => {
  const { _id: id, tokenURI } = asset
  console.log(`🔬 (${id}) Parsing tokenURI`)
  const urlResult = Result.fromTry(() => new URL(tokenURI))
  if (!urlResult.ok) {
    console.error(
      `🚨 (${id}) Parsing URL failed ${urlResult.error}, report problem`
    )

    return {
      id,
      status: TokenAssetStatus.URIParseFailed,
      statusText: `${urlResult.error}`,
    }
  }
  const url = urlResult.value
  const ipfsURL = IPFSURL.asIPFSURL(url)
  const ipfsURLString = ipfsURL && ipfsURL.href

  console.log(`📡 (${id}) Fetching content`)
  const fetchResult = await Result.fromPromise(fetchResource(ipfsURL || url))

  if (!fetchResult.ok) {
    console.error(
      `🚨 (${id}) Fetch failed ${fetchResult.error}, report problem`
    )

    return {
      id,
      ipfsURL: ipfsURLString,
      status: TokenAssetStatus.ContentFetchFailed,
      statusText: `${fetchResult.error}`,
    }
  }

  console.log(`📑 (${id}) Reading fetched content`)
  const readResult = await Result.fromPromise(fetchResult.value.text())

  if (!readResult.ok) {
    console.error(`🚨 (${id}) Read failed ${readResult.error}, report problem`)
    return {
      id,
      ipfsURL: ipfsURLString,
      status: TokenAssetStatus.ContentFetchFailed,
      statusText: `${readResult.error}`,
    }
  }
  const content = readResult.value

  console.log(`🧾 (${id}) Parsing ERC721 metadata`)
  const parseResult = await Result.fromPromise(parseERC721Metadata(content))

  if (!parseResult.ok) {
    console.error(
      `🚨 (${id}) Parse failed ${parseResult.error}, report problem`
    )

    return {
      id,
      ipfsURL: ipfsURLString,
      status: TokenAssetStatus.ContentParseFailed,
      statusText: `${parseResult.error}`,
    }
  }
  const metadata = parseResult.value

  console.log(`📍 (${id}) Pin metadata in IPFS ${ipfsURL || fetchResult.value}`)

  const pinResult = await pin(ipfsURL || fetchResult.value, {
    assetID: id,
    // if it is a data uri just omit it.
    ...(url.protocol !== 'data:' && { sourceURL: tokenURI }),
  })

  if (!pinResult.ok) {
    console.error(
      `🚨 (${id}) Failed to pin ${pinResult.error}, report problem\n ${pinResult.error.stack}`
    )
    return {
      id,
      status: TokenAssetStatus.PinRequestFailed,
      statusText: `${pinResult.error}`,
    }
  }
  const { cid } = pinResult.value
  console.log(`📌 (${id}) Pinned matadata ${cid}`)

  console.log(`📝 (${id}) Link token asset metadata & resources`)
  return {
    id,
    status: TokenAssetStatus.Linked,
    statusText: 'Linked',
    metadata: { ...metadata, cid },
  }
}

/**
 * @param {string} content
 */
const parseERC721Metadata = async (content) => {
  const json = JSON.parse(content)
  const { name, description, image } = json
  if (typeof name !== 'string') {
    throw new Error('name field is missing')
  }
  if (typeof description !== 'string') {
    throw new Error('descript field is missing')
  }
  if (typeof image !== 'string') {
    throw new Error('image field is missing')
  }

  const imageResource = parseResource(image)

  /** @type {Schema.ResourceInput[]} */
  const assets = []

  /** @type {Schema.MetadataInput} */
  const metadata = { cid: '', name, description, image: imageResource, assets }
  for (const [value] of iterate({ ...metadata, image: null })) {
    const asset = typeof value === 'string' ? tryParseResource(value) : null
    if (asset) {
      assets.push(asset)
    }
  }

  return metadata
}

/**
 * @param {string} input
 * @returns {Schema.ResourceInput}
 */
const parseResource = (input) => {
  const url = new URL(input)
  const ipfsURL = IPFSURL.asIPFSURL(url)
  if (ipfsURL) {
    return {
      uri: input,
      ipfsURL: ipfsURL.href,
    }
  } else {
    return {
      uri: input,
    }
  }
}

/**
 *
 * @param {string} input
 */
const tryParseResource = (input) => {
  try {
    return parseResource(input)
  } catch (error) {
    return null
  }
}

/**
 * @param {Object} data
 * @param {PropertyKey[]} [path]
 * @returns {Iterable<[string|number|boolean|null, PropertyKey[]]>}
 */
const iterate = function* (data, path = []) {
  if (Array.isArray(data)) {
    for (const [index, element] of data) {
      yield* iterate(element, [...path, index])
    }
  } else if (data && typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      yield* iterate(value, [...path, key])
    }
  } else {
    yield [data, path]
  }
}

/**
 * @param {Schema.TokenAssetUpdate[]} updates
 * @returns {Promise<string[]>}
 */
const updateTokenAssets = async (updates) => {
  const result = await mutate(db, {
    updateTokenAssets: [
      {
        input: { updates },
      },
      {
        _id: 1,
      },
    ],
  })

  return Result.value(result).updateTokenAssets?.map((token) => token._id) || []
}

/**
 * @param {IPFSURL.IPFSURL | Blob} source
 * @param {Record<string, string>} metadata
 */
const pin = (source, metadata) => {
  if (source instanceof URL) {
    console.log('')
    return Result.fromPromise(Cluster.pin(source, metadata))
  } else {
    return Result.fromPromise(Cluster.add(source))
  }
}
