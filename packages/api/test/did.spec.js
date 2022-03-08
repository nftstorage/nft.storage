import assert from 'assert'

describe('Service DID', () => {
  it('should return the service DID', async () => {
    const res = await fetch(`did`)
    const { ok, value } = await res.json()

    assert.equal(
      value,
      'did:key:z6MkgBRFJi7Ew2mzN7JtYN7nkq8M8qTHhLbsTEvV5j4ajWZS'
    )
  })
})
