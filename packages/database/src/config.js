import dotenv from 'dotenv'
import yargs from 'yargs'

/**
 * @typedef {import('./migration').Config} Config
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
      size: {
        type: 'number',
        default: parseInt(process.env['BATCH_SIZE'] || '100'),
        description: 'Number of items to process at once',
      },
      cursor: {
        default: process.env['CURSOR'],
        description: 'Cursor to use in the db',
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
