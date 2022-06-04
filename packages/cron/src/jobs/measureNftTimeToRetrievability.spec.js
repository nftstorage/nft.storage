import {
  createStubbedRetrievalMetricsLogger,
  measureNftTimeToRetrievability,
} from './measureNftTimeToRetrievability.js'
import { jest } from '@jest/globals'
import * as assert from 'assert'
import { it, describe } from '../lib/testing.js'
import { recordedLog } from '../lib/log.js'
import { createRandomImage, createRandomImageBlob } from '../lib/random.js'

/**
 * @returns {AsyncIterable<File>}
 */
export async function* createTestImages(count = 1) {
  while (count--) {
    const blob = await createRandomImageBlob(
      createRandomImage({
        bytes: { min: 1 },
      })
    )
    yield new File([blob], 'image.jpg', blob)
  }
}

describe('measureNftTimeToRetrievability', () => {
  it('has a unit test', async () => {
    /** this is meant to be a test that doesn't use the network (e.g. inject stubs) */
    const { info, log } = recordedLog()

    const storer = {
      /** @param {import('nft.storage/dist/src/token').TokenInput} nft */
      store: async (nft) => {
        return {
          ipnft: 'bafybeiarmhq3d7msony7zfq67gmn46syuv6jrc6dagob2wflunxiyaksj4',
          nft,
        }
      },
    }
    const storeSpy = jest.spyOn(storer, 'store')

    const metricsPusher = {
      push: createStubbedRetrievalMetricsLogger(),
    }
    const metricsPushSpy = jest.spyOn(metricsPusher, 'push')

    await measureNftTimeToRetrievability({
      log,
      images: createTestImages(1),
      gateways: [new URL('https://nftstorage.link')],
      store: (n) => storer.store(n),
      metricsPushGatewayJobName: 'integration-tests',
      pushRetrieveMetrics: (...args) => metricsPusher.push(...args),
      secrets: {
        nftStorageToken: 'TODO',
        metricsPushGatewayAuthorization: { authorization: 'bearer todo' },
      },
      fetchImage: async () => {
        return createRandomImageBlob(createRandomImage({ bytes: { min: 1 } }))
      },
    })
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
    // did call pushRetrieveMetrics
    assert.equal(metricsPushSpy.mock.calls.length, 1)
    const finish = info.find((logs) => logs[0]?.type === 'finish')[0]
    assert.ok(finish)
  })
})
