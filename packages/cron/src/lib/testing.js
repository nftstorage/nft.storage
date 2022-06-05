import { it } from '@jest/globals'

export { it, describe, jest } from '@jest/globals'

/**
 * Conditionally run/skip a test
 * @param {() => boolean} condition
 * @returns function like 'it' but may invoke it.skip if conditional is falsy
 * @see https://github.com/facebook/jest/issues/7245
 */
export function testIf(condition) {
  /**
   * @param {string} name
   * @param {() => Promise<unknown>} doTest
   */
  return function (name, doTest) {
    const conditionValue = condition()
    const testFn = async () => {
      await doTest()
    }
    if (conditionValue) {
      it(name, testFn)
    } else {
      it.skip(name, testFn)
    }
  }
}

/**
 * Whether to run tests that will use the network, e.g. to request nft.storage directly (without mocks)
 */
export const testsCanUseNetwork = () => Boolean(process.env.ALLOW_NETWORK_TESTS)
