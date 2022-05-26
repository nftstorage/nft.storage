import {
  measureNftTimeToRetrievability,
  TestImages,
} from './measureNftTimeToRetrievability.js'
import { jest } from '@jest/globals'
import * as assert from 'assert'

/** @type {import('../lib/log.js').LogFunction} */
const noopLog = () => {}

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

describe('measureNftTimeToRetrievability', () => {
  jest.setTimeout(15 * 1000)
  it('has a test', async () => {
    const { info, log } = recordedLog()
    await measureNftTimeToRetrievability({
      log,
      images: TestImages(1),
    })
    const start = info.find((logs) => logs[0]?.type === 'start')[0]
    assert.ok(start)
    const store = info.find((logs) => logs[0]?.type === 'store')[0]
    assert.ok(store)
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
