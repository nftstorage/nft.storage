// @ts-nocheck
import * as GraphQLClient from 'graphql-typed-client'
import fetch from '@web-std/fetch'
import { readFileSync } from 'fs'

export const createClient = options => {
  const typeMap = JSON.parse(
    readFileSync(new URL('./typeMap.json', import.meta.url))
  )
  const linkedMap = GraphQLClient.linkTypeMap(typeMap)

  return GraphQLClient.createClient({
    ...options,
    queryRoot: linkedMap.Query || linkedMap.query_root,
    mutationRoot: linkedMap.Mutation || linkedMap.mutation_root,
    subscriptionRoot: linkedMap.Subscription || linkedMap.subscription_root,
  })
}
