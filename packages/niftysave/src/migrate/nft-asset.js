import { script } from 'subprogram'
import * as Migration from '../migrate.js'
import { Get, Var, Lambda, Let, Select, If, IsNull, Now } from '../fauna.js'

export const query = Lambda(
  ['ref'],
  Let(
    {
      nil: null,
      tokenAsset: Get(Var('ref')),
      metadata_ref: Select(['data', 'metadata'], Var('tokenAsset'), Var('nil')),
      content_cid: If(
        IsNull(Var('metadata_ref')),
        null,
        Select(
          ['data', 'cid'],
          Get(Select(['data', 'content'], Get(Var('metadata_ref'))))
        )
      ),
    },
    {
      ts: Select('ts', Var('tokenAsset')),
      ref: Var('ref'),
      data: {
        token_uri: Select(['data', 'tokenURI'], Var('tokenAsset')),
        content_cid: Var('content_cid'),
        ipfs_url: Select(['data', 'ipfsURL'], Var('tokenAsset'), Var('nil')),
        status: Select(['data', 'status'], Var('tokenAsset')),
        status_text: Select(['data', 'statusText'], Var('tokenAsset'), ''),
        updated_at: Select(['data', 'updated'], Var('tokenAsset'), Now()),
      },
    }
  )
)

/**
 * @typedef {{
 *   token_uri: string
 *   content_cid: string | null
 *   ipfs_url: string | null
 *   status: import('../../gen/db/schema').TokenAssetStatus,
 *   status_text: string
 *   updated_at: import('faunadb').values.FaunaTime
 * }} Asset
 *
 * @param {Migration.Document<Asset>} document
 */
const insert = ({
  ts,
  data: { token_uri, content_cid, ipfs_url, status, status_text, updated_at },
}) => ({
  token_uri,
  content_cid,
  ipfs_url,
  status,
  status_text,
  updated_at: updated_at.date,
})

/**
 * @param {Migration.Document<Asset>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  insert_nft_asset: [
    {
      objects: documents.map(insert),
      // Ignore duplicates, just in case fauna's uniqness constrained has failed.
      on_conflict: {
        constraint: Migration.schema.nft_asset_constraint.nft_asset_pkey,
        update_columns: [],
      },
    },
    {
      affected_rows: 1,
    },
  ],
})

export const main = () =>
  Migration.start({ collection: 'TokenAsset', mutation, query })

script({ ...import.meta, main })
