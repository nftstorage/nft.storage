import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs/promises'
import childProcess from 'child_process'
import toml from 'toml'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ENV_PATH = path.join(__dirname, '..', '..', '..', '.env')
const API_DIR = path.join(__dirname, '..', '..', 'api')

const REQUIRED_VARS = [
  {
    name: 'CF_ACCOUNT_ID',
    desc:
      'CloudFlare account id. Get from `wrangler whoami` after logging in with `wrangler login`',
  },
  {
    name: 'CF_TOKEN',
    desc:
      'CloudFlare API token. Go to https://dash.cloudflare.com/profile/api-tokens and use CF Workers template.',
  },
  {
    name: 'DATABASE_URL',
    desc: 'URL of postgrest DB api for local development.',
    defaultValue: `https://${process.env.DEV_USERNAME ||
      process.env.USER}-postgrest-nft-storage.loca.lt`,
  },
  {
    name: 'DATABASE_CONNECTION',
    desc: 'Connection URI for local db.',
    defaultValue: 'postgresql://postgres:postgres@localhost:5432/postgres',
  },
  {
    name: 'DATABASE_TOKEN',
    desc:
      "Signed JWT for local db API. Use the default if you're using the devcontainer / docker-compose setup.",
    defaultValue:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicG9zdGdyZXMifQ.oM0SXF31Vs1nfwCaDxjlczE237KcNKhTpKEYxMX-jEU',
  },
  {
    name: 'PINATA_JWT',
    desc:
      'Pinata API token. Go to  https://app.pinata.cloud/keys and make a key with all Pinning API permissions.',
  },
  {
    name: 'DAG_CARGO_HOST',
    desc:
      'hostname / ip for dag-cargo database (read-only replica). Get from team 1Password if working on PL-managed instance.',
  },
  {
    name: 'DAG_CARGO_DATABASE',
    desc:
      'hostname / ip for dag-cargo database (read-only replica). Get from team 1Password if working on PL-managed instance.',
  },
  {
    name: 'DAG_CARGO_USER',
    desc:
      'username for dag-cargo database (read-only replica). Get from team 1Password if working on PL-managed instance.',
  },
  {
    name: 'DAG_CARGO_PASSWORD',
    desc:
      'password for dag-cargo database (read-only replica). Get from team 1Password if working on PL-managed instance.',
  },
]

const REQUIRED_WRANGLER_SECRETS = [
  {
    name: 'DATABASE_TOKEN',
    desc:
      "Signed JWT for local db API. Use the default if you're using the devcontainer / docker-compose setup.",
    defaultValue:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicG9zdGdyZXMifQ.oM0SXF31Vs1nfwCaDxjlczE237KcNKhTpKEYxMX-jEU',
  },
  {
    name: 'MAGIC_SECRET_KEY',
    desc:
      'Secret API key for magic.link. Sign up for an account at https://magic.link and make a new project, then use the secret key.',
  },
  {
    name: 'PINATA_JWT',
    desc:
      'Pinata API token. Go to  https://app.pinata.cloud/keys and make a key with all Pinning API permissions.',
  },
  {
    name: 'SALT',
    desc: 'Random salt. See packages/api/README.md',
  },
  {
    name: 'SENTRY_DSN',
    desc:
      'Sentry DSN. Sign up for an account at https://sentry.io, make a new app, and copy the DSN.',
  },
]

class LocalEnv {
  static async lint() {
    const envOk = await this.lintEnvFile()
    let wranglerOk = true
    let loggedIn = await this.checkWranglerIsAuthenticated()
    if (!loggedIn) {
      loggedIn = await this.tryWranglerLogin()
    }

    if (loggedIn) {
      wranglerOk = await this.checkWranglerToml()
    } else {
      console.warn(
        'cloudflare wrangler not authenticated. skipping validation of wrangler config.'
      )
    }

    if (envOk && wranglerOk) {
      console.log('Everything looks okay!')
      console.log(
        'If this is a new dev env, run the following to setup the db:'
      )
      console.log('node ./packages/api/scripts/cli.js db-sql --cargo --testing')
    } else {
      console.error(
        'Your config seems to have errors. Please address the issues printed above and try again'
      )
    }
  }

