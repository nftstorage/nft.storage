import { GraphQLClient, getSdk } from '@nftstorage/db'
import { secrets } from '../constants'

const FAUNA_KEY = secrets.fauna
export function buildSdk() {
  const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
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
  const authClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
    fetch: globalThis.fetch,
    headers: {
      Authorization: `Bearer ${loginOutput.secret}`,
    },
  })
  return { sdk: getSdk(authClient), loginOutput }
}
