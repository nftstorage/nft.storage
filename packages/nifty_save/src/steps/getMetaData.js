import { detectTokenURIFormat, tokenUriToJSON } from '../analyzer/metadata'

import { putOnProcessorBus } from './utils'

export async function getMetaData(event) {
  const data = event.detail

  try {
    const tokenUriFormat = await detectTokenURIFormat(data?.token_uri)
    const tokenUriMetadata = await tokenUriToJSON(data?.token_uri)

    const _decoratedData = {
      ...data,
      tokenUriFormat,
      tokenUriMetadata,
    }

    console.log(JSON.stringify(_decoratedData, null, 2))

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
