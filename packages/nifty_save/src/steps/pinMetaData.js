import { putOnProcessorBus } from './utils'

export async function pinMetaData(event) {
  const msg = event.detail
  putOnProcessorBus('pinMetaData', msg)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: pinMetaData' + msg,
    }),
  }
}
