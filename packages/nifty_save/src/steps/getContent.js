import { putOnProcessorBus } from './utils'

async function doGetContent(data) {
  // TODO
  return true
}

export async function getContent(event) {
  const data = event.detail

  if (doGetContent(data)) {
    putOnProcessorBus('getContent', data)
  } else {
    putOnProcessorBus('failure', data)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: getContent' + data,
    }),
  }
}
