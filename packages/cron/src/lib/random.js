import { Blob } from '@web-std/fetch'
import toBuffer from 'it-to-buffer'
import { randomBytes } from 'node:crypto'
import { Readable } from 'node:stream'
import sharp from 'sharp'
import { getMimeType } from 'stream-mime-type'

export const bytesBitCount = 8

/**
 * Create random bytes of a certain bit size
 * @param {number} byteCount - number of bytes of randomness
 * @returns {Iterable<Uint8Array>}
 */
export function* createRandomBytes(byteCount) {
  const bytes = randomBytes(byteCount)
  yield bytes
}

/**
 * Create a stream of bytes corresponding to a random image
 * @param {object} options
 * @param {object} options.bytes;
 * @param {number} options.bytes.min;
 * @returns {AsyncIterable<Uint8Array>}
 */
export function createRandomImage(options) {
  return (async function* () {
    // 100x100 creates approx 11000 bytes
    const tileCount = options.bytes.min / 11000
    const sqrtTileCount = Math.sqrt(tileCount)
    /** @type {sharp.Create} */
    const create = {
      width: Math.round(100 * sqrtTileCount),
      height: Math.round(100 * sqrtTileCount),
      channels: 3,
      background: 'white',
      noise: {
        type: 'gaussian',
        mean: 128,
        sigma: 30,
      },
    }
    const image = await sharp({ create }).jpeg({ quality: 100 }).toBuffer()
    yield image
  })()
}

/**
 * @param {AsyncIterable<Uint8Array>} imageBytes
 * @returns {Promise<Blob>}
 */
export async function createRandomImageBlob(imageBytes) {
  const imageBytesReadable = Readable.from(imageBytes)
  const { mime, stream } = await getMimeType(imageBytesReadable)
  const allBytes = await toBuffer(Readable.from(stream))
  return new Blob([allBytes], { type: mime })
}
