import pg from 'pg'

/**
 * @param {pg.Client} db
 */
export function recordBackups(db) {
  /**
   * @param {AsyncIterable<import('./bindings').BackupInfo} source
   */
  return async function (source) {}
}
