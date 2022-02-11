import { putOnProcessorBus } from './utils'

async function doAnalyze(data) {
  // TODO
  return true
}

export async function analyze(event) {
  const data = event.detail

  if (doAnalyze(data)) {
    putOnProcessorBus('analyze', data)
  } else {
    putOnProcessorBus('failure', data)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Analyze' + data,
    }),
  }
}