  static async checkWranglerIsAuthenticated() {
    console.log('verifying that wrangler is authenticated...')
    try {
      childProcess.execSync('wrangler whoami')
      return true
    } catch (e) {
      // console.error('error running "wrangler whoami": ', e.stderr.toString())
      return false
    }
  }

  static async tryWranglerLogin() {
    const env = await this.loadEnvFile()
    if (!env.CF_TOKEN) {
      return false
    }
    console.log('trying to authenticate wrangler using CF_TOKEN value...')
    try {
      childProcess.execSync('wrangler config', { input: env.CF_TOKEN + '\n' })
    } catch (e) {
      console.error(`error running 'wrangler config': ${e}`)
      return false
    }
    return true
  }

  static getDevUsername() {
    // DEV_USERNAME is set when running in a devcontainer, based on the value of $USER at
    // the time the dev container was built. If you're running outside the container,
    // we just use USER instead.
    const user = process.env.DEV_USERNAME || process.env.USER
    if (!user) {
      throw new Error(
        'Unable to determine username. Set DEV_USERNAME or USER env variables.'
      )
    }
    return user
  }

  static async checkWranglerToml() {
    const tomlPath = path.join(API_DIR, 'wrangler.toml')
    const content = await fs.readFile(tomlPath, { encoding: 'utf-8' })
    const cfg = toml.parse(content)
    const user = this.getDevUsername()
    if (!cfg.env[user]) {
      console.error(`missing wrangler configuration for your username ${user}`)
      console.error(
        `add a section to packages/api/wrangler.toml named [env.${user}]`
      )
      console.error('see packages/api/README.md for details')
      return false
    }

    return this.checkWranglerSecrets()
  }

  static checkWranglerSecrets() {
    console.log('checking that all required wrangler secrets are present...')
    const cwd = process.cwd()
    let ok = true
    try {
      process.chdir(API_DIR)
      const user = this.getDevUsername()
      const s = childProcess.execSync(`wrangler secret list --env ${user}`)
      const secrets = JSON.parse(s)
      const secretNames = new Set(secrets.map(s => s.name))
      for (const { name, desc, defaultValue } of REQUIRED_WRANGLER_SECRETS) {
        if (secretNames.has(name)) {
          continue
        }
        console.error(`missing wrangler secret ${name}: ${desc}`)
        console.error(`make sure you're in packages/api, then run:`)
        console.error(`wrangler secret put ${name} --env ${user}`)
        if (defaultValue) {
          console.error('default value for local dev: ' + defaultValue)
        }
        ok = false
      }
    } finally {
      process.chdir(cwd)
    }
    return ok
  }

  static async loadEnvFile(envFilePath = ENV_PATH) {
    const content = await fs.readFile(envFilePath, { encoding: 'utf-8' })
    return dotenv.parse(content)
  }

  /**
   * Checks the .env file in the repo root to see if it looks like it'll work
   * for local development.
   *
   * @returns false if the env has issues, true if everything looks okay
   */
  static async lintEnvFile(envFilePath = ENV_PATH) {
    let env
    try {
      env = await this.loadEnvFile(envFilePath)
    } catch (e) {
      console.error(`error reading .env file from repo root: ${e}`)
      return false
    }

    const errors = []
    for (const { name, desc, defaultValue } of REQUIRED_VARS) {
      if (env[name]) {
        // todo: maybe validate the values? for now just assume they're fine if they exist
        continue
      }
      let msg = `missing required environment variable ${name}: ${desc}`
      if (defaultValue) {
        msg += '\ndefault for local dev:'
        msg += `\n${name}=${defaultValue}`
      }
      errors.push(msg)
    }

    if (errors.length > 0) {
      console.error(`Your local .env file has some issues:`)
      for (const e of errors) {
        console.error(e)
      }
      return false
    }
    return true
  }
}

export default LocalEnv
