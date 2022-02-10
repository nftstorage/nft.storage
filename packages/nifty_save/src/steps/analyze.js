import { putOnProcessorBus } from './utils'

export async function analyze(event) {
  const data = event.detail
  putOnProcessorBus('analyze', data)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Analyze' + data,
    }),
  }
}
