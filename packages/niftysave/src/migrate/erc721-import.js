import * as Migration from '../migrate.js'

import { script } from 'subprogram'

/**
 * @typedef {{
 *    id: string
 *    nextID: string
 * }} ERC721ImportResult
 *
 * @param {Migration.Document<ERC721ImportResult>} document
 */
const insert = ({ ts, data: { id, nextID } }) => ({
  id,
  next_id: nextID,
  inserted_at: Migration.fromTimestamp(ts),
})

/**
 * @param {Migration.Document<ERC721ImportResult>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  insert_erc721_import: [
    {
      objects: documents.map(insert),
      on_conflict: {
        constraint:
          Migration.schema.erc721_import_constraint.erc721_import_pkey,
        update_columns: [
          Migration.schema.erc721_import_update_column.updated_at,
        ],
      },
    },
    {
      affected_rows: true,
    },
  ],
})

export const main = () =>
  Migration.start({ collection: 'ERC721ImportResult', mutation })

script({ ...import.meta, main })
