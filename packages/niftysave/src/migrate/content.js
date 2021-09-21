import { script } from 'subprogram'
import * as Migration from '../migrate.js'
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
  inserted_at: (data.created || { date: new Date() }).date.toUTCString(),
})

/**
 * @param {Migration.Document<Content>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  insert_content: [
    {
      objects: documents.map(insert),
    },
    {
      affected_rows: 1,
    },
  ],
})

const main = () => Migration.start({ collection: 'Content', mutation })

script({ ...import.meta, main })
