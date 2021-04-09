const BR = /\r?\n/

/**
 * @param {ReadableStream<Uint8Array>} source
 * @returns {AsyncIterable<any>}
 */
export const ndjson = async function* (source) {
  const decoder = new TextDecoder()
  const reader = source.getReader()
  let buffer = ''
  let done = false

  try {
    while (!done) {
      const chunk = await reader.read()
      if (chunk.done) {
        done = chunk.done
      } else {
        buffer += decoder.decode(chunk.value, { stream: true })
        const lines = buffer.split(BR)
        for (const line of lines) {
          const part = line.trim()
          if (part.length > 0) {
            yield JSON.parse(part)
          }
        }
      }
    }
  } finally {
    if (!done) {
      await reader.cancel()
    }
    reader.releaseLock()
  }
}
