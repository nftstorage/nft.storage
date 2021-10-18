import formidable from 'formidable'

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Wrong method, please use POST' })

  const form = formidable({ multiples: false })

  return form.parse(req, (error, _, files) => {
    if (error) {
      return console.error('Failed to handle file upload through Share', error)
    }

    const tempFilePath = files.file.path
    return res.redirect(
      302,
      `/uploadTempFile?tempFilePath=${Buffer.from(tempFilePath).toString(
        'base64'
      )}`
    )
  })
}

export const config = {
  api: { bodyParser: false },
}
