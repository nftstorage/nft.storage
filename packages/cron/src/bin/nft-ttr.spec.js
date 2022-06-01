import { describe, testIf, testsCanUseNetwork } from '../lib/testing'
import { main as binNftTtr } from './nft-ttr'
import { recordedLog } from '../lib/log'
import * as assert from 'node:assert'

const defaultTestMinImageSizeBytes = 10 * 1e6

describe('bin/nft-ttr', () => {
  testIf(testsCanUseNetwork)(
    `works with --minImageSizeBytes=${defaultTestMinImageSizeBytes} and multiple gateways`,
    async () => {
      const { log, info } = recordedLog()
      const minImageSizeBytes = defaultTestMinImageSizeBytes
      const gateways = ['https://nftstorage.link', 'https://dweb.link']
      const command = `measure --minImageSizeBytes=${minImageSizeBytes} --gateways ${gateways.join(
        ' '
      )}`
      await binNftTtr(command.split(' '), { log })
      /** @type {import('../jobs/measureNftTimeToRetrievability').RetrieveLog[]} */
      const retrieves = info.flatMap((logs) =>
        logs[0]?.type === 'retrieve' ? [logs[0]] : []
      )
      assert.equal(retrieves.length, gateways.length)
      const gatewaysNeedingRetrieval = new Set(gateways)
      for (const retrieve of retrieves) {
        assert.ok(retrieve)
        assert.equal(
          typeof retrieve.duration.size,
          'number',
          'expected retrieve duration size to be a number'
        )
        assert.ok(retrieve.contentLength > minImageSizeBytes)
        for (const gateway of gatewaysNeedingRetrieval) {
          if (retrieve.url.toString().startsWith(gateway)) {
            gatewaysNeedingRetrieval.delete(gateway)
            break
          }
        }
      }
      assert.equal(gatewaysNeedingRetrieval.size, 0)
    }
  )
})
