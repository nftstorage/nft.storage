import dotenv from 'dotenv'
import yargs from 'yargs'

/**
 * @typedef {import('./migration').Config} Config
 * @returns {Promise<Config>} config
 */
export default async () => {
  dotenv.config()
  const config = await yargs(process.argv.slice(2))
    .boolean('overwrite')
    .options({
      secret: {
        default: process.env['FAUNA_KEY'],
        description: 'Fauna DB access token',
        demandOption: true,
      },
    })
    .parse()

  if (!config.secret) {
    throw new Error(`⛔️ Task requires FAUNA_KEY env variable.
For local development you can use .env file in the repo root with content like:

FAUNA_KEY=fn...nw

Use an actual key obtained from https://dashboard.fauna.com/
`)
  } else {
    return config
  }
}
