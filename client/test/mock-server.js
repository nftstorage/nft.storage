import http from "http"
import fetch, { Headers, Request as FetchRequest, Response } from 'node-fetch'
import { iterateMultipart } from '@ssttevee/multipart-parser'
import { File, FormData, ReadableStream } from "../src/platform.node.js"
import Blob from "fetch-blob"

export { fetch, Headers, Response }


export class Request extends FetchRequest {
  /**
   * @private
   */
  _rawStream() {
    return super.body
  }

  async arrayBuffer() {
    const chunks = []
    const reader = this.body.getReader()
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

    const buffer = new ArrayBuffer(byteLength)
    const bytes = new Uint8Array(buffer)
    let offset = 0
    for (const chunk of chunks) {
      bytes.set(chunk, offset)
      offset += chunk.byteLength
    }

    return buffer
  }

  async blob() {
    const buffer = await this.arrayBuffer()
    return new Blob([buffer])
  }

  async text() {
    const blob = await this.blob()
    return await blob.text()
  }

  async json() {
    const text = await this.text()
    return JSON.parse(text)
  }


  // @ts-ignore
  get body() {
    // console.log('!!!! body', Error().stack)
    const source = this._rawStream()[Symbol.asyncIterator]()
    const body = new ReadableStream({
      async pull(controller) {
        try {
          while (controller.desiredSize || 0 > 0) {
            const chunk = await source.next()
            // console.log('!!!!!!!!!!!!!!!!!', chunk, Error().stack)
            if (chunk.done) {
              controller.close()
            } else {
              controller.enqueue(chunk.value)
            }
          }
        } catch (error) {
          controller.error(error)
        }
      },
      cancel(reason) {
        if (reason) {
          if (typeof source.throw === "function") {
            return void source.throw(reason)
          }
        }
        if (typeof source.return === "function") {
          source.return()
        }
      }
    })
    Object.defineProperty(this, "body", { value: body })
    return body
  }
  async formData() {
    const contentType = this.headers.get('Content-Type') || ''
    const [type, boundary] = contentType.split(/\s*;\s*boundary=/)
    if (type === "multipart/form-data" && boundary != null) {
      const form = new FormData()
      // @ts-ignore
      const parts = iterateMultipart(this.body, boundary)
      for await (const { name, data, filename, contentType } of parts) {
        if (filename) {
          form.append(name, new File([data], filename, { type: contentType }))
        } else {
          form.append(name, new TextDecoder().decode(data), filename);
        }
    }
    } else {
      throw new TypeError('Could not parse content as FormData.')
    }
  }
}

class Service {
  /**
   * @param {http.Server} server
   * @param {(request:Request) => Promise<Response>} handler
   */
  constructor(server, handler) {
    this.server = server
    this.handler = handler
    this.onrequest = this.onrequest.bind(this)
  }
  get address() {
    const { port, address, family } =
       /** @type {import('net').AddressInfo} */(this.server.address())


    return { port, host: family === 'IPv6' ? `[${address}]` : address }
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
      // @ts-ignore
      const headers = new Headers({...incoming.headers})

      const request = new Request(url, {
        method: incoming.method,
        headers,
        body: toBody(incoming)
      })


      const response = await this.handler(request)
      outgoing.writeHead(response.status, [...response.headers.entries()])
      const body = response.body[Symbol.asyncIterator] ? response.body : [response.body]
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
 * @param {Service} service
 * @param {number} [port]
 */
export const listen = (service, port=0) => new Promise(resolve => {
  service.server.once('listening', () => resolve(service))
  service.server.addListener("request", service.onrequest)
  service.server.listen(port)
})

/**
 * 
 * @param {(request:Request) => Promise<Response>} handler 
 */
export const activate = async (handler) => {
  const service = new Service(new http.Server(), handler)
  await listen(service)
  return service
} 

/**
 * @param {Service} service 
 */
export const deactivate = (service) => {
  service.server.close()
}

