import { describe, it } from '@jest/globals'
import assert from 'assert'
import toBuffer from 'it-to-buffer'
import { RandomBytes, RandomImage } from './random.js'
import { getMimeType } from 'stream-mime-type'
import { Readable } from 'node:stream'

describe('RandomBytes', () => {
  it('has a test', async () => {
    const tenMegabytesByteCount = 10 * 1e6
    const randomness = RandomBytes(tenMegabytesByteCount)
    const randomnessBuffered = await toBuffer(randomness)
    assert.equal(randomnessBuffered.length, tenMegabytesByteCount)
  })
})

describe('RandomImage', () => {
  it('creates bytes corresponding to random image with minBytesSize', async () => {
    const minMb = [1, 4, 10]
    await Promise.all(
      minMb.map(async (minMbSize) => {
        const minBytesSize = minMbSize * 1e6
        const imageBytesAsync = RandomImage({ bytes: { min: minBytesSize } })
        const imageBytesAsyncReadable = Readable.from(imageBytesAsync)
        const { mime, stream } = await getMimeType(imageBytesAsyncReadable)
        assert.equal(
          mime.startsWith('image/'),
          true,
          'mimetype startsWith image/'
        )
        const imageBytes = await toBuffer(Readable.from(stream))
        // console.log('imageBytes', { target: minBytesSize, actual: imageBytes.length });
        assert.ok(
          imageBytes.length >= minBytesSize,
          'expected image byte length to be greater than minBytesSize'
        )
        // make sure not too big
        assert.ok(
          imageBytes.length <= 2 * minBytesSize,
          'expected image byte length to be less than double the minimum'
        )
      })
    )
  })
})
