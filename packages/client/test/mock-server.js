import http from 'http'
import fetch, {
  Headers,
  Request as FetchRequest,
  Response as FetchResponse,
} from '@web-std/fetch'
import { iterateMultipart } from '@ssttevee/multipart-parser'
import { FormData } from '@web-std/form-data'
import { File } from '@web-std/file'
import { ReadableStream } from '@web-std/blob'

const encoder = new TextEncoder()
const decoder = new TextDecoder()
export { fetch, Headers }

/**
 *
 * @param {AsyncIterator<string|Uint8Array>|Iterator<string|Uint8Array>} source
 * @returns {ReadableStream<Uint8Array>}
 */
const toReadableStream = (source) =>
  new ReadableStream({
    async pull(controller) {
      try {
        while (controller.desiredSize || 0 > 0) {
          const chunk = await source.next()
          if (chunk.done) {
            controller.close()
          } else {
            const bytes =
              typeof chunk.value === 'string'
                ? encoder.encode(chunk.value)
                : chunk.value
            controller.enqueue(bytes)
          }
        }
      } catch (error) {
        controller.error(error)
      }
    },
    cancel(reason) {
      if (reason) {
        if (typeof source.throw === 'function') {
          return void source.throw(reason)
        }
      }
      if (typeof source.return === 'function') {
        source.return()
      }
      return
    },
  })

/**
 * @typedef {{body: ReadableStream<Uint8Array>|null}} Source
 *
 * @param {Source} source
 * @returns {Promise<Uint8Array>}
 */
const toBytes = async ({ body }) => {
  if (body == null) {
    return new Uint8Array(0)
  }
  const chunks = []
  const reader = body.getReader()
  let byteLength = 0
  while (true) {
    const chunk = await reader.read()
    if (chunk.done) {
      break
    } else {
      byteLength += chunk.value.byteLength
      chunks.push(chunk.value)
    }
  }

  const bytes = new Uint8Array(byteLength)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }

  return bytes
}

/**
 *
 * @param {Source} source
 * @returns {Promise<ArrayBuffer>}
 */
const toArrayBuffer = async (source) => {
  const bytes = await toBytes(source)
  return bytes.buffer
}

/**
 * @param {Source} source
 */
const toText = async (source) => {
  const bytes = await toBytes(source)
  return decoder.decode(bytes)
}

/**
 * @param {Source} source
 */
const toBlob = async (source) => {
  const bytes = await toBytes(source)
  return new Blob([bytes])
}

/**
 * @param {Source} source
 */
const toJSON = async (source) => {
  const text = await toText(source)
  return JSON.parse(text)
}

/**
 * @param {Request|Response} source
 */
const toFormData = async ({ body, headers }) => {
  const contentType = headers.get('Content-Type') || ''
  const [type, boundary] = contentType.split(/\s*;\s*boundary=/)
  if (type === 'multipart/form-data' && boundary != null && body != null) {
    const form = new FormData()
    const parts = iterateMultipart(body, boundary)
    for await (const { name, data, filename, contentType } of parts) {
      if (filename) {
        form.append(name, new File([data], filename, { type: contentType }))
      } else {
        form.append(name, new TextDecoder().decode(data), filename)
      }
    }
    return form
  } else {
    throw new TypeError('Could not parse content as FormData.')
  }
}

/**
 * @param {Request|Response} self
 */
const bodyOf = (self) => {
  const stream = self._rawStream()

  const body =
    stream == null
      ? null
      : stream instanceof Uint8Array || typeof stream === 'string'
      ? toReadableStream([stream][Symbol.iterator]())
      : // @ts-ignore
        toReadableStream(stream[Symbol.asyncIterator]())

  Object.defineProperty(self, 'body', { value: body })
  return body
}

export class Request extends FetchRequest {
  _rawStream() {
    return super.body
  }

  /**
   * @type {ReadableStream<Uint8Array>|null}
   */
  // @ts-ignore - we want ReadableStream not node stream
  get body() {
    return bodyOf(this)
  }

  arrayBuffer() {
    return toArrayBuffer(this)
  }

  /**
   * @returns {Promise<globalThis.Blob>}
   */
  // @ts-ignore - we want starndard blob not the node-fetch one
  blob() {
    return toBlob(this)
  }

  text() {
    return toText(this)
  }

  json() {
    return toJSON(this)
  }

  formData() {
    return toFormData(this)
  }
}

export class Response extends FetchResponse {
  _rawStream() {
    return super.body
  }

  /**
   * @type {ReadableStream<Uint8Array>|null}
   */
  // @ts-ignore - we want ReadableStream not node stream
  get body() {
    return bodyOf(this)
  }

  arrayBuffer() {
    return toArrayBuffer(this)
  }

  /**
   * @returns {Promise<globalThis.Blob>}
   */
  // @ts-ignore - we want starndard blob not the node-fetch one
  blob() {
    return toBlob(this)
  }

  text() {
    return toText(this)
  }

  json() {
    return toJSON(this)
  }

  formData() {
    return toFormData(this)
  }
}

/**
 * @template State
 */
export class Service {
  /**
   * @param {http.Server} server
   * @param {State} state
   * @param {(request:Request, state:State) => Promise<Response>} handler
   */
  constructor(server, state, handler) {
    this.server = server
    this.state = state
    this.handler = handler
    this.onrequest = this.onrequest.bind(this)
  }
  get address() {
    const { port, address, family } = /** @type {import('net').AddressInfo} */ (
      this.server.address()
    )

    return { port, host: family === 'IPv6' ? `127.0.0.1` : address }
  }
  get url() {
    const { host, port } = this.address
    return new URL(`http://${host}:${port}`)
  }

  /**
   *
   * @param {http.IncomingMessage} incoming
   * @param {http.ServerResponse} outgoing
   */
  async onrequest(incoming, outgoing) {
    try {
      const { host, port } = this.address
      const url = new URL(incoming.url || '/', `http://${host}:${port}`)

      const request = new Request(url.href, {
        method: incoming.method,
        // @ts-ignore
        headers: new Headers({ ...incoming.headers }),
        body: toBody(incoming),
      })

      const response = await this.handler(request, this.state)
      const headers = Object.fromEntries(response.headers.entries())
      outgoing.writeHead(response.status, headers)
      const body = response.body ? response.body : []
      // @ts-ignore
      for await (const chunk of body) {
        outgoing.write(chunk)
      }

      outgoing.end()
    } catch (error) {
      if (!outgoing.hasHeader) {
        outgoing.writeHead(error.status || 500)
      }
      outgoing.write(error.stack)
      outgoing.end()
    }
  }
}

/**
 * @param {http.IncomingMessage} inn
 */
const toBody = (inn) => {
  switch (inn.method) {
    case 'HEAD':
    case 'GET':
      return undefined
    default:
      return inn
  }
}

/**
 * @param {Service<any>} service
 * @param {number} [port]
 */
export const listen = (service, port = 0) =>
  new Promise((resolve) => {
    service.server.once('listening', () => resolve(service))
    service.server.addListener('request', service.onrequest)
    service.server.listen(port)
  })

/**
 * @template State
 * @param {State} state
 * @param {(request:Request, state:State) => Promise<Response>} handler
 */
export const activate = async (state, handler) => {
  const service = new Service(new http.Server(), state, handler)
  await listen(service)
  return service
}

/**
 * @param {Service<any>} service
 */
export const deactivate = (service) => {
  service.server.close()
}
