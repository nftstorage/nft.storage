// @ts-ignore
const Hash = require('ipfs-only-hash')

/**
 * https://github.com/sinedied/smoke#javascript-mocks
 * @typedef {{ buffer: Buffer, originalname: string }} MultrFile
 * @param {{ query: Record<string, string>, files: MultrFile[] }} request
 */
module.exports = async ({ query, files }) => {
  const result = {
    cid: {
      '/': await Hash.of(files[0].buffer, { cidVersion: 1, rawLeaves: true }),
    },
    name: files[0].originalname,
    size: files[0].buffer.length,
  }
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: query['stream-channels'] === 'false' ? [result] : result,
  }
}
