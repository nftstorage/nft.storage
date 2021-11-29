import mailchimp from '@mailchimp/mailchimp_marketing'

const LIST_ID = '64f6e3fd11'

/**
 * Get user subscription info
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async (req, res) => {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: 'us5',
  })
  try {
    const response = await mailchimp.lists.getListMember(
      LIST_ID,
      req.query.email
    )
    res.status(200).json({ response })
  } catch (/** @type {any} */ error) {
    res.status(400).json(error)
  }
}
