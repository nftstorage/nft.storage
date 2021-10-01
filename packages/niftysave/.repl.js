import fauna from 'faunadb'
import fs from 'fs'
import { CID } from 'multiformats'
import * as Cluster from './src/cluster.js'
import { configure } from './src/config.js'
import * as IPFSURL from './src/ipfs-url.js'
import { timeout } from './src/net.js'
import * as Hasura from './gen/hasura/zeus/index.js'
import * as ERC721 from './gen/erc721/index.js'
import * as DB from './gen/db/index.js'
import * as Retry from './src/retry.js'

const main = async () => {
  const config = await configure()
  const client = new fauna.Client({ secret: process.env['FAUNA_KEY'] || '' })

  Object.assign(globalThis, {
    fauna,
    Cluster,
    config,
    client,
    CID,
    fs,
    IPFSURL,
    timeout,
    Hasura,
    DB,
    ERC721,
    Retry,
  })
}

main()
