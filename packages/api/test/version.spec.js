import assert from 'assert'
import { getServiceConfig } from '../src/config.js'

describe('/version', () => {
  it('should get version information', async () => {
    const cfg = getServiceConfig()
    const res = await fetch('/version')
    assert(res)
    assert(res.ok)
    const { version, commit, branch, mode } = await res.json()
    assert.strictEqual(version, cfg.VERSION)
    assert.strictEqual(commit, cfg.COMMITHASH)
    assert.strictEqual(branch, cfg.BRANCH)
    assert.strictEqual(mode, cfg.MAINTENANCE_MODE)
  })
})
