import DB from '../gen/db/index.js'
import ERC721 from '../gen/erc721/index.js'
import dotenv from 'dotenv'

dotenv.config()

export const db = DB({
  url: new URL('https://graphql.fauna.com/graphql'),
  authorization: `Bearer ${process.env['FAUNA_KEY']}`,
})

export const erc721 = ERC721({
  url: new URL(
    'https://api.thegraph.com/subgraphs/name/nftstorage/eip721-subgraph'
  ),
})
