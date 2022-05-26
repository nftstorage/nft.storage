import { measureNftTimeToRetrievability } from './measureNftTimeToRetrievability.js'
import { jest } from '@jest/globals'

describe('measureNftTimeToRetrievability', () => {
  jest.setTimeout(15 * 1000)
  it('has a test', async () => {
    await measureNftTimeToRetrievability()
    console.log('after measureNftTimeToRetrievability()')
  })
})
