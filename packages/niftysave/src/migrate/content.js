import { script } from 'subprogram'
import { writeMigrationState, start } from '../migrate.js'
/**
 * @typedef {{
 *    cid: string
 *    created?: import('faunadb').values.FaunaTime
 *    dagSize?: number
 * }} Content
 *
 * @param {{data: Content}} input
 */
const insert = ({ data }) => ({
  cid: data.cid,
  dag_size: data.dagSize || null,
  inserted_at: (data.created || { date: new Date() }).date.toUTCString(),
})

/**
 * @param {import('../migrate.js').MigrationConfig} config
 * @param {string|null} cursor
 * @param {{data:Content}[]} input
 */
export const migrate = (config, cursor, input) =>
  writeMigrationState(
    config,
    {
      cursor,
      metadata: {},
    },
    {
      insert_content: [
        {
          objects: input.map(insert),
        },
        {
          affected_rows: 1,
        },
      ],
    }
  )

const main = () => start({ collection: 'Content', migrate })

script({ ...import.meta, main })
