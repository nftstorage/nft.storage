import { activate } from "./mock-server.js"
import { init, handle } from "./service.js"

const main = async () => {
  const AUTH_TOKEN = Math.random().toString(32).slice(2)

  const service = await activate(init(AUTH_TOKEN), handle)

  console.log(`Mock service running on: ${service.url}`)

  process.env["SERVICE_ENDPOINT"] = `${service.url}`
  process.env["AUTH_TOKEN"] = AUTH_TOKEN

  return service
}

export const ready = main()
