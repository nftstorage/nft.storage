import assert from 'assert'
import { getServiceConfig } from '../src/config.js'

describe('/version', () => {
  it('should get version information', async () => {
    const cfg = getServiceConfig()
    const res = await fetch('/version')
    assert(res)
    assert(res.ok)
    const { version, commit, branch, mode } = await res.json()
    assert.strictEqual(version, cfg.NFT_STORAGE_VERSION)
    assert.strictEqual(commit, cfg.NFT_STORAGE_COMMITHASH)
    assert.strictEqual(branch, cfg.NFT_STORAGE_BRANCH)
    assert.strictEqual(mode, cfg.MAINTENANCE_MODE)
  })
})
