// import { sleep } from '../timers'

export async function ingestTimeSlice(event) {
  //   const sleepTime = Math.floor(Math.random() * 5000) + 10000
  //   await sleep(sleepTime)
  //   console.log(JSON.stringify(event.detail))
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'YOYO DOING IT',
      //       message: `Child Lambda called ${sleepTime}`,
    }),
  }
}
