import { script } from 'subprogram'
import * as Migration from '../migrate.js'
import { Get, Var, Lambda, Let, Select } from '../fauna.js'

/**
 * @typedef {{
 *    nft_id: string
 *    erc721_import_id: string
 * }}
 * ERC721ImportByNFT
 *
 * @param {Migration.Document<ERC721ImportByNFT>} document
 */
const insert = ({ ts, data: { nft_id, erc721_import_id } }) => ({
  nft_id,
  erc721_import_id,
  inserted_at: Migration.fromTimestamp(ts),
})

const query = Lambda(
  ['ref'],
  Let(
    {
      doc: Get(Var('ref')),
      token: Get(Select(['data', 'tokenID'], Var('doc'))),
      erc721Import: Get(Select(['data', 'eRC721ImportResultID'], Var('doc'))),
    },
    {
      ts: Select('ts', Var('doc')),
      ref: Select('ref', Var('doc')),
      data: {
        nft_id: Select(['data', 'id'], Var('token')),
        erc721_import_id: Select(['data', 'id'], Var('erc721Import')),
      },
    }
  )
)

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
      insert_erc721_import_by_nft: [
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
  Migration.start({ collection: 'eRC721ImportResult_tokens', migrate, query })

script({ ...import.meta, main })
