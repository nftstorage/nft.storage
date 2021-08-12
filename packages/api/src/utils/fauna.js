import { GraphQLClient, getSdk } from '@nftstorage/db'
import { secrets } from '../constants.js'

const FAUNA_URL = 'https://graphql.fauna.com/graphql'
const FAUNA_KEY = secrets.fauna

/**
 * Build admin fauna sdk
 */
export function buildSdk() {
  const client = new GraphQLClient(FAUNA_URL, {
    fetch: globalThis.fetch,
    headers: {
      Authorization: `Bearer ${FAUNA_KEY}`,
    },
  })
  const sdk = getSdk(client)
  return sdk
}

/**
 * Login and get a new sdk for the user
 * @param {string} id
 * @returns
 */
export async function login(id) {
  const sdk = buildSdk()
  const { login: loginOutput } = await sdk.login({
    id,
  })
  const authClient = new GraphQLClient(FAUNA_URL, {
    fetch: globalThis.fetch,
    headers: {
      Authorization: `Bearer ${loginOutput.secret}`,
    },
  })
  return { sdk: getSdk(authClient), loginOutput }
}
