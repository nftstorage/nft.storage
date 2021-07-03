import { db } from './sources.js'
import { mutate, query } from './graphql.js'
import * as Result from './result.js'
import * as Schema from '../gen/db/schema.js'
import * as IPFSURL from './ipfs-url.js'
import * as Cluster from './cluster.js'
import { fetchResource } from './net.js'

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
      const results = assets.map(processTokenAsset)
      await Promise.all(results)
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
 * @param {Schema.TokenMetadataImportInput} input
 */
const importTokenMetadata = async (input) => {
  const result = await mutate(db, {
    importTokenMetadata: [
      { input },
      {
        _id: 1,
      },
    ],
  })

  return Result.value(result).importTokenMetadata._id
}
/**
 * @param {TokenAsset} asset
 */
const processTokenAsset = async (asset) => {
  const { _id, tokenURI } = asset
  console.log(`🔬 (${_id}) Parsing tokenURI`)
  const urlResult = Result.fromTry(() => new URL(tokenURI))
  if (!urlResult.ok) {
    console.error(
      `🚨 (${_id}) Parsing URL failed ${urlResult.error}, report problem`
    )
    return await reportTokenAssetProblem(
      asset,
      `Failed to parse tokenURI: ${urlResult.error}`
    )
  }
  const url = urlResult.value
  const ipfsURL = IPFSURL.asIPFSURL(url)

  console.log(`📡 (${_id}) Fetching content`)
  const fetchResult = await Result.fromPromise(fetchResource(ipfsURL || url))

  if (!fetchResult.ok) {
    console.error(
      `🚨 (${_id}) Fetch failed ${fetchResult.error}, report problem`
    )
    return await reportTokenAssetProblem(
      asset,
      `Failed to fetch: ${fetchResult.error}`
    )
  }

  console.log(`📑 (${_id}) Reading fetched content`)
  const readResult = await Result.fromPromise(fetchResult.value.text())

  if (!readResult.ok) {
    console.error(`🚨 (${_id}) Read failed ${readResult.error}, report problem`)
    return await reportTokenAssetProblem(
      asset,
      `Failed to read: ${readResult.error}`
    )
  }
  const content = readResult.value

  console.log(`🧾 (${_id}) Parsing ERC721 metadata`)
  const parseResult = await Result.fromPromise(parseERC721Metadata(content))

  if (!parseResult.ok) {
    console.error(
      `🚨 (${_id}) Parse failed ${parseResult.error}, report problem`
    )
    return await reportTokenAssetProblem(
      asset,
      `Failed to parse as json: ${parseResult.error}`
    )
  }
  const metadata = parseResult.value

  console.log(
    `📍 (${_id}) Pin metadata in IPFS ${ipfsURL || fetchResult.value}`
  )

  const pinResult = await pin(ipfsURL || fetchResult.value, {
    assetID: _id,
    // if it is a data uri just omit it.
    ...(url.protocol !== 'data:' && { sourceURL: tokenURI }),
  })

  if (!pinResult.ok) {
    console.error(
      `🚨 (${_id}) Failed to pin ${pinResult.error}, report problem\n ${pinResult.error.stack}`
    )
    return await reportTokenAssetProblem(asset, 'failed to pin')
  }
  const { cid } = pinResult.value
  console.log(`📌 (${_id}) Pinned matadata ${cid}`)
  metadata.cid = cid

  console.log(`📝 (${_id}) Recording metadata into db`)
  const result = await Result.fromPromise(
    importTokenMetadata({
      tokenAssetID: _id,
      metadata,
    })
  )

  if (!result.ok) {
    console.error(
      `💣 (${_id}) Failed to store metadata ${result.error}`,
      result.error
    )
    return await reportTokenAssetProblem(asset, 'failed to add metadata')
  }

  return result.value
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
 *
 * @param {TokenAsset} asset
 * @param {string} problem
 */
const reportTokenAssetProblem = async (asset, problem) => {
  const result = await mutate(db, {
    reportTokenAssetProblem: [
      {
        input: {
          tokenAssetID: asset._id,
          problem,
        },
      },
      {
        _id: 1,
      },
    ],
  })

  return Result.value(result).reportTokenAssetProblem._id
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
