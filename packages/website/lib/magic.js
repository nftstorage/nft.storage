import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import constants from './constants'

/**
 * @typedef {import('@magic-sdk/provider').SDKBase} SDKBase
 * @typedef {import('@magic-sdk/provider').InstanceWithExtensions<SDKBase, OAuthExtension[]>} MagicSDKInstance
 * @typedef {import('magic-sdk').MagicUserMetadata} MagicUserMetadata
 */

const API = constants.API

/**
 * Singleton instance of Magic SDK object. Lazily initialized on first call to {@link getMagic} accessor function.
 * @type {MagicSDKInstance| null} */
let _magicInstance = null

const MAGIC_USER_TOKEN_LIFESPAN_SEC = 60 * 60 * 2 // 2 hours
/**
 * Cached magic.link id token from last successful login.
 * @type {string | undefined}
 */
let _magicUserToken
let _magicUserTokenCreationTime = 0

/**
 * Returns the Magic SDK instance, creating it on first use.
 * @returns {MagicSDKInstance}
 */
function getMagic() {
  if (_magicInstance) {
    return _magicInstance
  }
  _magicInstance = new Magic(constants.MAGIC_TOKEN, {
    extensions: [new OAuthExtension()],
  })

  return _magicInstance
}

export async function logoutMagicSession() {
  return getMagic().user.logout()
}

/**
 * Accessor function for magic.link ID token, which is returned immediately if
 * it's still within its expiry time. If the token is nearing expiration, a
 * new one is requested asynchronously.
 *
 * @returns {Promise<string>} the encoded magic.link token
 */
export async function getMagicUserToken() {
  const magic = getMagic()
  const now = Date.now() / 1000
  const elapsed = now - _magicUserTokenCreationTime
  const threshold = MAGIC_USER_TOKEN_LIFESPAN_SEC - 10
  if (_magicUserToken && elapsed < threshold) {
    return _magicUserToken
  }

  _magicUserToken = await magic.user.getIdToken({
    lifespan: MAGIC_USER_TOKEN_LIFESPAN_SEC,
  })
  _magicUserTokenCreationTime = Date.now() / 1000
  return _magicUserToken
}

/**
 * Login to the nft.storage service using an auth token.
 *
 * This function is called after the magic.link redirect has completed, and we have
 * a magic.link auth token.
 *
 * The `type` parameter should be set to `"magic"` if the token comes from the
 * email auth flow, and `"github"` if the token comes from the Github OAuth flow.
 *
 * @param {string} token the string-encoded auth token
 * @param {string} type which type of login token: 'magic' or 'github'
 * @param {object} data OAuth response data to include with request (github only)
 */
export async function login(token, type = 'magic', data = {}) {
  const res = await fetch(API + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      type,
      data,
    }),
  })
  const body = await res.json()

  if (body.ok) {
    return body.value
  } else {
    throw new Error(body.error.message)
  }
}

/**
 * Returns metadata for the current user, if they have a valid magic.link session.
 *
 * Returns undefined if the user is not logged in.
 * @returns {Promise<MagicUserMetadata | undefined>}
 */
export async function getMagicUserMetadata() {
  console.log(
    'getting user metadata from magic.link. magic.user:',
    getMagic().user
  )
  try {
    return await getMagic().user.getMetadata()
  } catch {
    // do nothing
  }
}

/**
 * Login with email.
 *
 * Triggers an auth request to magic.link that will send an email to the given address.
 *
 * Will redirect to the `/callback` route, which calls through to {@link redirectMagic} to
 * complete the login flow if the magic.link login was successful.
 *
 * @param {string} email
 */
export async function loginEmail(email) {
  const didToken = await getMagic().auth.loginWithMagicLink({
    email: email,
    redirectURI: new URL('/callback', window.location.origin).href,
  })

  if (didToken) {
    const data = await login(didToken, 'email')
    return data
  }

  throw new Error('Login failed.')
}

/**
 * Login with social (github).
 *
 * Triggers an OAuth request using the magic.link OAuth provider.
 *
 * Will redirect to the `/callback` route, which calls through to {@link redirectSocial}
 * to complete the login flow if the OAuth login was successful.
 *
 * @param {import('@magic-ext/oauth').OAuthProvider} provider
 */
export async function loginSocial(provider) {
  await getMagic().oauth.loginWithRedirect({
    provider,
    redirectURI: new URL('/callback', window.location.origin).href,
  })
}

/**
 * Redirect handler for magic.link email logins.
 *
 * Invoked when the `/callback` route is triggered with a magic.link credential derived from an email login.
 *
 * Calls through to {@link login} to correlate magic link user id with our db & complete the auth flow.
 *
 * Will log out of magic.link session if errors occur during {@link login} process.
 *
 */
export async function redirectMagic() {
  const idToken = await getMagic().auth.loginWithCredential()
  if (idToken) {
    try {
      const data = await login(idToken, 'email')
      return { ...data, idToken }
    } catch (err) {
      await logoutMagicSession()
      throw err
    }
  }

  throw new Error('Login failed.')
}

/**
 * Redirect handler for github OAuth logins.
 *
 * Invoked when the `/callback` route is triggered with an OAuth token from GitHub.
 *
 * Calls through to {@link login} to correlate magic link user id with our db & complete the auth flow.
 *
 * Will log out of magic.link session if errors occur during {@link login} process.
 */
export async function redirectSocial() {
  const result = await getMagic().oauth.getRedirectResult()
  try {
    const data = await login(result.magic.idToken, 'github', result)
    return { ...data, idToken: result.magic.idToken }
  } catch (err) {
    await logoutMagicSession()
    throw err
  }
}
