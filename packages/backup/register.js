/**
 * @param {import('pg').Client} db
 */
export function registerBackup (db) {
  /**
   * @param {AsyncIterable<import('./bindings').BackupInfo} source
   */
  return async function (source) {}
}
