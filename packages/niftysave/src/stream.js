/**
 * This is shadowed by stream.d.ts, because ts doesn't know about node streams.
 */
import WebStreams from 'web-streams-polyfill'
export const { ReadableStream, WritableStream, TransformStream } = WebStreams
