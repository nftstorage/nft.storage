/**
 * @param {AsyncIterable<import('./bindings').BackupContent} source
 * @returns {AsyncIterableIterator<import('./bindings').LocalBackup>}
 */
export async function* writeCar(source) {
  for await (const c of source) {
    const filePath = await writeOne(c)
    yield { ...c, filePath }
  }
}

async function writeOne({ sourceCid, userId, uploadId, origin }) {}
