import { spawn } from "child_process"

const main = async () => {
  const { ready } = await import("./serve.js")
  await ready

  const test = spawn("playwright-test", ["test/*.spec.js"], {
    stdio: "inherit",
  })

  const code = await new Promise(resolve =>
    test.once("exit", code => resolve(code))
  )

  process.exit(code)
}

main()
