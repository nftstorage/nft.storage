import { JSONResponse } from './utils/json-response.js'
/** @type {import('./bindings').Handler} */
export const repl = async (event, ctx) => {
  const { w3up } = ctx
  const { headers } = event.request
  const blob = await event.request.blob()
  if (blob.size === 0) {
    throw new HTTPError('empty payload', 400)
  }

  const result = await w3up.uploadCAR(blob, {
    onShardStored: ({ cid }) => {
      console.log(`SHARD ${cid}`)
    },
    // @ts-expect-error TODO adjust upstream type
    pieceHasher: null,
  })
  console.log('UPLOADED CAR')

  return new JSONResponse({ ok: true, value: result })
}
