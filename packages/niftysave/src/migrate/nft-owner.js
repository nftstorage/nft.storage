import * as Migration from '../migrate.js'

import { script } from 'subprogram'

/**
 * @typedef {{
 *    id: string
 * }} Owner
 *
 * @param {Migration.Document<Owner>} doc
 */
const insert = ({ data }) => ({
  id: data.id,
  inserted_at: { date: new Date() }.date.toUTCString(),
})

/**
 * @param {Migration.Document<Owner>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  insert_nft_owner: [
    {
      objects: documents.map(insert),
      on_conflict: {
        constraint: Migration.schema.nft_owner_constraint.nft_owner_pkey,
        update_columns: [],
      },
    },
    {
      affected_rows: true,
    },
  ],
})

const main = () => Migration.start({ collection: 'Owner', mutation })

script({ ...import.meta, main })
