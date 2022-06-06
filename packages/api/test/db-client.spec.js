import assert from 'assert'
import { signJWT } from '../src/utils/jwt.js'
import {
  createClientWithUser,
  createUserTag,
  DBTestClient,
} from './scripts/helpers.js'
import { getServiceConfig } from '../src/config.js'

/**
 * @typedef {import('../src/utils/db-client-types').UserOutput} UserOutput
 */

describe('DB Client', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('getUser should list only active keys', async () => {
    const config = getServiceConfig()
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
    assert.equal(keys.length, 3)
    assert.equal(keys[1].name, 'key1')
  })

  describe('copyUserData', () => {
    const numAuthKeys = 3
    const numUploads = 10

    /** @type UserOutput */
    let oldUser

    /** @type UserOutput */
    let newUser

    beforeEach(async () => {
      let resp = await client.client.upsertUser({
        github_id: '@old-user',
        magic_link_id: 'old-user-magic-link',
        public_address: 'old-user-public-addr',
        name: 'old user account',
        email: 'olduser@example.com',
      })
      assert.ok(resp.body)

      resp = await client.client.upsertUser({
        github_id: '@new-user',
        magic_link_id: 'new-user-magic-link',
        public_address: 'new-user-public-addr',
        name: 'new user account',
        email: 'newuser@example.com',
      })
      assert.ok(resp.body)

      let getUserResponse = await client.client.getUser('old-user-magic-link')
      assert.ok(getUserResponse)
      oldUser = getUserResponse

      getUserResponse = await client.client.getUser('new-user-magic-link')
      assert.ok(getUserResponse)
      newUser = getUserResponse

      // add some auth keys, tags and uploads to the old user
      for (let i = 0; i < numAuthKeys; i++) {
        await client.client.createKey({
          name: `test-key-${i}`,
          secret: `secret-${i}`,
          userId: oldUser.id,
        })
      }

      await createUserTag({
        user_id: oldUser.id,
        tag: 'HasPsaAccess',
        value: 'true',
        reason: '',
        inserted_at: new Date().toISOString(),
      })

      await createUserTag({
        user_id: oldUser.id,
        tag: 'HasAccountRestriction',
        value: 'false',
        reason: '',
        inserted_at: new Date().toISOString(),
      })

      for (let i = 0; i < numUploads; i++) {
        await client.client.createUpload({
          user_id: oldUser.id,
          content_cid: `content-cid-${i}`,
          source_cid: `source-cid-${i}`,
          type: 'Blob',
        })
      }
    })

    afterEach(async () => {
      await client.rawClient
        .from('upload')
        .delete()
        .or(`user_id.eq.${newUser.id},user_id.eq.${oldUser.id}`)

      await client.rawClient
        .from('auth_key')
        .delete()
        .or(`user_id.eq.${oldUser.id},user_id.eq.${newUser.id}`)

      await client.rawClient
        .from('user_tag')
        .delete()
        .or(`user_id.eq.${oldUser.id},user_id.eq.${newUser.id}`)

      await client.rawClient
        .from('user')
        .delete()
        .or(`user_id.eq.${oldUser.id},user_id.eq.${newUser.id}`)
    })

    it('copies uploads from old user id to new user id', async () => {
      const existingUploadsForNewUser = await client.client.listUploads(
        newUser.id,
        { limit: numUploads }
      )
      assert.ok(existingUploadsForNewUser)
      assert.equal(existingUploadsForNewUser.length, 0)

      await client.client.copyUserData({
        old_user_id: oldUser.id,
        new_user_id: newUser.id,
        copy_auth_keys: false,
        copy_tags: false,
      })

      const uploadsAfterCopy = await client.client.listUploads(newUser.id, {
        limit: numUploads,
      })
      assert.ok(uploadsAfterCopy)
      assert.equal(uploadsAfterCopy.length, numUploads)

      // uploads should still exist for the old user id
      const oldUserUploads = await client.client.listUploads(oldUser.id, {
        limit: numUploads,
      })
      assert.ok(oldUserUploads)
      assert.equal(oldUserUploads.length, numUploads)
    })

    it('copies user tags if copy_tags is true', async () => {
      assert.equal(newUser.tags.length, 0)

      await client.client.copyUserData({
        old_user_id: oldUser.id,
        new_user_id: newUser.id,
        copy_auth_keys: false,
        copy_tags: true,
      })

      const updatedUser = await client.client.getUser(newUser.github_id)
      assert.ok(updatedUser)
      assert.equal(updatedUser.tags.length, 2)
    })

    it('copies auth keys if copy_auth_keys is true', async () => {
      assert.equal(newUser.keys.length, 0)

      await client.client.copyUserData({
        old_user_id: oldUser.id,
        new_user_id: newUser.id,
        copy_auth_keys: true,
        copy_tags: false,
      })

      const updatedUser = await client.client.getUser(newUser.github_id)
      assert.ok(updatedUser)
      assert.equal(updatedUser.keys.length, numAuthKeys)
    })
  })
})
