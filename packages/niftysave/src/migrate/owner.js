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
  insert_owner: [
    {
      objects: documents.map(insert),
    },
    {
      affected_rows: 1,
    },
  ],
})

const main = () => Migration.start({ collection: 'Owner', mutation })

script({ ...import.meta, main })
