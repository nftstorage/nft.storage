import debug from 'debug'
import fs from 'fs'
import os from 'os'
import path from 'path'

const log = debug('backup:local')

/**
 * @param {AsyncIterable<import('./bindings').BackupContent} source
 * @returns {AsyncIterableIterator<import('./bindings').LocalBackup>}
 */
export async function * writeCar (source) {
  for await (const c of source) {
    const fileName = `${c.origin}-${c.uploadId}-${c.sourceCid}.car`
    const filePath = path.join(os.tmpdir(), fileName)
    log(`writing CAR to ${filePath}`)
    await fs.promises.writeFile(filePath, c.content)
    yield { ...c, filePath }
  }
}
