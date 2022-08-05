import test from 'ava'
import {
  READ_ONLY,
  READ_WRITE,
  NO_READ_OR_WRITE,
} from '../src/middleware/maintenance.js'
import { createClientWithUser } from './scripts/helpers.js'

import {
  getMiniflareContext,
  setupMiniflareContext,
} from './scripts/test-context.js'

/** @typedef {import('../src/middleware/maintenance.js').Mode} Mode */

test.before(async (t) => {
  await setupMiniflareContext(t)
})

/**
 * @param {import('ava').ExecutionContext<unknown>} t
 * @param {Mode} mode
 */
const setMode = async (t, mode) => {
  const mf = getMiniflareContext(t)
  const bindings = await mf.getBindings()
  await mf.setOptions({
    bindings: {
      ...bindings,
      MAINTENANCE_MODE: mode,
    },
  })
  await mf.reload()
}

test('maintenance middleware should throw error when in maintenance mode', async (t) => {
  const { token } = await createClientWithUser(t)

  const expectedError = { message: /API undergoing maintenance/ }

  await setMode(t, READ_WRITE)
  await t.notThrowsAsync(tryRead(t, token))
  await t.notThrowsAsync(tryWrite(t, token))

  await setMode(t, READ_ONLY)
  await t.notThrowsAsync(tryRead(t, token))
  await t.throwsAsync(tryWrite(t, token), expectedError)

  await setMode(t, NO_READ_OR_WRITE)
  await t.throwsAsync(tryRead(t, token), expectedError)
  await t.throwsAsync(tryWrite(t, token), expectedError)
})

/**
 *
 * @param {import('ava').ExecutionContext} t
 * @param {string} token
 */
async function tryWrite(t, token) {
  const mf = getMiniflareContext(t)
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    headers: { authorization: `Bearer ${token}` },
    method: 'POST',
    body: new Blob(['hello there ', new Date().toISOString()]),
  })
  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(error.message)
  }
}

/**
 *
 * @param {import('ava').ExecutionContext} t
 * @param {string} token
 */
async function tryRead(t, token) {
  const mf = getMiniflareContext(t)
  const res = await mf.dispatchFetch('http://miniflare.test/', {
    headers: { authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(error.message)
  }
}
