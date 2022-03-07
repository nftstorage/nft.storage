import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../bindings').Handler} */
export const did = async (event, ctx) => {
  const { ucanService } = ctx

  return new JSONResponse({
    ok: true,
    value: ucanService.did(),
  })
}
