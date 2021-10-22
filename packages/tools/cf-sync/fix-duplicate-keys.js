import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { getDBPinStatus, getMimeAndType, parseCid } from './push-to-db.js'
import { DBClient } from '../../api/src/utils/db-client.js'
/**
 * @typedef {import('./cli2').Context} Context
 * @typedef {import('listr').ListrTaskWrapper} Task
 * @typedef {import('../../api/src/utils/db-client').definitions} definitions
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['content']>} ContentQuery
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['pin']>} PinQuery
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['upload']>} UploadQuery
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
})
const productionDB = new DBClient(
  process.env.DATABASE_URL_PRODUCTION || '',
  process.env.DATABASE_TOKEN_PRODUCTION || ''
)

const stagingDB = new DBClient(
  process.env.DATABASE_URL_STAGING || '',
  process.env.DATABASE_TOKEN_STAGING || ''
)

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function fixDuplicateKeys(ctx, task) {
  const { data, error } = await productionDB.client
    .from('user')
    .select('*, keys:auth_key_user_id_fkey(*)')

  if (error) {
    throw new Error(JSON.stringify(error))
  }

  if (!data) {
    throw new Error('no events found')
  }

  let count = data.length
  const keysToDelete = []
  for (const user of data) {
    const keys = new Set()
    task.output = `Queue: ${count} User ${user.email}`
    for (const key of user.keys) {
      if (key.deleted_at === null) {
        const id = key.name + key.secret
        if (keys.has(id)) {
          keysToDelete.push({
            ...key,
            deleted_at: new Date().toISOString(),
          })
        } else {
          keys.add(id)
        }
      }
    }
    count--
  }
  const deleteKeys = await productionDB.client
    .from('auth_key')
    .upsert(keysToDelete, { returning: 'minimal', count: 'exact' })
  console.log(
    '🚀 ~ file: fix-duplicate-keys.js ~ line 67 ~ fixDuplicateKeys ~ deleteKeys',
    deleteKeys
  )
}
