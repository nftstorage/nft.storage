import { script } from 'subprogram'
import * as Migration from '../migrate.js'
import { Get, Var, Lambda, Let, Select } from '../fauna.js'

const query = Lambda(
  ['ref'],
  Let(
    {
      doc: Get(Var('ref')),

      metadata: Get(Select(['data', 'metadataID'], Var('doc'))),
      content: Get(Select(['data', 'content'], Var('metadata'))),
      resource: Get(Select(['data', 'resourceID'], Var('doc'))),
    },
    {
      ts: Select('ts', Var('metadata')),
      ref: Var('ref'),
      data: {
        content_cid: Select(['data', 'cid'], Var('content')),
        resource_uri: Select(['data', 'uri'], Var('resource')),
      },
    }
  )
)

/**
 * @param {Migration.Document<OtherNFTResource>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  insert_other_nft_resources: [
    {
      objects: documents.map(insert),
      // Ignore duplicates, just in case fauna's uniqness constrained has failed.
      on_conflict: {
        constraint:
          Migration.schema.other_nft_resources_constraint
            .other_nft_resources_pkey,
        update_columns: [],
      },
    },
    {
      affected_rows: 1,
    },
  ],
})

/**
 * @typedef {{
 *    resource_uri: string
 *    content_cid: string
 * }}
 * OtherNFTResource
 *
 * @param {Migration.Document<OtherNFTResource>} document
 */
const insert = ({ ts, data: { resource_uri, content_cid } }) => ({
  resource_uri,
  content_cid,
  inserted_at: Migration.fromTimestamp(ts),
})

export const main = () =>
  Migration.start({ collection: 'metadata_assets', mutation, query })

script({ ...import.meta, main })
