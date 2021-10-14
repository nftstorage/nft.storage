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
 * @returns { Promise<number>}
 */
export async function intiIngestCursor(config) {
  const lastNFT = await Hasura.query(config.hasura, {
    nft: [
      {
        limit: 1,
        where: {
          inserted_at: {
            _gte: new Date(new Date().toDateString()).toISOString(),
          },
        },
        order_by: [
          {
            inserted_at: Hasura.schema.order_by.desc,
          },
        ],
      },
      { id: true, inserted_at: true, mint_time: true },
    ],
  })
  console.log(`🪙 Init NFT\n${JSON.stringify(lastNFT, null, 2)}`)
  /**
   * You need to get the date in the database, or just start at the epoch,
   * [ new Date(0) = Dec 31st 1969 whereas new Date() = now ]
   * return the epoch { number } in UTC; getTime() always uses UTC
   * ERC721 is in *seconds* JS is in *ms* so /1000
   */
  const mint_time = lastNFT?.nft[0]?.mint_time || 0
  const cursor = Math.round(new Date(mint_time).getTime() / 1000)
  return cursor
}
