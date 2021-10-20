import assert from 'assert'
import {
  modes,
  withMode,
  READ_ONLY,
  READ_WRITE,
  NO_READ_OR_WRITE,
  setMaintenanceModeGetter,
} from '../src/middleware/maintenance.js'

describe('maintenance middleware', () => {
  it('should throw error when in maintenance', () => {
    /** @type {import('../src/bindings').Handler} */
    let handler
    const block = () => {
      // @ts-expect-error not passing params to our test handler
      handler()
    }

    handler = withMode(() => new Response(), READ_ONLY)
    setMaintenanceModeGetter(() => READ_WRITE)
    assert.doesNotThrow(block)
    setMaintenanceModeGetter(() => READ_ONLY)
    assert.doesNotThrow(block)
    setMaintenanceModeGetter(() => NO_READ_OR_WRITE)
    assert.throws(block, /API undergoing maintenance/)

    handler = withMode(() => new Response(), READ_WRITE)
    setMaintenanceModeGetter(() => READ_WRITE)
    assert.doesNotThrow(block)
    setMaintenanceModeGetter(() => READ_ONLY)
    assert.throws(block, /API undergoing maintenance/)
    setMaintenanceModeGetter(() => NO_READ_OR_WRITE)
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
      setMaintenanceModeGetter(() => m)
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
