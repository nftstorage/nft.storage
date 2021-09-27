import assert from 'assert'
import {
  modes,
  withMode,
  READ_ONLY,
  READ_WRITE,
  NO_READ_OR_WRITE,
  getMaintenanceMode,
  setMaintenanceMode,
} from '../src/middleware/maintenance.js'

describe('maintenance middleware', () => {
  it('should validate maintenance mode', () => {
    modes.forEach((m) => assert.doesNotThrow(() => setMaintenanceMode(m)))
    const invalidModes = ['', null, undefined, ['r', '-'], 'rwx']
    invalidModes.forEach((m) => {
      // @ts-expect-error
      assert.throws(() => setMaintenanceMode(m), /invalid maintenance mode/)
    })
  })

  it('should retrieve current maintenance mode', () => {
    modes.forEach((m) => {
      setMaintenanceMode(m)
      assert.strictEqual(getMaintenanceMode(), m)
    })
  })

  it('should throw error when in maintenance', () => {
    /** @type {import('../src/utils/router.js').Handler} */
    let handler
    // @ts-expect-error not passing params to our test handler
    const block = () => {
      handler()
    }

    handler = withMode(() => new Response(), READ_ONLY)
    setMaintenanceMode(READ_WRITE)
    assert.doesNotThrow(block)
    setMaintenanceMode(READ_ONLY)
    assert.doesNotThrow(block)
    setMaintenanceMode(NO_READ_OR_WRITE)
    assert.throws(block, /API undergoing maintenance/)

    handler = withMode(() => new Response(), READ_WRITE)
    setMaintenanceMode(READ_WRITE)
    assert.doesNotThrow(block)
    setMaintenanceMode(READ_ONLY)
    assert.throws(block, /API undergoing maintenance/)
    setMaintenanceMode(NO_READ_OR_WRITE)
    assert.throws(block, /API undergoing maintenance/)
  })

  it('should not allow invalid handler mode', () => {
    assert.throws(
      () => withMode(() => new Response(), NO_READ_OR_WRITE),
      /invalid mode/
    )
  })
})
