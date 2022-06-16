import { test } from './testing.js'
import toBuffer from 'it-to-buffer'
import { createRandomBytes, createRandomImage } from './random.js'
import { getMimeType } from 'stream-mime-type'
import { Readable } from 'node:stream'

test('RandomBytes has a test', async (t) => {
  const tenMegabytesByteCount = 10 * 1e6
  const randomness = createRandomBytes(tenMegabytesByteCount)
  const randomnessBuffered = await toBuffer(randomness)
  t.is(randomnessBuffered.length, tenMegabytesByteCount)
})

test('RandomImage creates bytes corresponding to random image with minBytesSize', async (t) => {
  const minMb = [1, 4, 10]
  await Promise.all(
    minMb.map(async (minMbSize) => {
      const minBytesSize = minMbSize * 1e6
      const imageBytesAsync = createRandomImage({
        bytes: { min: minBytesSize },
      })
      const imageBytesAsyncReadable = Readable.from(imageBytesAsync)
      const { mime, stream } = await getMimeType(imageBytesAsyncReadable)
      t.is(mime.startsWith('image/'), true, 'mimetype startsWith image/')
      const imageBytes = await toBuffer(Readable.from(stream))
      t.assert(
        imageBytes.length >= minBytesSize,
        'expected image byte length to be greater than minBytesSize'
      )
      // make sure not too big
      t.assert(
        imageBytes.length <= 2 * minBytesSize,
        'expected image byte length to be less than double the minimum'
      )
    })
  )
})
