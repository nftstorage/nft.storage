import * as Hasura from '../hasura.js'

/**
 * @typedef { Object } Config
 * @property { Hasura.Config } config.hasura
 * @property { string } config.ingestLastUpdatedDate
 * @property { string } config.ingestRangeStartDate
 * @property { string } config.ingestRangeEndDate
 */

/**
 * we want to check our own database and look at
 * the last Id that was written, otherwise just start at the
 * beginning because the db is empty
 * This is our starting cursor.
 * @param { Config } config
 * @returns { Promise<number>}
 */
export async function initIngestCursor(config) {
  let initDate = new Date().toDateString() //default is to start today

  const binStart = config.ingestRangeStartDate
  const binEnd = config.ingestRangeEndDate

  if (isDate(config.ingestLastUpdatedDate)) {
    initDate = new Date(config.ingestLastUpdatedDate).toISOString()
  }

  /**
   * @type {any}
   */
  let where = {
    inserted_at: {
      _gte: new Date(initDate).toISOString(),
    },
  }

  const hasBinRange = isDate(binEnd) && isDate(binStart)

  //detect binning.
  if (isDate(binStart) && !isDate(binEnd)) {
    console.log(
      `Indicated a range start: ${binStart},
       but no end,ingestion shall be unbounded.`
    )
  } else if (isDate(binEnd) && !isDate(binStart)) {
    console.log(
      `Indicated an end to a range: ${binEnd},
       but did not indicate a start,ingestion shall be unbounded.`
    )
  } else if (hasBinRange) {
    const start = new Date(binStart)
    const end = new Date(binEnd)
    const binSizeInSecs = Math.round((end.getTime() - start.getTime()) / 1000)
    const binSizeinDays = (binSizeInSecs / 86400).toFixed(2)
    const binSizeInWeeks = (binSizeInSecs / 86400 / 7).toFixed(4)

    console.log(`A time slice was specified from:
        \n${start.toISOString()} to ${end.toISOString()}
        \n${binSizeInSecs} seconds\t${binSizeinDays} days\t ${binSizeInWeeks} weeks
    `)

    where.mint_time = {
      _gte: start.toISOString(),
      _lte: end.toISOString(),
    }
  }

  let query = {
    limit: 1,
    where,
    order_by: [
      {
        inserted_at: Hasura.schema.order_by.desc,
      },
    ],
  }

  console.log(JSON.stringify(query))

  const lastNFT = await Hasura.query(config.hasura, {
    nft: [query, { id: true, inserted_at: true, mint_time: true }],
  })

  console.log(`🪙 Init NFT\n${JSON.stringify(lastNFT, null, 2)}`)
  /**
   * You need to get the date in the database, or just start at the epoch,
   * [ new Date(0) = Dec 31st 1969 whereas new Date() = now ]
   * return the epoch { number } in UTC; getTime() always uses UTC
   * ERC721 is in *seconds* JS is in *ms* so /1000
   */
  let mint_time = lastNFT?.nft[0]?.mint_time || 0

  /**
   * If there's a bin range, then the 'beginning of time' is actually the binStart, not the epoch.
   */
  if (hasBinRange) {
    mint_time = binStart
  }

  const cursor = Math.round(new Date(mint_time).getTime() / 1000)
  return cursor
}

/**
 *
 * @param {string} date
 * @returns {boolean}
 */
var isDate = (date) =>
  date.length > 0 && new Date(date).toString() !== 'Invalid Date'
