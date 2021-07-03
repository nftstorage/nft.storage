import { createClient } from './createClient.js'
import * as schema from './schema.js'

/**
 * @param {{url:URL, authorization?: string}} settings
 */
export default ({ authorization, url }) => ({
  source: createClient({
    async fetcher({ query, variables }) {
      const response = await fetch(url.href, {
        method: 'POST',
        headers: {
          ...(authorization && { authorization }),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      })

      return /** @type {import('graphql').ExecutionResult<any>} */ (
        await response.json()
      )
    },
  }),
  schema,
})
