import { describe, testIf, testsCanUseNetwork } from '../lib/testing'
import { main as binNftTtr } from './nft-ttr'
import { EnvironmentLoader } from 'safe-env-vars'
import { recordedLog } from '../lib/log'
import * as assert from 'node:assert'

const BYTES_10_MB = 10 * 1e6

describe('bin/nft-ttr', () => {
  testIf(testsCanUseNetwork())(
    `works with --min-image-size-bytes=${BYTES_10_MB}`,
    async () => {
      const { info, log } = recordedLog()
      const env = new EnvironmentLoader()
      const NFT_STORAGE_API_KEY = env.string.get('NFT_STORAGE_API_KEY')
      const command = `measure --min-image-size-bytes=${BYTES_10_MB}`
      await binNftTtr(command.split(' '), { log })
      const retrieve = info.find((logs) => logs[0]?.type === 'retrieve')[0]
      assert.ok(retrieve)
      assert.equal(
        typeof retrieve?.duration?.size,
        'number',
        'expected retrieve duration size to be a number'
      )
      assert.ok(retrieve.contentLength > BYTES_10_MB)
    }
  )
})
