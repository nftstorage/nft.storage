import * as nodeHttp from 'http'

/**
 * Spin up an http server on an unused port, do some work with it, then shut it down.
 * @param {import('http').RequestListener} listener
 * @param {(baseUrl: URL) => Promise<void>} useServer
 * @returns
 */
export async function withHttpServer(listener, useServer) {
  const httpServer = nodeHttp.createServer(listener)
  // listen on unused port
  await new Promise((resolve) => {
    httpServer.listen(0, () => {
      resolve(true)
    })
  })
  const baseUrl = addressUrl(httpServer.address())
  if (!baseUrl) {
    throw new Error(`failed to determine baseUrl from server`)
  }
  try {
    await useServer(baseUrl)
  } finally {
    await new Promise((resolve) => {
      httpServer.close(resolve)
    })
  }
}

/**
 * Given return type of node http Server#address, return a URL descriving the server address
 * @param {string|null|import('net').AddressInfo} addressInfo
 * @returns {URL}
 */
export function addressUrl(addressInfo) {
  if (addressInfo === null)
    throw new TypeError('addressInfo is unexpectedly null')
  if (typeof addressInfo === 'string') return new URL(addressInfo)
  const { address, port } = addressInfo
  const host = address === '::' ? '127.0.0.1' : address
  const urlString = `http://${host}:${port}`
  return new URL(urlString)
}
