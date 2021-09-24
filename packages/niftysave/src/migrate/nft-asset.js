import * as Migration from '../migrate.js'

import { Get, If, IsNull, Lambda, Let, Select, Var } from '../fauna.js'

import { TokenAssetStatus } from '../../gen/db/schema.js'
import { script } from 'subprogram'

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
        inserted_at: Select(['data', 'created'], Var('tokenAsset'), Var('nil')),
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
 *   inserted_at: import('faunadb').values.FaunaTime|null
 * }} Asset
 *
 * @param {Migration.Document<Asset>} document
 */
const insert = ({
  ts,
  data: { token_uri, content_cid, ipfs_url, status, status_text, inserted_at },
}) => ({
  token_uri,
  content_cid,
  ipfs_url,
  status:
    status == TokenAssetStatus.PinRequestFailed
      ? TokenAssetStatus.Queued
      : status,
  status_text,
  // If created time isn't recorded we just derive it from `ts`.
  inserted_at: inserted_at ? inserted_at.date : Migration.fromTimestamp(ts),
  updated_at: Migration.fromTimestamp(ts),
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
