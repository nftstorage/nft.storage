#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fetch from '@web-std/fetch'
import { updatePendingPinStatuses } from '../jobs/pins.js'
import { getPg, getCluster1, getCluster2, getCluster3 } from '../lib/utils.js'
import { measureNftTimeToRetrievability } from '../jobs/measureNftTimeToRetrievability.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { EnvironmentLoader } from 'safe-env-vars'
const env = new EnvironmentLoader()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** @ts-ignore */
global.fetch = fetch

/** @param {string[]} argv */
async function main(...argv) {
  const [command, ...commandArgv] = hideBin(argv)
  switch (command) {
    case 'measure':
      await measureNftTimeToRetrievability({
        ...(await yargs(commandArgv).options({
          url: {
            type: 'string',
            default: 'https://nft.storage',
          },
          metricsPushGateway: {
            type: 'string',
          },
        }).argv),
        metricsPushGatewayBasicAuthUser: env.optional.string.get(
          'PUSHGATEWAY_BASIC_AUTH'
        ),
      })
      break
    default:
      throw new Error(`unexpected command ${command}`)
  }
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main(...process.argv)
