import { Miniflare } from 'miniflare'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

export function makeMiniflare() {
  // Create a new Miniflare environment for each test
  return new Miniflare({
    // Autoload configuration from `.env`, `package.json` and `wrangler.toml`
    envPath: path.join(__dirname, 'test.env'),
    packagePath: true,
    wranglerConfigPath: true,
    // We don't want to rebuild our worker for each test, we're already doing
    // it once before we run all tests in package.json, so disable it here.
    // This will override the option in wrangler.toml.
    buildCommand: undefined,
  })
}

/**
 * @param {Record<string, string>} vars
 */
export const defineGlobals = (vars) => {
  /** @type Record<string, unknown> */
  const globals = globalThis
  for (const [k, v] of Object.entries(vars)) {
    globals[k] = v
  }
}

/**
 *
 * @param {import('ava').ExecutionContext<unknown>} t
 */
export async function setupMiniflareContext(t) {
  const mf = makeMiniflare()
  t.context = { mf }

  // pull cloudflare bindings into the global scope of the test runner
  const bindings = await mf.getBindings()
  defineGlobals(bindings)
}
