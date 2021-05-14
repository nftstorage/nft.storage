import { iterateMultipart } from './multipart'

/**
 * @param {Request|Response} source
 * @returns {Promise<FormData>}
 */
export const toFormData = async ({ body, headers }) => {
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
