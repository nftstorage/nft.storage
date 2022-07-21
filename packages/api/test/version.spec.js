import test from 'ava'
import {
  getMiniflareContext,
  getTestServiceConfig,
  setupMiniflareContext,
} from './scripts/test-context.js'

// @ts-ignore
import git from 'git-rev-sync'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
)

test.before(async (t) => {
  await setupMiniflareContext(t, { noContainers: true })
})

test('should get version information', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)

  const res = await mf.dispatchFetch('http://localhost:8787/version')
  t.truthy(res)
  t.true(res.ok)
  const { version, commit, branch, mode } = await res.json()
  const expected = expectedVersionInfo()

  t.is(version, expected.version)
  t.is(commit, expected.commit)
  t.is(branch, expected.branch)
  t.is(mode, config.MAINTENANCE_MODE)
})

function expectedVersionInfo(env = 'test') {
  const version = `${pkg.name}@${pkg.version}-${env}+${git.short(__dirname)}`
  const commit = git.long(__dirname)
  const branch = git.branch(__dirname)

  return { version, commit, branch }
}
