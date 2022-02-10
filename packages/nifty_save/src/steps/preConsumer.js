import { putOnProcessorBus } from './utils'

export async function preConsumer(event) {
  const busEvents = event.Records.map((x) => JSON.parse(x.body)).map((record) =>
    putOnProcessorBus('consume_from_preprocessor_queue', record)
  )

  try {
    await Promise.all(busEvents)
  } catch (err) {
    return {
      statusCode: 500,
      message: `Error: ${err}`,
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        'step(consume_from_preprocessor_queue): added ' + busEvents.length,
    }),
  }
}
