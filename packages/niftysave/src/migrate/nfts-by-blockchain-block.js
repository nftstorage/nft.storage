import { script } from 'subprogram'
import * as Migration from '../migrate.js'
import { Get, Var, Lambda, Let, Select } from '../fauna.js'

const query = Lambda(
  ['ref'],
  Let(
    {
      doc: Get(Var('ref')),
      token: Get(Select(['data', 'tokenID'], Var('doc'))),
      block: Get(Select(['data', 'blockID'], Var('doc'))),
    },
    {
      ts: Select('ts', Var('doc')),
      ref: Var('ref'),
      data: {
        nft_id: Select(['data', 'id'], Var('token')),
        blockchain_block_hash: Select(['data', 'hash'], Var('block')),
      },
    }
  )
)

/**
 * @typedef {{
 *    nft_id: string
 *    blockchain_block_hash: string
 * }}
 * NFT2Block
 *
 * @param {Migration.Document<NFT2Block>} document
 */
const insert = ({ ts, data: { nft_id, blockchain_block_hash } }) => ({
  nft_id,
  blockchain_block_hash,
  inserted_at: Migration.fromTimestamp(ts),
})

/**
 * @param {Migration.Document<NFT2Block>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  insert_nfts_by_blockchain_blocks: [
    {
      objects: documents.map(insert),
    },
    {
      affected_rows: 1,
    },
  ],
})

export const main = () =>
  Migration.start({ collection: 'block_tokens', mutation, query })

script({ ...import.meta, main })
