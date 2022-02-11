import { putOnProcessorBus } from './utils'

async function doGetMetaData(data) {
  // TODO
  return true
}

export async function getMetaData(event) {
  const data = event.detail

  if (doGetMetaData(data)) {
    putOnProcessorBus('getMetaData', data)
  } else {
    putOnProcessorBus('failure', data)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Get MetaData' + data,
    }),
  }
}
