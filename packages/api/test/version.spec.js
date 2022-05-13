import assert from 'assert'
import { getServiceConfig } from '../src/config.js'

describe('/version', () => {
  it('should get version information', async () => {
    const cfg = getServiceConfig()
    const res = await fetch('/version')
    assert(res)
    assert(res.ok)
    const { version, commit, branch, mode } = await res.json()
    assert.strictEqual(version, cfg.version.semver)
    assert.strictEqual(commit, cfg.version.commitHash)
    assert.strictEqual(branch, cfg.version.branch)
    assert.strictEqual(mode, cfg.maintenanceMode)
  })
})
