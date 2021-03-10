import { HTTPError } from '../errors'
import { verifyToken, hash } from '../utils/utils'
import { parseMultipart } from '../utils/multipart'

/**
 * @param {FetchEvent} event
 */
export async function upload(event) {
  const { headers } = event.request
  const contentType = headers.get('content-type') || ''
  const [err, user] = await verifyToken(event)
  if (err) {
    return HTTPError.respond(err)
  }

  if (contentType.includes('multipart/form-data')) {
    const boundary = contentType.split('boundary=')[1].trim()
    const parts = await parseMultipart(event.request.body, boundary)
    const files = []
    for (const file of parts) {
      const h = await hash(file.data)
      files.push({
        name: file.filename,
        size: file.data.byteLength,
        type: file.contentType,
        hash: h,
      })
    }
    return new Response(JSON.stringify(files), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  } else {
    const blob = await event.request.blob()
    return new Response(
      JSON.stringify([
        {
          size: blob.size,
          type: blob.type,
          hash: await hash(await blob.arrayBuffer()),
        },
      ]),
      {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }
    )
  }
}
