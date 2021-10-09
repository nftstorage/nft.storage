import * as Hasura from '../hasura.js'

/**
 * @typedef { Object } Config
 * @property { Hasura.Config } config.hasura
 */

/**
 * we want to check our own database and look at
 * the last Id that was written, otherwise just start at the
 * beginning because the db is empty
 * This is our starting cursor.
 * @param { Config } config
 * @returns { Promise<String>}
 */
export async function intializeCursor(config) {
  const query = {
    limit: 1,
    order_by: [
      {
        inserted_at: Hasura.schema.order_by.desc,
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

  return lastNFT?.nft[0]?.id || '0'
}
