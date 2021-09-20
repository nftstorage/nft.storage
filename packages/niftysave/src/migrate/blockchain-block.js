import * as Migration from '../migrate.js'

import { script } from 'subprogram'

/**
 * @typedef {{
 *    cid: string
 *    created?: import('faunadb').values.FaunaTime
 *    dagSize?: number
 * }} Content
 *
 * @param {{data: Content}} input
 */
const insert = ({ data }) => {
  return {
    hash: data.hash,
    inserted_at: Migration.fromTimestamp(ts),
  }
}

/**
 * @param {import('../migrate.js').MigrationConfig} config
 * @param {string|null} cursor
 * @param {{Migration.Document<Block>}[]} blocks
 */
export const migrate = (config, cursor, blocks) =>
  writeMigrationState(
    config,
    {
      cursor,
      metadata: {},
    },
    {
      insert_blockchain_block: [
        {
          objects: blocks.map(insert),
        },
        {
          affected_rows: 1,
        },
      ],
    }
  )

const main = () => start({ collection: 'Block', migrate })

script({ ...import.meta, main })
