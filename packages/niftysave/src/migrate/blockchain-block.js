import * as Migration from '../migrate.js'

import { script } from 'subprogram'

/**
 * @typedef {{
 *    hash: string
 *    number: number
 * }} Block
 *
 * @param {Migration.Document<Block>} input
 */
const insert = ({ ts, data: { hash, number } }) => ({
  hash,
  number,
  inserted_at: Migration.fromTimestamp(ts),
})

/**
 * @param {Migration.Document<Block>[]} blocks
 * @returns {Migration.Mutation}
 */
export const mutation = (blocks) => ({
  insert_blockchain_block: [
    {
      objects: blocks.map(insert),
      on_constraint: {
        constraint:
          Migration.schema.blockchain_block_constraint.blockchain_block_pkey,
        update_columns: [],
      },
    },
    {
      affected_rows: 1,
    },
  ],
})

export const main = () => Migration.start({ collection: 'Block', mutation })

script({ ...import.meta, main })
