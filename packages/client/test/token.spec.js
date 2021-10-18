import * as assert from 'uvu/assert'
import * as Token from '../src/token.js'

describe('token', () => {
  it('decodes from plain JS object', () => {
    const token = Token.decode(
      {
        ipnft: 'bafyreib75ot3oyo43f7rhdk6xlv7c4mmjwhbjjnugrw3yqjvarpvtzxkoi',
        url:
          'ipfs://bafyreib75ot3oyo43f7rhdk6xlv7c4mmjwhbjjnugrw3yqjvarpvtzxkoi',
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
})
