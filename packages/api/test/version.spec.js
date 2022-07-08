import test from 'ava'
import {
  cleanupTestContext,
  getMiniflareContext,
  getTestServiceConfig,
  setupMiniflareContext,
} from './scripts/test-context.js'

test.before(async (t) => {
  await setupMiniflareContext(t, { noContainers: true })
})

test.after(async (t) => {
  await cleanupTestContext(t)
})

// FIXME: esbuild is setting the real version number in the worker, but we don't have access to it in the test scope...
test.skip('should get version information', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)

  const res = await mf.dispatchFetch('http://localhost:8787/version')
  t.truthy(res)
  t.true(res.ok)
  const { version, commit, branch, mode } = await res.json()
  t.is(version, config.VERSION)
  t.is(commit, config.COMMITHASH)
  t.is(branch, config.BRANCH)
  t.is(mode, config.MAINTENANCE_MODE)
})
