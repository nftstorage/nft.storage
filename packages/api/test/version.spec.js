import test from 'ava'
import {
  getMiniflareContext,
  getTestServiceConfig,
  setupMiniflareContext,
} from './scripts/test-context.js'

test.before(async (t) => {
  await setupMiniflareContext(t)
})

test('should get version information', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)

  const res = await mf.dispatchFetch('http://miniflare.test/version')
  t.truthy(res)
  t.true(res.ok)
  const { version, commit, branch, mode } = await res.json()

  t.is(version, config.VERSION)
  t.is(commit, config.COMMITHASH)
  t.is(branch, config.BRANCH)
  t.is(mode, config.MAINTENANCE_MODE)
})
