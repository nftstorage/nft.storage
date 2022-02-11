import { detectTokenURIFormat, tokenUriToJSON } from '../analyzer/metadata'

import { putOnProcessorBus } from './utils'

import {
  exampleRecord2,
  exampleRecord3,
  ex4,
} from '../../tests/fixtures/fetchedRecords'

export async function getMetaData(event) {
  //   const data = exampleRecord2;
  const data = event.detail

  try {
    const token_uri_format = await detectTokenURIFormat(data?.token_uri)
    const token_uri_metadata = await tokenUriToJSON(data?.token_uri)

    const _decoratedData = {
      ...data,
      token_uri_format,
      token_uri_metadata,
    }

    console.log(
      JSON.stringify({
        token_uri: data?.token_uri,
        token_uri_format,
        token_uri_metadata,
      })
    )

    putOnProcessorBus('getMetaData', _decoratedData)
  } catch (err) {
    console.log(err)
    const _nextData = {
      ...data,
      error: err,
    }
    putOnProcessorBus('failure', _nextData)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Get MetaData' + data,
    }),
  }
}
