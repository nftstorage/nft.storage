import {
  measureNftTimeToRetrievability,
  TestImages,
} from './measureNftTimeToRetrievability.js'
import { jest, describe, it } from '@jest/globals'
import * as assert from 'assert'
import toBuffer from 'it-to-buffer'
import { RandomImage } from '../lib/random.js'
import { Blob } from '@web-std/blob'
import { EnvironmentLoader } from 'safe-env-vars'

/**
 * Whether to run tests that will use the network, e.g. to request nft.storage directly (without mocks)
 */
const testsCanUseNetwork = () => Boolean(process.env.ALLOW_NETWORK_TESTS)

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

  testIf(testsCanUseNetwork())('can test using > 10mb image', async () => {
    const NFT_STORAGE_API_KEY = new EnvironmentLoader().string.get(
      'NFT_STORAGE_API_KEY'
    )
    // lower bound in bytes of image to use to test
    const minByteSize = 11 * 1e6
    const { info, log } = recordedLog()
    const images = (async function* () {
      const randomImageBytes = await toBuffer(
        RandomImage({ bytes: { min: minByteSize } })
      )
      assert.ok(
        randomImageBytes.length >= minByteSize,
        `expected random image byte length to be >= ${minByteSize}`
      )
      yield new Blob([randomImageBytes], { type: 'image/tiff' })
    })()
    try {
      await measureNftTimeToRetrievability(
        {
          log,
          images: images,
        },
        {
          nftStorageToken: NFT_STORAGE_API_KEY,
          metricsPushGatewayBasicAuthUser: '',
        }
      )
    } catch (error) {
      console.error('error during measurement', error)
      throw error
    }
    const storeLog = info.find((logs) => logs[0]?.type === 'store')[0]
    assert.ok(storeLog)
    const retrieve = info.find((logs) => logs[0]?.type === 'retrieve')[0]
    assert.ok(retrieve)
    assert.ok(retrieve.contentLength > minByteSize)
  })
})

/**
 * Conditionally run/skip a test
 * @param {boolean} condition
 * @returns function like 'it' but may invoke it.skip if conditional is falsy
 * @see https://github.com/facebook/jest/issues/7245
 */
function testIf(condition) {
  /**
   * @param {string} name
   * @param {() => Promise<void>} doTest
   */
  return function (name, doTest) {
    if (condition) {
      return it(name, doTest)
    } else {
      it.skip(name, doTest)
    }
  }
}
