import { GraphQLClient, getSdk } from '@nftstorage/db'

/**
 * @param {string} token
 */
export function faunaGQL(token) {
  const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
    fetch: globalThis.fetch,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const sdk = getSdk(client)
  return sdk
}

/**
 * Login and get a new sdk for the user
 * @param {string} id
 * @param {string} token - Admin token
 * @returns
 */
export async function login(id, token) {
  const sdk = faunaGQL(token)
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
