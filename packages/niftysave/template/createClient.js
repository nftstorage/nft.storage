// @ts-nocheck
import * as GraphQLClient from 'graphql-typed-client'
import fetch from '@web-std/fetch'
import { readFileSync } from 'fs'

export const createClient = (options) => {
  const typeMap = JSON.parse(
    readFileSync(new URL('./typeMap.json', import.meta.url))
  )
  const { Query: queryRoot, Mutation: mutationRoot } =
    GraphQLClient.linkTypeMap(typeMap)

  return GraphQLClient.createClient({
    ...options,
    queryRoot,
    mutationRoot,
  })
}
