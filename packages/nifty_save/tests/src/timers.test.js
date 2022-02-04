import { sleep } from './timers'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')
test('Sleep Timers work', async () => {
  sleep(100)
  expect(setTimeout).toHaveBeenCalledTimes(1)
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100)
})
