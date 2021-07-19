import { GraphQLClient } from 'graphql-request'
import { getSdk } from './dist/sdk.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    Authorization: `Bearer ${process.env.FGU_SECRET}`,
  },
})

const sdk = getSdk(client)

async function main() {
  // sdk
  //   .createUpload({
  //     input: {
  //       cid: 'sddd',
  //       dagSize: 3333,
  //       type: 'Blob',
  //     },
  //   })
  //   .then(({ createUpload }) => {
  //     console.log(createUpload)
  //   })
  sdk
    .createOrUpdateUser({
      input: {
        issuer: 'did:ethr:0x4fBf468C3bAAD03828494fc293A65eD52883ae57',
        name: 'Hugo Dias',
        publicAddress: '0x4fBf468C3bAAD03828494fc293A65eD52883ae57',
        email: 'mail@hugodias.me',
      },
    })
    .then(({ createUser }) => {
      console.log(createUser)
    })
    .catch((err) => console.log(err))
}

main()
