/** @type {import("../types").Hash} **/
const CONSTANTS = {
  test: {
    url: process.env.TEST_DATABASE_URL,
    token: process.env.DATABASE_TOKEN,
    connection: process.env.TEST_DATABASE_CONNECTION,
  },
  staging: {
    url: process.env.STAGING_DATABASE_URL,
    token: process.env.STAGING_DATABASE_TOKEN,
  },
  production: {
    url: process.env.PROD_DATABASE_URL,
    token: process.env.PROD_DATABASE_TOKEN,
  },
  dev: {
    url: process.env.DATABASE_URL,
    token: process.env.DATABASE_TOKEN,
    connection: process.env.DATABASE_CONNECTION,
  },
}

/**
 *
 * getConstants can take the process.env and returns env specific constants
 * @param {string | undefined} env
 */
export function getConstants(env) {
  return env ? CONSTANTS[env] : CONSTANTS.dev
}
