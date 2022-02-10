import { putOnProcessorBus } from './utils'

export async function getMetaData(event) {
  const msg = event.detail
  putOnProcessorBus('getMetaData', msg)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Get MetaData' + msg,
    }),
  }
}
