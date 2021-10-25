// @ts-ignore
/**
 * This works around the fact
 * that ts does not know node:stream/web module
 * therefore we shadow it with d.ts
 */
export const { ReadableStream, WritableStream, TransformStream } = globalThis
