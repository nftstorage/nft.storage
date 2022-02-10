import { putOnProcessorBus } from './utils'

export async function pinContent(event) {
  const msg = event.detail
  putOnProcessorBus('pinContent', msg)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: pinContent' + msg,
    }),
  }
}
