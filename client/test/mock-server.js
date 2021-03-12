import http from "http"
import fetch, { Headers, Request, Response } from 'node-fetch'

export { fetch, Headers, Request, Response }

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

