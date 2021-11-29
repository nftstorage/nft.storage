import mailchimp from '@mailchimp/mailchimp_marketing'

const LIST_ID = '64f6e3fd11'

/**
 * Subscribe user to blog mailing list
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async (req, res) => {
  const { email } = JSON.parse(req.body)
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: 'us5',
  })

  try {
    console.log('ADDING TAGS')
    // @ts-ignore
    const response = await mailchimp.lists.updateListMemberTags(
      LIST_ID,
      email,
      { tags: [{ name: 'nft_storage_blog_subscriber', status: 'active' }] }
    )
    // mailchimp api returns null even on success; known issue
    if (response === null) {
      res.status(200).json({
        response: {
          status: 'unknown',
        },
      })
    }
  } catch (/** @type {any} */ error) {
    console.error('ERROR ADDING TAGS: ', error)
    res.status(400).json(error)
  }
}
