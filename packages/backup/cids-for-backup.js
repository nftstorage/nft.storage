import pg from 'pg'

/**
 * Fetch a list of CIDs that need to be backed up.
 *
 * @param {string} connectionString PostgreSQL connection string.
 */
export async function* cidsForBackup(connectionString) {
  const client = new pg.Client({ connectionString })
  await client.connect()

  try {
  } finally {
    await client.end()
  }
}
