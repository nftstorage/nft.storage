import { putOnProcessorBus } from './utils'

async function doPinMetaData(data) {
  // TODO
  return true
}

export async function pinMetaData(event) {
  const data = event.detail

  if (doPinMetaData(data)) {
    putOnProcessorBus('pinMetaData', data)
  } else {
    putOnProcessorBus('failure', data)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: pinMetaData' + data,
    }),
  }
}
