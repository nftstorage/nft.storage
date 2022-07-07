import test from 'ava'
import {
  setupMiniflareContext,
  getMiniflareContext,
  getTestServiceConfig,
} from './scripts/test-context.js'
import { createClientWithUser, getRawClient } from './scripts/helpers.js'

test.beforeEach(async (t) => {
  await setupMiniflareContext(t)
})

test('should list just the default key', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  const client = await createClientWithUser(config)
  const res = await mf.dispatchFetch(`http://localhost:8787/internal/tokens`, {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok, value } = await res.json()

  t.is(value[0].secret, client.token)
  t.is(value[0].name, 'test')
})

test('should create a key', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  const client = await createClientWithUser(config)
  const res = await mf.dispatchFetch(`http://localhost:8787/internal/tokens`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({ name: 'test2' }),
  })
  const { ok, value } = await res.json()

  t.truthy(ok)
  t.is(value.name, 'test2')
  t.is(value.user_id, client.userId)
  t.is(value.deleted_at, null)
})

test('should error creating a key when name is not provided', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  const client = await createClientWithUser(config)
  const res = await mf.dispatchFetch(`http://localhost:8787/internal/tokens`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({}),
  })
  const { ok, error } = await res.json()

  t.falsy(ok)
  t.deepEqual(error, {
    code: 'Error',
    message: 'Token name is required.',
  })
})

test('should delete a key', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  const client = await createClientWithUser(config)
  const res = await mf.dispatchFetch(`http://localhost:8787/internal/tokens`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({ name: 'test-delete' }),
  })
  const { ok, value } = await res.json()
  t.truthy(ok, 'create key')

  const testTs = Date.now()
  const resDelete = await mf.dispatchFetch(
    `http://localhost:8787/internal/tokens`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ id: value.id }),
    }
  )
  const deleteData = await resDelete.json()
  t.truthy(deleteData.ok, 'delete key')

  const { data, error } = await getRawClient(config)
    .from('auth_key')
    .select('*')
    .eq('id', value.id)
    .single()

  // @ts-ignore
  t.truthy(
    new Date(data.deleted_at).valueOf() > testTs,
    'deleted_at should be bigger than date before delete request'
  )
  t.truthy(
    new Date(data.updated_at).valueOf() > testTs,
    'updated_at should be bigger than date before delete request'
  )
  t.is(
    data.deleted_at,
    data.updated_at,
    'deleted_at and updated_at should be equal'
  )
})

test('should error deleting a key when id is not provided', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  const client = await createClientWithUser(config)
  const resDelete = await mf.dispatchFetch(
    `http://localhost:8787/internal/tokens`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({}),
    }
  )
  const deleteData = await resDelete.json()
  t.falsy(deleteData.ok)
  t.deepEqual(deleteData.error, {
    code: 'Error',
    message: 'Token id is required.',
  })
})

test('should not list deleted keys', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  const client = await createClientWithUser(config)
  const res1 = await mf.dispatchFetch(`http://localhost:8787/internal/tokens`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({ name: 'test-key-1' }),
  })
  const key1 = await res1.json()
  t.truthy(key1.ok, 'create key 1')

  const res2 = await mf.dispatchFetch(`http://localhost:8787/internal/tokens`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({ name: 'test-key-2' }),
  })
  const key2 = await res2.json()
  t.truthy(res2.ok, 'create key 1')

  const resDelete = await mf.dispatchFetch(
    `http://localhost:8787/internal/tokens`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ id: key2.value.id }),
    }
  )
  const deleteData = await resDelete.json()
  t.truthy(deleteData.ok, 'delete key 2')

  const res = await mf.dispatchFetch(`http://localhost:8787/internal/tokens`, {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok, value } = await res.json()

  t.is(value.length, 2, 'should only have the default key and key1')
  t.is(value[1].name, 'test-key-1')
})

test("should not be able to delete another user's key", async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  const client0 = await createClientWithUser(config)
  const client1 = await createClientWithUser(config)

  const resCreate = await mf.dispatchFetch(
    `http://localhost:8787/internal/tokens`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${client0.token}` },
      body: JSON.stringify({ name: 'test-key-1' }),
    }
  )
  const key = await resCreate.json()
  t.truthy(resCreate.ok, 'create key')

  // client1 should NOT be able to delete client0's key
  const resDelete = await mf.dispatchFetch(
    `http://localhost:8787/internal/tokens`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client1.token}` },
      body: JSON.stringify({ id: key.value.id }),
    }
  )
  const deleteData = await resDelete.json()
  t.falsy(deleteData.ok)

  const resList = await mf.dispatchFetch(
    `http://localhost:8787/internal/tokens`,
    {
      headers: { Authorization: `Bearer ${client0.token}` },
    }
  )
  const { ok, value } = await resList.json()

  t.is(value.length, 2, 'should still have the default key and key1')
  t.is(value[1].name, 'test-key-1')
})

test('should not delete a deleted key', async (t) => {
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  const client = await createClientWithUser(config)

  const resCreate = await mf.dispatchFetch(
    `http://localhost:8787/internal/tokens`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ name: 'test-key-1' }),
    }
  )
  const key = await resCreate.json()
  t.truthy(resCreate.ok, 'create key')

  let resDelete = await mf.dispatchFetch(
    `http://localhost:8787/internal/tokens`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ id: key.value.id }),
    }
  )
  let deleteData = await resDelete.json()
  t.truthy(deleteData.ok)

  resDelete = await mf.dispatchFetch(`http://localhost:8787/internal/tokens`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({ id: key.value.id }),
  })
  deleteData = await resDelete.json()
  t.truthy(!deleteData.ok)
})
