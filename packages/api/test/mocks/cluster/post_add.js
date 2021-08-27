// @ts-ignore not typed
const { importer } = require('ipfs-unixfs-importer')
const block = {
  get: async (/** @type {any} */ cid) => {
    throw new Error(`unexpected block API get for ${cid}`)
  },
  put: async () => {},
}
/**
 * @param {MultrFile[]} content
 * @param {import('ipfs-unixfs-importer').UserImporterOptions} options
 */
async function add(content, options) {
  const opts = { ...options }
  const source = content.map((c) => ({
    content: c.buffer,
    path: c.originalname,
  }))

  const out = []
  // @ts-ignore
  for await (const unixfs of importer(source, block, opts)) {
    out.push({
      name: unixfs.path,
      cid: {
        '/': unixfs.cid.toString(),
      },
      size: unixfs.size,
    })
  }

  return out
}

/**
 * https://github.com/sinedied/smoke#javascript-mocks
 * @typedef {{ buffer: Buffer, originalname: string }} MultrFile
 * @param {{ query: Record<string, string>, files: MultrFile[] }} request
 */
module.exports = async ({ query, files }) => {
  const body = await add(files, {
    cidVersion: 1,
    rawLeaves: true,
    onlyHash: true,
    wrapWithDirectory: query['wrap-with-directory'] === 'true',
  })

  try {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body,
    }
  } catch (err) {
    console.log(err)
  }
}
