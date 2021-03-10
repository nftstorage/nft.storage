import CID from "multiformats/cid"
import NFT from "./nft-store.js"


/**
 * @param {Request} request
 */
export const auth = async (request) => {
  const auth = request.headers.get('Authorization') || ''
  const [,token] = auth.match(/Bearer (.+)/) || []
  // TODO: Perform actual token validation
  return token ? token : HTTPError.throw('Not Authorized', 403)
}

/**
 * Parses CID paramatere.
 * @param {Request} request
 * @returns {CID}
 */
export const parseCID = request => {
  try {
    const url = new URL(request.url)
    const [,cidString] = url.pathname.split('/')
    return CID.parse(cidString || '')
  } catch(error) {
    return HTTPError.throw(error.message)
  }
}

/**
 * @param {Request} request 
 */
export const cors = (request) => {
  return {
    'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization'
  }
}

/**
 * @param {Request} request 
 */
export const accessControl = (request) => {
  return new Response(null, {
    headers: cors(request)
  })
}

/**
 * @param {string} token 
 * @param {CID} cid 
 */
const toKey = (token, cid) => `${token}:${cid}`

  /**
   * Imports blob to IPFS and returns a CID
   * @param {Blob} blob
   * @returns {Promise<CID>}
   */
export const importBlob = async blob => {
  console.log(blob)
  return HTTPError.throw('Not yet implemented') 
}

/**
 * Imports directory to IPFS and returns a CID
 *
 * @param {Iterable<File>} files
 * @returns {Promise<CID>}
 */
export const importDirectory = async (files) => {
  for (const file of files) {
    console.log(file)
  }
  return HTTPError.throw('Not yet implemented') 
}

/**
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export const status = async request => {
  try {
    const token = await auth(request)
    const cid = parseCID(request)
    const status = await NFT.get(toKey(token, cid), "stream")
    return new Response(status, { headers: cors(request) })
  } catch (error) {
    return HTTPError.respond(error)
  }
}

/**
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export const unlink = async request => {
  try {
    const token = await auth(request)
    const cid = parseCID(request)
    await NFT.delete(toKey(token, cid))
    return new Response(JSON.stringify({ ok: true }), {
      headers: cors(request)
    })
  } catch (error) {
    return HTTPError.respond(error)
  }
}
export { unlink as delete }

/**
 * @param {string} token 
 * @param {CID} cid
 * @returns {Promise<{cid:string}>}
 */
export const store = async (token, cid) => {
  const key = toKey(token, cid)
  // We may already have a content like this
  if (null == await NFT.get(key)) {
    await NFT.put(key, JSON.stringify({
      cid: cid.toString(),
      deals: { status: "ongoing", deals: [] },
      pin: null,
      created: Date.now()
    }))
  }

  return { cid: cid.toString() }
}

/**
 * @param {Request} request 
 */
export const storeBlob = async (request) => {
  try {
    const token = await auth(request)
    const blob = await request.blob()
    const cid = await importBlob(blob)
    const result = await store(token, cid)

    return new Response(JSON.stringify(result), {
      headers: cors(request)
    })
  } catch (error) {
    return HTTPError.respond(error)
  }
}

/**
 * @param {Request} request 
 * @returns {Promise<Response>}
 */
export const storeDirectory = async (request) => {
  try {
    const token = await auth(request)
    const content = await request.formData()
    const files = /** @type {File[]} */ (content.getAll('files'))
    const cid = await importDirectory(files)
    const result = await store(token, cid)

    return new Response(JSON.stringify(result), {
      headers: cors(request)
    })
  } catch (error) {
    return HTTPError.respond(error)
  }
}


class HTTPError extends Error {
  /**
   * 
   * @param {string} message 
   * @param {number} [status]
   */
  constructor(message, status=500) {
    super(message)
    this.status = status
  }
  /**
   * @param {string} message 
   * @param {number} [status]
   * @returns {never}
   */
  static throw(message, status) {
    throw new this(message, status)
  }

  /**
   * @param {HTTPError} error 
   */
  static respond(error) {
    return new Response(error.toString(), {
      statusText: error.message,
      status: error.status || 500
    })
  }
}

