import { putOnProcessorBus } from './utils'
import { detectFormat } from '../analyzer/metadata'

// async function doGetContent(data) {
//   // TODO
//   return true
// }

export async function getContent(event) {
  const data = event.detail
  const imageUri = data?.token_uri_metadata?.image

  if (imageUri) {
    const content_uri_format = await detectFormat(imageUri)
    const content_uri = imageUri
    console.log(
      `detected content format: ${content_uri_format} for ${imageUri}`
    )

    putOnProcessorBus('getContent', {
      ...data,
      content_uri_format,
      content_uri,
    })
    //     putOnProcessorBus('failure', data)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: getContent' + data,
    }),
  }
}
