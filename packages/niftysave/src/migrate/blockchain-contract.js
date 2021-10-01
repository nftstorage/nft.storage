import * as Migration from '../migrate.js'
import { script } from 'subprogram'
import { Get, Var, Lambda, Let, Select } from '../fauna.js'

const query = Lambda(
  ['ref'],
  Let(
    {
      doc: Get(Var('ref')),
    },
    {
      ts: Select('ts', Var('doc')),
      ref: Var('ref'),
      data: {
        id: Select(['data', 'id'], Var('doc')),
        name: Select(['data', 'name'], Var('doc')),
        symbol: Select(['data', 'symbol'], Var('doc')),
        supports_eip721_metadata: Select(
          ['data', 'supportsEIP721Metadata'],
          Var('doc')
        ),
      },
    }
  )
)

/**
 * @typedef {{
 *    id: string
 *    name: string
 *    symbol: string
 *    supports_eip721_metadata: boolean
 * }} Contract
 *
 * @param {Migration.Document<Contract>} input
 */
const insert = ({
  ts,
  data: { id, name, symbol, supports_eip721_metadata },
}) => ({
  id,
  name,
  symbol,
  supports_eip721_metadata,
  inserted_at: Migration.fromTimestamp(ts),
})

/**
 * @param {Migration.Document<Contract>[]} blocks
 * @returns {Migration.Mutation}
 */
export const mutation = (blocks) => ({
  insert_blockchain_contract: [
    {
      objects: blocks.map(insert),
      // Ignore duplicates, just in case fauna's uniqness constrained has failed.
      on_conflict: {
        constraint:
          Migration.schema.blockchain_contract_constraint
            .blockchain_contract_pkey,
        update_columns: [],
      },
    },
    {
      affected_rows: true,
    },
  ],
})

export const main = () =>
  Migration.start({ collection: 'TokenContract', mutation, query })

script({ ...import.meta, main })
