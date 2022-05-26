/**
 * @typedef {"debug"|"info"|"warn"} DefaultLogLevel
 */

/**
 * @template {string} [LogLevel=DefaultLogLevel]
 * @typedef {(level: LogLevel, ...loggables: any[]) => void} LogFunction
 */

/** @return {LogFunction<DefaultLogLevel>} */
export const ConsoleLog =
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
        throw new Error(`unexpected log level ${level}`)
    }
  }

/**
 * @param {LogFunction} log;
 * @returns {LogFunction}
 */
export const JSONLogger = (log) => {
  return (level, ...loggables) => {
    const stringifiedLoggables = loggables.map((o) => JSON.stringify(o))
    return log(level, ...stringifiedLoggables)
  }
}
