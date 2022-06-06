/**
 * @typedef {"debug"|"info"|"warn"} DefaultLogLevel
 */

/**
 * @template {string} LogLevel
 * @typedef {(level: LogLevel, ...loggables: unknown[]) => void} LogFunction
 */

/** @return {LogFunction<DefaultLogLevel>} */
export const createConsoleLog =
  () =>
  (level, ...loggables) => {
    switch (level) {
      case 'debug':
        console.debug(...loggables)
        break
      case 'info':
        console.info(...loggables)
        break
      case 'warn':
        console.warn(...loggables)
        break
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`unexpected log level ${level}`)
    }
  }

/**
 * @template {string} LogLevel
 * @param {LogFunction<LogLevel>} log;
 * @returns {LogFunction<LogLevel>}
 */
export const createJSONLogger = (log) => {
  return (level, ...loggables) => {
    const stringifiedLoggables = loggables.map((o) => JSON.stringify(o))
    return log(level, ...stringifiedLoggables)
  }
}

/**
 * @template {string} LogLevel
 * @returns {{log: LogFunction<LogLevel>, info: any[]}}
 */
export const recordedLog = () => {
  /** @type {any[]} */
  const info = []
  /** @type {LogFunction<LogLevel>} */
  const log = (level, ...loggables) => {
    if (level === 'info') {
      info.push(loggables)
    }
  }
  return { log, info }
}
