const services = new WeakMap()

/**
 * @template {Object} Config
 * @template Service
 * @param {(config:Config) => Service} start
 * @returns {(config: Config) => Service}
 */
export const create = (start) => (config) => {
  const service = services.get(config)
  if (service) {
    return service
  } else {
    const service = start(config)
    services.set(config, service)
    return service
  }
}
