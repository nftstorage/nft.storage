import assert from 'assert'
import '../src/index.js'

const endpoint = `${location.href}api/`

describe('/version', () => {
  it('should get version information', async () => {
    console.log(new URL('version', endpoint).toString())
    const res = await fetch(new URL('version', endpoint).toString())
    console.log(res.status, res.statusText, await res.text())
    assert(res)
    assert(res.ok)
    const { version, commit, branch } = await res.json()
    assert.strictEqual(version, VERSION)
    assert.strictEqual(commit, COMMITHASH)
    assert.strictEqual(branch, BRANCH)
  })
})
