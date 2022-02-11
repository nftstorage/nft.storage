import assert from 'assert'

describe('Get ipfs', () => {
  it('should resolve a cid v0', async () => {
    const res = await fetch(
      '/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR'
    )
    assert(res)
    assert(res.ok)
    const text = await res.text()
    assert.deepEqual(text.length, 113955)
  })

  it('should resolve a cid v1', async () => {
    const res = await fetch(
      '/ipfs/bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq'
    )
    assert(res)
    assert(res.ok)
    assert.deepEqual(await res.text(), 'Hello nft.storage! 😎')
  })

  it('should resolve a cid and path', async () => {
    const res = await fetch(
      '/ipfs/bafybeifvsmjgbhck72pabliifeo35cew5yhxujfqjxg4g32vr3yv24h6zu/path/file.txt'
    )
    assert(res)
    assert(res.ok)
    assert.deepEqual(await res.text(), 'hello\n')
  })
})
