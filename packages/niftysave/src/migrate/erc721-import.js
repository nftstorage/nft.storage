import { script } from 'subprogram'
import * as Migration from '../migrate.js'
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
 * @param {Migration.MigrationConfig} config
 * @param {string|null} cursor
 * @param {Migration.Document<ERC721ImportResult>[]} documents
 */
export const migrate = (config, cursor, documents) =>
  Migration.writeMigrationState(
    config,
    {
      cursor,
      metadata: {},
    },
    {
      insert_erc721_import: [
        {
          objects: documents.map(insert),
        },
        {
          affected_rows: 1,
        },
      ],
    }
  )

const main = () =>
  Migration.start({ collection: 'ERC721ImportResult', migrate })

script({ ...import.meta, main })
