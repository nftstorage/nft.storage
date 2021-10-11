import assert from 'assert'
import {
  createClientWithUser,
  DBTestClient,
  rawClient,
} from './scripts/helpers.js'

describe('V1 - Auth Keys', () => {
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

    const resDelete = await fetch(`internal/tokens`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ id: value.id }),
    })
    const deleteData = await resDelete.json()
    assert.ok(deleteData.ok, 'delete key')

    const { data, error } = await rawClient
      .from('auth_key')
      .select('*')
      .eq('id', value.id)
      .single()

    // @ts-ignore
    assert.notEqual(data.deleted_at, null)
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

  it('should not list deleted a keys', async () => {
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
})
