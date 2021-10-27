import fs from 'fs'
import { CID } from 'multiformats'
import * as Cluster from './src/cluster.js'
import { configure } from './src/config.js'
import * as IPFSURL from './src/ipfs-url.js'
import { timeout } from './src/net.js'
import * as Hasura from './gen/hasura/zeus/index.js'
import * as ERC721 from './gen/erc721/index.js'
import * as Retry from './src/retry.js'

const main = async () => {
  const config = await configure()

  Object.assign(globalThis, {
    Cluster,
    config,
    CID,
    fs,
    IPFSURL,
    timeout,
    Hasura,
    ERC721,
    Retry,
  })
}

main()
