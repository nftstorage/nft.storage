import { db, erc721 } from './sources.js'
import { mutate, query } from './graphql.js'
import * as Result from './result.js'

/**
 * @param {Object} options
 * @param {number} options.budget - Time budget
 * @param {number} options.batchSize - Number of tokens in each import
 */
export const spawn = async ({ budget, batchSize }) => {
  const deadline = Date.now() + budget
  console.log('Obtain current cursor')
  const cursor = await readCursor()
  let { id } = cursor
  while (deadline - Date.now() > 0) {
    const result = await importBatch({
      id,
      batchSize,
    })

    if (result.found < batchSize) {
      console.log('🏁 Finish scanning, not enough tokens were found')
      return
    } else {
      id = result.id
    }
  }
  console.log('⌛️ Finish scanning, time is up')
}

/**
 * @param {Object} options
 * @param {string} options.id
 * @param {number} options.batchSize
 */
export const importBatch = async ({ id, batchSize }) => {
  console.log(`⛓ Fetch ERC721 tokens from ${id}`)
  const tokens = await fetchTokens({
    cursor: id,
    scanSize: batchSize,
  })
  console.log(`💾 Import ${tokens.length} tokens`)

  const result = await importTokens(db, {
    id,
    tokens,
  })

  console.log(
    `✨ Imported ${result.tokens.data.length} tokens, new cursor is "${result.nextID}"`
  )

  return {
    found: tokens.length,
    imported: result.tokens.data.length,
    id: result.nextID,
  }
}

const readCursor = async () => {
  const result = await query(db, {
    cursor: {
      _id: 1,
      id: 1,
    },
  })

  return Result.value(result).cursor
}

/**
 *
 * @param {typeof db} db
 * @param {Object} input
 * @param {string} input.id
 * @param {import('../gen/erc721/schema').Token[]} input.tokens
 */
const importTokens = async (db, input) => {
  const result = await mutate(db, {
    importERC721: [
      {
        input,
      },
      {
        _id: 1,
        id: 1,
        nextID: 1,
        tokens: [
          {
            _size: input.tokens.length,
          },
          {
            data: {
              _id: 1,
            },
          },
        ],
      },
    ],
  })
  return Result.value(result).importERC721
}

/**
 * @param {{scanSize:number, cursor:string}} settings
 * @returns {Promise<import('../gen/erc721/schema').Token[]>}
 */
const fetchTokens = async ({ cursor, scanSize }) => {
  const result = await query(erc721, {
    tokens: [
      {
        first: scanSize,
        where: {
          tokenURI_not: '',
          id_gt: cursor,
        },
      },
      {
        id: 1,
        tokenID: 1,
        tokenURI: 1,
        mintTime: 1,
        blockNumber: 1,
        blockHash: 1,
        contract: {
          id: 1,
          name: 1,
          symbol: 1,
          supportsEIP721Metadata: 1,
        },
        owner: {
          id: 1,
        },
      },
    ],
  })

  return Result.value(result).tokens
}
