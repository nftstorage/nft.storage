const dotenv = require('dotenv')
dotenv.config()

module.exports = async (query, fetch) => {
  const response = await fetch('https://graphql.fauna.com/graphql', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${process.env['FAUNA_KEY']}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  return await response.json()
}
