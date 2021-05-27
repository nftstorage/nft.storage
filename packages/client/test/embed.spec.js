import * as assert from 'uvu/assert'
import { toEmbedURL } from 'nft.storage'

describe('toEmbedURL', () => {
  it('converts ipfs:// URL to a gateway URL', () => {
    const ipfsURL =
      'ipfs://bafybeibcepxovpzwu6ug3ofoyejj3a3z5dqqn6invyiqg3jhuzr27ticp4/yesthisisdog.jpg'
    const gwURL =
      'https://dweb.link/ipfs/bafybeibcepxovpzwu6ug3ofoyejj3a3z5dqqn6invyiqg3jhuzr27ticp4/yesthisisdog.jpg'
    const result = toEmbedURL(ipfsURL)
    assert.equal(result.toString(), gwURL)
  })

  it('leaves non ipfs:// URL alone', () => {
    const nonIpfsURL = new URL('https://example.com')
    const result = toEmbedURL(nonIpfsURL)
    assert.equal(result.toString(), nonIpfsURL.toString())
  })
})
