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
    const response = await mailchimp.lists.addListMember(LIST_ID, {
      email_address: email,
      // @ts-ignore
      status: 'subscribed',
      tags: ['nft_storage_blog_subscriber'],
    })
    console.log('SUCCESSFULLY SUBSCRIBED NEW USER TO BLOG LIST', response)
    res.json({ response })
  } catch (/** @type {any} */ error) {
    console.error('FAILED TO SUBSCRIBE USER: ', error)
    res.status(400).json(error)
  }
}
