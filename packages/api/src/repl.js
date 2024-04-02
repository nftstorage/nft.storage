import { JSONResponse } from './utils/json-response.js'
import { HTTPError } from './errors.js'

/** @type {import('./bindings').Handler} */
export const repl = async (event, ctx) => {
  const { w3up } = ctx

  if (w3up) {
    const blob = await event.request.blob()
    if (blob.size === 0) {
      throw new HTTPError('empty payload', 400)
    }

    const car = await w3up.capability.store.add(blob)

    console.log('UPLOADED CAR')

    return new JSONResponse({ ok: true, value: car })
  } else {
    throw new HTTPError(`No w3up client`, 500)
  }
}
