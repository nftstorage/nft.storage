import test from 'ava'
import {
  withMode,
  READ_ONLY,
  READ_WRITE,
  NO_READ_OR_WRITE,
} from '../src/middleware/maintenance.js'

import { setupMiniflareContext } from './scripts/test-context.js'

/** @typedef {import('../src/middleware/maintenance.js').Mode} Mode */

/**
 * @param {import('ava').ExecutionContext<unknown>} t
 * @param {Mode} mode
 */
const setMode = async (t, mode) => {
  const overrides = { MAINTENANCE_MODE: mode }
  await setupMiniflareContext(t, {
    bindGlobals: true,
    noContainers: true,
    overrides,
  })
}

test('maintenance middleware should throw error when in maintenance mode', async (t) => {
  /** @type {import('../src/bindings').Handler} */
  let handler
  const block = () => {
    // @ts-expect-error not passing params to our test handler
    handler()
  }
  handler = withMode(() => new Response(), READ_ONLY)
  await setMode(t, READ_WRITE)
  t.notThrows(block)
  await setMode(t, READ_ONLY)
  t.notThrows(block)
  await setMode(t, NO_READ_OR_WRITE)
  t.throws(block, { message: /API undergoing maintenance/ })

  handler = withMode(() => new Response(), READ_WRITE)
  await setMode(t, READ_WRITE)
  t.notThrows(block)
  await setMode(t, READ_ONLY)
  t.throws(block, { message: /API undergoing maintenance/ })
  await setMode(t, NO_READ_OR_WRITE)
  t.throws(block, { message: /API undergoing maintenance/ })
})

test('maintenance middleware should not allow invalid handler mode', (t) => {
  t.throws(() => withMode(() => new Response(), NO_READ_OR_WRITE), {
    message: /invalid mode/,
  })
})
