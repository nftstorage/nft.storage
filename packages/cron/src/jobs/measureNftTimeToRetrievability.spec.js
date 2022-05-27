import {
  measureNftTimeToRetrievability,
  TestImages,
} from './measureNftTimeToRetrievability.js'
import { jest, describe, it } from '@jest/globals'
import * as assert from 'assert'

/** @type {import('../lib/log.js').LogFunction} */
const _noopLog = () => {}

/**
 * @returns {{log: import('../lib/log.js').LogFunction, info: any[]}}
 */
const recordedLog = () => {
  /** @type {any[]} */
  const info = []
  /** @type {import('../lib/log.js').LogFunction} */
  const log = (level, ...loggables) => {
    if (level === 'info') {
      info.push(loggables)
    }
  }
  return { log, info }
}

function MockStore() {
  /**
   * @type {import('./measureNftTimeToRetrievability.js').StoreFunction}
   */
  const store = async () => {
    return {
      ipnft: 'bafybeiarmhq3d7msony7zfq67gmn46syuv6jrc6dagob2wflunxiyaksj4',
    }
  }
  return store
}

describe('measureNftTimeToRetrievability', () => {
  jest.setTimeout(15 * 1000)
  it('has a test', async () => {
    const { info, log } = recordedLog()
    const storer = { store: MockStore() }
    const storeSpy = jest.spyOn(storer, 'store')
    await measureNftTimeToRetrievability(
      {
        log,
        images: TestImages(1),
        store: (n) => storer.store(n),
      },
      {
        nftStorageToken: 'TODO',
        metricsPushGatewayBasicAuthUser: '',
      }
    )
    assert.equal(storeSpy.mock.calls.length, 1)
    const start = info.find((logs) => logs[0]?.type === 'start')[0]
    assert.ok(start)
    const storeLog = info.find((logs) => logs[0]?.type === 'store')[0]
    assert.ok(storeLog)
    const retrieve = info.find((logs) => logs[0]?.type === 'retrieve')[0]
    assert.ok(retrieve)
    assert.equal(
      typeof retrieve?.duration?.size,
      'number',
      'expected retrieve duration size to be a number'
    )
    const finish = info.find((logs) => logs[0]?.type === 'finish')[0]
    assert.ok(finish)
  })
})
