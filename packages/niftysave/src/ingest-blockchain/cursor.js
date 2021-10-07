import * as ERC721 from '../../gen/erc721/index.js'
import * as Hasura from '../hasura.js'

/**
 * @typedef { Object } Config
 * @property { ERC721.Config } config.erc721
 * @property { Hasura.Config } config.hasura
 */

/**
 * If the module was started, and the 'cursor' is '0', we want to check
 * our own database and look at the last Id that was written.
 * This is our starting cursor.
 * @param { Config } config
 * @returns { Promise<String>}
 */
async function getLastScrapeIdFromHasura(config) {
  /**
   * @type {{
   *    limit: number
   *    order_by: Object[]
   * }}
   */
  const query = {
    limit: 1,
    order_by: [
      {
        // TODO: Stringer type needed
        // some issues with zeus
        // Hasura.schema.order_by is undefined
        inserted_at: 'desc',
      },
    ],
  }

  /**
   * required type annotation due to design limitation in TS
   * https://github.com/microsoft/TypeScript/issues/19360
   * @type {{
   *    id: true | undefined
   *    updated_at: true | undefined
   * }}
   */
  const resultsDefinition = { id: true, updated_at: true }
  const lastNFT = await Hasura.query(config.hasura, {
    nft: [query, resultsDefinition],
  })
  let _lastNftId = lastNFT?.nft[0]?.id || '0'
  return _lastNftId
}

/**
 * "the cursor"
 * @type {String}
 */
let _lastScrapeId = '0'

/**
 * This function drives this module and holds
 * a single value in its state; the 'last known id' which is the cursor.
 * Upon a cold start, we check the database for the last cursor
 * As we batch records, we update this cursor.
 * @param {String=} id
 * @param {Config} config
 * @returns { Promise<String>}
 */
export async function lastScrapeId(config, id) {
  if (typeof id === 'string') {
    _lastScrapeId = id
  }
  if (_lastScrapeId === '0') {
    _lastScrapeId = await getLastScrapeIdFromHasura(config)
  }
  return _lastScrapeId
}
