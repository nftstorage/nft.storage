import test from 'ava'
import { Miniflare } from 'miniflare'

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  const mf = new Miniflare({
    // Autoload configuration from `.env`, `package.json` and `wrangler.toml`
    envPath: true,
    packagePath: true,
    wranglerConfigPath: true,
    // We don't want to rebuild our worker for each test, we're already doing
    // it once before we run all tests in package.json, so disable it here.
    // This will override the option in wrangler.toml.
    buildCommand: undefined,
    wranglerConfigEnv: 'test',
  })

  t.context = {
    mf,
  }
})

test('Fails when invalid cid is provided', async (t) => {
  const { mf } = t.context

  const invalidCid = 'bafy'
  const response = await mf.dispatchFetch(
    `https://${invalidCid}.ipfs.localhost:8787`
  )
  t.is(response.status, 400)

  const textResponse = await response.text()
  t.is(textResponse, `invalid ipfs path: invalid path "/ipfs/${invalidCid}/"`)
})

test('Gets content', async (t) => {
  const { mf } = t.context

  const response = await mf.dispatchFetch(
    'https://bafkreidchi5c4c3kwr5rpkvvwnjz3lh44xi2y2lnbldehwmpplgynigidm.ipfs.localhost:8787'
  )
  t.is(await response.text(), 'Hello gateway.nft.storage!')
})

test('Gets content with path', async (t) => {
  const { mf } = t.context

  const response = await mf.dispatchFetch(
    'https://bafkreidchi5c4c3kwr5rpkvvwnjz3lh44xi2y2lnbldehwmpplgynigidm.ipfs.localhost:8787/path'
  )
  t.is(await response.text(), 'Hello gateway.nft.storage resource!')
})
