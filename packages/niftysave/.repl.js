import fauna from 'faunadb'
import fs from 'fs'
import { CID } from 'multiformats'
import * as Cluster from './src/cluster.js'
import { configure } from './src/config.js'
import * as IPFSURL from './src/ipfs-url.js'
import { timeout } from './src/net.js'

const config = configure()
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
})
