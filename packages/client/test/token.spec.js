import * as assert from 'uvu/assert'
import { Blob, FormData } from 'nft.storage'
import * as Token from '../src/token.js'

describe('token', () => {
  it('should encode to FormData from token input object', () => {
    const input = {
      name: 'name',
      description: 'stuff',
    }
    const inputWithImage = {
      ...input,
      image: new Blob(['fake image'], { type: 'image/png' }),
    }
    const form = Token.encode(inputWithImage)
    assert.ok(form instanceof FormData)
    assert.ok(form.has('image'))
    assert.equal(form.get('meta'), JSON.stringify(input))
  })

  it('should decode from /store repsonse object', () => {
    const token = Token.decode(
      {
        ipnft: 'bafyreib75ot3oyo43f7rhdk6xlv7c4mmjwhbjjnugrw3yqjvarpvtzxkoi',
        url: 'ipfs://bafyreib75ot3oyo43f7rhdk6xlv7c4mmjwhbjjnugrw3yqjvarpvtzxkoi',
        data: {
          name: 'name',
          description: 'stuff',
          image:
            'ipfs://bafybeierifjwnazodizfrpyfrnr6qept7dlppv6fjas24w2wcri2osmrre/blob',
        },
      },
      new Set(['image'])
    )
    assert.equal(
      token.ipnft,
      'bafyreib75ot3oyo43f7rhdk6xlv7c4mmjwhbjjnugrw3yqjvarpvtzxkoi'
    )
    assert.equal(
      token.data.image.toString(),
      'ipfs://bafybeierifjwnazodizfrpyfrnr6qept7dlppv6fjas24w2wcri2osmrre/blob'
    )
  })

  it('should create a new token from token input object', async () => {
    const input = {
      name: 'name',
      description: 'stuff',
      image: new Blob(['fake image'], { type: 'image/png' }),
    }
    const { token } = await Token.Token.encode(input)
    assert.equal(
      token.ipnft,
      'bafyreib75ot3oyo43f7rhdk6xlv7c4mmjwhbjjnugrw3yqjvarpvtzxkoi'
    )
    assert.equal(
      token.data.image.toString(),
      'ipfs://bafybeierifjwnazodizfrpyfrnr6qept7dlppv6fjas24w2wcri2osmrre/blob'
    )
  })
})
