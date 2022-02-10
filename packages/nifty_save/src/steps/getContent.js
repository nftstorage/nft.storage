import { putOnProcessorBus } from './utils'

export async function getContent(event) {
  const msg = event.detail
  putOnProcessorBus('getContent', msg)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: getContent' + msg,
    }),
  }
}
