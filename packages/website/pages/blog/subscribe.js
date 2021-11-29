import { useEffect, useState } from 'react'
import Button from '../../components/button.js'
import countly from '../../lib/countly.js'
import { addTags, getInfo, subscribe } from '../../lib/subscribe.js'

export function getStaticProps() {
  return {
    props: {
      title: 'Subscribe - NFT Storage',
      description: 'Subcribe to the NFT.Storage blog',
      navBgColor: 'bg-nsltblue',
      altLogo: true,
    },
  }
}

/**
 * Subscribe Page
 *
 * @param {import('../../components/types.js').LayoutChildrenProps} props
 * @returns
 */
export default function Subcribe({ user }) {
  const [status, setStatus] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => setStatus(''), [email])
  useEffect(() => {
    if (status === '') setDisabled(false)
    setErrorMsg('')
  }, [status])

  /**
   * @param {import('react').ChangeEvent<HTMLFormElement>} e
   */
  const onSubmit = async e => {
    e.preventDefault()
    const userMail = user?.email || email
    setStatus('pending')
    if (errorMsg) setErrorMsg('')
    setDisabled(true)
    // try to subscribe user
    try {
      const res = await subscribe(userMail)
      console.log(res)
      setStatus('success')
    } catch (/** @type {any} */ err) {
      if (err.message === 'exists') {
        // mailchimp api always returns null from add-tags enpoint
        // so... try to add the new tag
        await addTags(userMail)
        // check to see if user is subscribed and has right tag
        try {
          const user = await getInfo(userMail)
          if (
            user.response.status === 'subscribed' &&
            user.response.tags.some(
              (/** @type {any} */ tag) =>
                tag.name === 'nft_storage_blog_subscriber'
            )
          )
            console.log(user.response.tags)
          setStatus('success')
        } catch (/** @type {any} */ error) {
          console.log('ERROR SUBSCRIBING USER: ', error.message)
          setDisabled(false)
          setStatus('error')
          setErrorMsg('Something went wrong. Please try again later.')
        }
      }
    }
  }

  return (
    <main className="bg-nsltblue w-100 flex-auto">
      <div className="mw9 center pv3 mtauto">
        <form onSubmit={onSubmit} className="tc">
          <label className="f5 db mb2 chicagoflf">
            <h1>Subscribe</h1>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
            disabled={status === 'pending' || !!user?.email}
            value={user?.email || email}
            className="input-reset ba b--black pa2 mb2 w5 center db"
          />

          <Button
            wrapperClassName="w5"
            disabled={disabled}
            type="submit"
            tracking={{
              event: countly.events.BLOG_SUBSCRIBE_CLICK,
              ui: countly.ui.BLOG_SUBSCRIBE,
              action: 'Subscribe',
            }}
          >
            Subscribe
          </Button>
          <br />
          {errorMsg && <p className="error">{errorMsg}</p>}
          {status === 'success' && <p>Subscribed!</p>}
        </form>
      </div>
    </main>
  )
}
