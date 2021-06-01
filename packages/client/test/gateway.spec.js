import * as assert from 'uvu/assert'
import { toGatewayURL } from 'nft.storage'

const cid = 'bafybeibcepxovpzwu6ug3ofoyejj3a3z5dqqn6invyiqg3jhuzr27ticp4'
const filename = 'yesthisisdog.jpg'

describe('toGatewayURL', () => {
  it('converts ipfs:// URL to a gateway URL', () => {
    const ipfsURL = new URL(`ipfs://${cid}/${filename}`)
    const gwURL = new URL(`https://dweb.link/ipfs/${cid}/${filename}`)
    const result = toGatewayURL(ipfsURL)
    assert.equal(result.href, gwURL.href)
  })

  it('converts ipfs:// URL (as string) to a gateway URL', () => {
    const ipfsURLStr = `ipfs://${cid}/${filename}`
    const gwURL = new URL(`https://dweb.link/ipfs/${cid}/${filename}`)
    const result = toGatewayURL(ipfsURLStr)
    assert.equal(result.href, gwURL.href)
  })

  it('leaves non ipfs:// URL alone', () => {
    const nonIpfsURL = new URL('https://example.com')
    const result = toGatewayURL(nonIpfsURL)
    assert.equal(result.href, nonIpfsURL.href)
  })
})
