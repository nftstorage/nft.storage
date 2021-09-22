import * as Migration from '../migrate.js'

import { Get, Lambda, Let, Select, Var } from '../fauna.js'

import { script } from 'subprogram'

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
 * @param {Migration.Document<ERC721ImportByNFT>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  insert_erc721_import_by_nft: [
    {
      objects: documents.map(insert),
      on_conflict: {
        constraint:
          Migration.schema.erc721_import_by_nft_constraint
            .erc721_import_by_nft_pkey,
        update_columns: [],
      },
    },
    {
      affected_rows: 1,
    },
  ],
})

export const main = () =>
  Migration.start({ collection: 'eRC721ImportResult_tokens', mutation, query })

script({ ...import.meta, main })
