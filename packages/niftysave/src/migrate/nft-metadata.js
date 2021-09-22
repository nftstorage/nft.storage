import { script } from 'subprogram'
import * as Migration from '../migrate.js'
import { Get, Var, Lambda, Let, Select } from '../fauna.js'

/**
 * @typedef {{
 *    name: string
 *    description: string
 *    image_uri: string
 *    content_cid: string
 * }}
 * Metadata
 *
 * @param {Migration.Document<Metadata>} document
 */
const insert = ({
  ts,
  data: { name, description, image_uri, content_cid },
}) => ({
  name,
  description,
  image_uri,
  content_cid,
  inserted_at: Migration.fromTimestamp(ts),
})

const query = Lambda(
  ['ref'],
  Let(
    {
      metadata: Get(Var('ref')),
      image: Get(Select(['data', 'image'], Var('metadata'))),
      content: Get(Select(['data', 'content'], Var('metadata'))),
    },
    {
      ref: Var('ref'),
      ts: Select('ts', Var('metadata')),
      data: {
        name: Select(['data', 'name'], Var('metadata')),
        description: Select(['data', 'description'], Var('metadata')),
        image_uri: Select(['data', 'uri'], Var('image')),
        content_cid: Select(['data', 'cid'], Var('content')),
      },
    }
  )
)

/**
 * @param {Migration.Document<Metadata>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  insert_nft_metadata: [
    {
      objects: documents.map(insert),
      // Ignore duplicates because fauna does not seemed to have upheld
      // uniquness constraint causing >1 metadata witha same cid.
      on_conflict: {
        constraint: Migration.schema.nft_metadata_constraint.nft_metadata_pkey,
        update_columns: [],
      },
    },
    {
      affected_rows: 1,
    },
  ],
})

export const main = () =>
  Migration.start({ collection: 'Metadata', mutation, query })

script({ ...import.meta, main })
