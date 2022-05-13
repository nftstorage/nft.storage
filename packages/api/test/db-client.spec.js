import assert from 'assert'
import { signJWT } from '../src/utils/jwt.js'
import { createClientWithUser, DBTestClient } from './scripts/helpers.js'
import { getServiceConfig } from '../src/config.js'

describe('DB Client', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

it('getUser should list only active keys', async () => {
    const { secrets } = getServiceConfig()
    const issuer1 = `did:eth:0x73573${Date.now()}`
    const token1 = await signJWT(
      {
        sub: issuer1,
        iss: 'nft-storage',
        iat: Date.now(),
        name: 'key1',
      },
      secrets.salt
    )
    await client.client.createKey({
      name: 'key1',
      secret: token1,
      userId: client.userId,
    })
    const issuer2 = `did:eth:0x73573${Date.now()}`
    const token2 = await signJWT(
      {
        sub: issuer2,
        iss: 'nft-storage',
        iat: Date.now(),
        name: 'key2',
      },
      secrets.salt
    )
    const key2 = await client.client.createKey({
      name: 'key2',
      secret: token2,
      userId: client.userId,
    })

    await client.client.deleteKey(client.userId, key2.id)

    const user = await client.client.getUser(client.githubId)

    if (!user) {
      throw new Error('no user data')
    }
    const keys = user.keys
    assert.equal(keys.length, 3)
    assert.equal(keys[1].name, 'key1')
  })
})
