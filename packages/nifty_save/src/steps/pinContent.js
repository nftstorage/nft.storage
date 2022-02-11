import { putOnProcessorBus } from './utils'

async function doPinContent(data) {
  // TODO
  return true
}

export async function pinContent(event) {
  const data = event.detail

  if (doPinContent(data)) {
    putOnProcessorBus('pinContent', data)
  } else {
    putOnProcessorBus('failure', data)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: pinContent' + data,
    }),
  }
}
