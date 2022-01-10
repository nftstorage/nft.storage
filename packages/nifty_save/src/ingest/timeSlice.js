import AWS from 'aws-sdk'
import { sleep } from '../timers'
import { registry as sourcesRegistry } from './sources/registry'

const bus = new AWS.EventBridge()

function messageToEntry(msg) {
  console.log(msg)
  return {
    DetailType: 'Time Slice of NFTs To fetch, derived from a larger range',
    Detail: JSON.stringify(msg),
    Source: 'ingest.range_to_slices',
    EventBusName: process.env.busArn,
  }
}

export async function fanOut(event) {
  const actualMessages = event.Records.map(x => JSON.parse(x.body))

  const msg = `count ${event.Records.length} index ${actualMessages[0].index}`

  const entries = actualMessages.map(messageToEntry)
  await bus.putEvents({ Entries: entries }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'time slice fan out called ' + msg,
    }),
  }
}

//TODO: middy validate detail objects.
export async function execute(event, context) {
  const { detail } = event

  if (!sourcesRegistry[detail.source]) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: `${
          detail.source
        } did not exist in list of possible sources: [${Object.keys(
          sourcesRegistry
        ).join(' | ')}]`,
      }),
    }
  }

  const fetchNFTs = sourcesRegistry[detail.source]

  const nfts = await fetchNFTs(event, context)

  console.table(nfts)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'slice after: ' + detail.index,
    }),
  }
}
