import { activate, deactivate } from './mock-server.js'
import { init, handle } from './service.js'
import { spawn } from 'child_process'

const main = async () => {
  const [, , command, ...args] = process.argv
  const AUTH_TOKEN = Math.random().toString(32).slice(2)

  const service = await activate(init(AUTH_TOKEN), handle)

  console.log(`Mock service running on: ${service.url}`)

  const test = spawn(`${command}`, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      AUTH_TOKEN,
      SERVICE_ENDPOINT: `${service.url}`,
    },
  })

  const code = await new Promise((resolve) =>
    test.once('exit', (code) => resolve(code))
  )

  deactivate(service)
  process.exit(code)
}

main()
