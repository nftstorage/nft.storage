# Miniflare test worker

This directory contains test helper code that's bundled into a separate worker and mounted using Miniflare. This lets us avoid putting a bunch of platform conditionals in the test codebase for things that differ between the CF Worker environment and standard nodejs.

For example, we can write code that assumes `fetch`, `Response`, `crypto.subtle`, etc are in scope without needing another layer of polyfills in addition to Miniflare.

The worker is mounted during test setup (see [test-context.js](../scripts/test-context.js)) and exposes a handler at the internal domain `test.mf`. The `test.mf` domain is routable using Miniflare's `dispatchFetch`, so in your test code, you can do something like:

```js
const mf = getMiniflareContext(t) // pulls Miniflare instance out of test context, see test-context.js
const res = await mf.dispatchFetch('http://test.mf/create-user')
t.true(res.ok)
const user = await res.json()
```

## What should go in here?

There are currenlty two places for test helper code - this worker, and [../scripts/helpers.js](../scripts/helpers.js) which runs in
the standard node runtime (outside of Miniflare).

Anything that uses Web platform APIs (e.g. `fetch` and friends, WebCrypto) should live in here and expose an API endpoint.

To make it easier to use helpers from the test worker in tests, you can define wrapper functions in [../scripts/helpers.js](../scripts/helpers.js) that use Miniflare to call the test helper endpoint and unpack the result.

## API

The worker exposes a pretty simple API - handlers are defined in [src/index.js](./src/index.js) and dispatched based on the URL path.

To send a request, use the Miniflare instance from the test context and call `dispatchFetch`, with a base url of `http://test.mf`:

```js
const mf = getMiniflareContext(t) // pulls Miniflare instance out of test context, see test-context.js
const res = await mf.dispatchFetch('http://test.mf/create-user')
t.true(res.ok)
const user = await res.json()
```

Everything accepts and returns JSON. Errors will have an `error` object, with `error.message` hopefully containing some relevant clues.

### /create-user

Create a test user. Accepts optional JSON object body with the following shape:

```typescript
type createUserInput = {
  publicAddress?: string
  issuer?: string
  name?: string
  token?: string // API token secret value. if not provided, a valid JWT will be generated and signed
}
```

### /sign-jwt

Sign a JWT token using the salt from the current service config (should always be 'secret' in test scope).

Accepts a JSON object:

```typescript
type signJwtInput = {
  payload: any // but you probably want a valid JWT payload object
  secret: string
}
```
