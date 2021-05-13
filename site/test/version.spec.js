import assert from 'assert'
import '../src/index.js'

const endpoint = `http://testing.com`

describe('/version', () => {
  it('should get version information', async () => {
    const res = await fetch(new URL('version', endpoint).toString())
    assert(res)
    assert(res.ok)
    const { version, commit, branch } = await res.json()
    assert.strictEqual(version, VERSION)
    assert.strictEqual(commit, COMMITHASH)
    assert.strictEqual(branch, BRANCH)
  })
})
