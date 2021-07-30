import {
  GraphQLClient,
  ClientError,
  request,
  gql,
  rawRequest,
} from 'graphql-request'
import { getSdk } from './gen/sdk.js'

/**
 * @typedef {import("./gen/sdk").CreatePin} CreatePin
 * @typedef {import("./gen/sdk").Pin} Pin
 * @typedef {import("./gen/sdk").CreateLocationsInput} CreateLocationsInput
 */

export { GraphQLClient, ClientError, request, rawRequest, gql, getSdk }
