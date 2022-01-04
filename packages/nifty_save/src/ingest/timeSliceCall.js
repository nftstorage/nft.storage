import { sleep } from '../timers'

export async function timeSliceCall(event) {
  const foo = event.detail

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'slice after: ' + foo.index,
    }),
  }
}
