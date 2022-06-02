import assert from 'assert'
import {
  withMode,
  READ_ONLY,
  READ_WRITE,
  NO_READ_OR_WRITE,
} from '../src/middleware/maintenance.js'

import {
  getServiceConfig,
  overrideServiceConfigForTesting,
} from '../src/config.js'

const baseConfig = getServiceConfig()

/** @param {import('../src/middleware/maintenance.js').Mode} mode */
const setMode = (mode) => {
  overrideServiceConfigForTesting({
    ...baseConfig,
    MAINTENANCE_MODE: mode,
  })
}

describe('maintenance middleware', () => {
  afterEach(() => {
    overrideServiceConfigForTesting(baseConfig)
  })

  it('should throw error when in maintenance', () => {
    /** @type {import('../src/bindings').Handler} */
    let handler
    const block = () => {
      // @ts-expect-error not passing params to our test handler
      handler()
    }
    handler = withMode(() => new Response(), READ_ONLY)
    setMode(READ_WRITE)
    assert.doesNotThrow(block)
    setMode(READ_ONLY)
    assert.doesNotThrow(block)
    setMode(NO_READ_OR_WRITE)
    assert.throws(block, /API undergoing maintenance/)

    handler = withMode(() => new Response(), READ_WRITE)
    setMode(READ_WRITE)
    assert.doesNotThrow(block)
    setMode(READ_ONLY)
    assert.throws(block, /API undergoing maintenance/)
    setMode(NO_READ_OR_WRITE)
    assert.throws(block, /API undergoing maintenance/)
  })

  it('should throw for invalid maintenance mode', () => {
    /** @type {import('../src/bindings').Handler} */
    const handler = withMode(() => new Response(), READ_WRITE)
    const block = () => {
      // @ts-expect-error not passing params to our test handler
      handler()
    }

    const invalidModes = ['', null, undefined, ['r', '-'], 'rwx']
    invalidModes.forEach((m) => {
      // @ts-expect-error purposely passing invalid mode
      setMode(m)
      assert.throws(block, /invalid maintenance mode/)
    })
  })

  it('should not allow invalid handler mode', () => {
    assert.throws(
      () => withMode(() => new Response(), NO_READ_OR_WRITE),
      /invalid mode/
    )
  })
})
