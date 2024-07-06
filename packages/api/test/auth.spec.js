import assert from 'assert'

describe.only('auth', () => {
  it('should return 401 Unauthorized when auth header missing', async () => {
    const res = await fetch('/login', { method: 'POST' })
    assert.strictEqual(res.status, 401)
    const { ok, error } = await res.json()
    assert.strictEqual(ok, false)
    assert.strictEqual(error.code, 'EXPECTED_BEARER_STRING')
  })

  it.only('should return 405 Method Not Allowed when not POST', async () => {
    const res = await fetch('/login', { method: 'GET' })
    assert.strictEqual(res.status, 405)
    const { ok, error } = await res.json()
    assert.strictEqual(ok, false)
    // assert.strictEqual(error.code, 'EXPECTED_BEARER_STRING')
    // QmVKaJVFaeeMSPonPSH1GK1Hxd82uXbroBbEsd9BRJARtc
  })
})
