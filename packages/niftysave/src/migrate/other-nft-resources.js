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
      ts: Select('ts', Var('doc')),
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
  __alias: Object.fromEntries(documents.map(add)),
})

/**
 * @typedef {{
 *    resource_uri: string
 *    content_cid: string
 * }} OtherNFTResource
 *
 * @param {Migration.Document<OtherNFTResource>} doc
 * @param {number} index
 * @returns {[number, Migration.Mutation]}
 */
const add = (doc, index) => [
  index,
  {
    add_other_nft_resource: [
      { args: insert(doc) },
      {
        resource_uri_hash: true,
      },
    ],
  },
]

/**
 
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
