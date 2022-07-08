import avaTest from 'ava'
import { Console } from 'console'
import { Writable } from 'stream'

export const test = avaTest

/**
 * Create a Console instance to use with tests. It's silent by default so test output is pretty.
 * @returns {Console}
 */
export const createTestConsole = () => {
  const silentConsole = new Console(new Writable())
  return silentConsole
}
