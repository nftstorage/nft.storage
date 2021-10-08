import assert from 'assert'
import {
  VERSION,
  COMMITHASH,
  BRANCH,
  MAINTENANCE_MODE,
} from './scripts/worker-globals.js'

describe('/version', () => {
  it('should get version information', async () => {
    const res = await fetch('/version')
    assert(res)
    assert(res.ok)
    const { version, commit, branch, mode } = await res.json()
    assert.strictEqual(version, VERSION)
    assert.strictEqual(commit, COMMITHASH)
    assert.strictEqual(branch, BRANCH)
    assert.strictEqual(mode, MAINTENANCE_MODE)
  })
})
