import { checkIsBinRange, dateInSeconds, isDate } from '../../src/dates'

test('Detects Date Correctly', () => {
  const check = isDate('2020-2-1')
  expect(check).toBe(true)
})

test('Detects Bin Range', () => {
  const check = checkIsBinRange('2021-1-2', '2021-2-2')
  expect(check).toBe(true)
})

test('Convert Date To seconds', () => {
  const toSeconds = dateInSeconds('2021-1-1')
  const asSeconds = 1609480800
  expect(toSeconds).toBe(asSeconds)
})
