import { startServiceContainers } from '../../scripts/containers.js'

/**
 * AVA plugin to allow all test workers to share the same containers.
 *
 * @param {{negotiateProtocol: Function}} opts
 */
const avaPlugin = async ({ negotiateProtocol }) => {
  const main = negotiateProtocol(['ava-4'])

  const { overrides } = await startServiceContainers()
  main.ready()

  // when a new test worker starts, send them the env vars they
  // need to connect to the dockerized services
  for await (const _testWorker of main.testWorkers()) {
    main.broadcast({ overrides })
  }
}

export default avaPlugin
