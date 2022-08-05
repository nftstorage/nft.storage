import test from 'ava'
import { signJWT } from '../src/utils/jwt.js'
import { createClientWithUser } from './scripts/helpers.js'
import {
  setupMiniflareContext,
  getTestServiceConfig,
} from './scripts/test-context.js'

test.before(async (t) => {
  await setupMiniflareContext(t)
})

test.serial('getUser should list only active keys', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const issuer1 = `did:eth:0x73573${Date.now()}`
  const token1 = await signJWT(
    {
      sub: issuer1,
      iss: 'nft-storage',
      iat: Date.now(),
      name: 'key1',
    },
    config.SALT
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
    config.SALT
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
  t.is(keys.length, 3)
  t.is(keys[1].name, 'key1')
})
