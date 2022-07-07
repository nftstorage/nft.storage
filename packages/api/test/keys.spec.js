import assert from 'assert'
import {
  createClientWithUser,
  DBTestClient,
  getRawClient,
} from './scripts/helpers.js'

describe('Auth Keys', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('should list just the default key', async () => {
    const res = await fetch(`internal/tokens`, {
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok, value } = await res.json()

    assert.equal(value[0].secret, client.token)
    assert.equal(value[0].name, 'test')
  })

  it('should create a key', async () => {
    const res = await fetch(`internal/tokens`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ name: 'test2' }),
    })
    const { ok, value } = await res.json()

    assert.ok(ok)
    assert.equal(value.name, 'test2')
    assert.equal(value.user_id, client.userId)
    assert.equal(value.deleted_at, null)
  })

  it('should error creating a key when name is not provided', async () => {
    const res = await fetch(`internal/tokens`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({}),
    })
    const { ok, error } = await res.json()

    assert.equal(ok, false)
    assert.deepStrictEqual(error, {
      code: 'Error',
      message: 'Token name is required.',
    })
  })

  it('should delete a key', async () => {
    const res = await fetch(`internal/tokens`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ name: 'test-delete' }),
    })
    const { ok, value } = await res.json()
    assert.ok(ok, 'create key')

    const testTs = Date.now()
    const resDelete = await fetch(`internal/tokens`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ id: value.id }),
    })
    const deleteData = await resDelete.json()
    assert.ok(deleteData.ok, 'delete key')

    const { data, error } = await getRawClient()
      .from('auth_key')
      .select('*')
      .eq('id', value.id)
      .single()

    // @ts-ignore
    assert.ok(
      new Date(data.deleted_at).valueOf() > testTs,
      'deleted_at should be bigger than date before delete request'
    )
    assert.ok(
      new Date(data.updated_at).valueOf() > testTs,
      'updated_at should be bigger than date before delete request'
    )
    assert.equal(
      data.deleted_at,
      data.updated_at,
      'deleted_at and updated_at should be equal'
    )
  })

  it('should error deleting a key when id is not provided', async () => {
    const resDelete = await fetch(`internal/tokens`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({}),
    })
    const deleteData = await resDelete.json()
    assert.equal(deleteData.ok, false)
    assert.deepStrictEqual(deleteData.error, {
      code: 'Error',
      message: 'Token id is required.',
    })
  })

  it('should not list deleted keys', async () => {
    const client = await createClientWithUser()
    const res1 = await fetch(`internal/tokens`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ name: 'test-key-1' }),
    })
    const key1 = await res1.json()
    assert.ok(key1.ok, 'create key 1')

    const res2 = await fetch(`internal/tokens`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ name: 'test-key-2' }),
    })
    const key2 = await res2.json()
    assert.ok(res2.ok, 'create key 1')

    const resDelete = await fetch(`internal/tokens`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ id: key2.value.id }),
    })
    const deleteData = await resDelete.json()
    assert.ok(deleteData.ok, 'delete key 2')

    const res = await fetch(`internal/tokens`, {
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok, value } = await res.json()

    assert.equal(value.length, 2, 'should only have the default key and key1')
    assert.equal(value[1].name, 'test-key-1')
  })

  it("should not be able to delete another user's key", async () => {
    const client0 = await createClientWithUser()
    const client1 = await createClientWithUser()

    const resCreate = await fetch(`internal/tokens`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${client0.token}` },
      body: JSON.stringify({ name: 'test-key-1' }),
    })
    const key = await resCreate.json()
    assert.ok(resCreate.ok, 'create key')

    // client1 should NOT be able to delete client0's key
    const resDelete = await fetch(`internal/tokens`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client1.token}` },
      body: JSON.stringify({ id: key.value.id }),
    })
    const deleteData = await resDelete.json()
    assert.ok(!deleteData.ok)

    const resList = await fetch(`internal/tokens`, {
      headers: { Authorization: `Bearer ${client0.token}` },
    })
    const { ok, value } = await resList.json()

    assert.equal(value.length, 2, 'should still have the default key and key1')
    assert.equal(value[1].name, 'test-key-1')
  })

  it('should not delete a deleted key', async () => {
    const client = await createClientWithUser()

    const resCreate = await fetch(`internal/tokens`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ name: 'test-key-1' }),
    })
    const key = await resCreate.json()
    assert.ok(resCreate.ok, 'create key')

    let resDelete = await fetch(`internal/tokens`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ id: key.value.id }),
    })
    let deleteData = await resDelete.json()
    assert.ok(deleteData.ok)

    resDelete = await fetch(`internal/tokens`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ id: key.value.id }),
    })
    deleteData = await resDelete.json()
    assert.ok(!deleteData.ok)
  })
})
