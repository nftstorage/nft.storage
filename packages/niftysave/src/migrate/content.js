import * as Migration from '../migrate.js'

import { script } from 'subprogram'

/**
 * @typedef {{
 *    cid: string
 *    created?: import('faunadb').values.FaunaTime
 *    dagSize?: number
 * }} Content
 *
 * @param {Migration.Document<Content>} doc
 */
const insert = ({ data }) => ({
  cid: data.cid,
  dag_size: data.dagSize || null,
  inserted_at: (data.created || { date: new Date() }).date,
})

/**
 * @param {Migration.Document<Content>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  insert_content: [
    {
      objects: documents.map(insert),
      on_conflict: {
        constraint: Migration.schema.content_constraint.content_pkey,
        update_columns: [],
      },
    },
    {
      affected_rows: 1,
    },
  ],
})

const main = () => Migration.start({ collection: 'Content', mutation })

script({ ...import.meta, main })
