import { useEffect, useState } from 'react'
import Button from '../../components/button.js'
import countly from '../../lib/countly.js'
import { addTags, getInfo, subscribe } from '../../lib/subscribe.js'
import { useRouter } from 'next/router'
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
  const router = useRouter()
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
  const onSubmit = async (e) => {
    e.preventDefault()
    const userMail = user?.email || email

    if (status === 'pending' || !userMail) return

    setStatus('pending')
    if (errorMsg) {
      setErrorMsg('You could not subscribe to the list')
    }
    setDisabled(true)
    // try to subscribe user
    try {
      await subscribe(userMail)

      setStatus('success')
    } catch (/** @type {any} */ err) {
      // if user already exists we will try to add blog-subscriber tag
      if (err.message === 'exists') {
        // so... try to add the new tag
        await addTags(userMail)
        // endpoint for adding tags returns null no matter what
        // so impossible to tell if successful
        // so check to see if user is subscribed(to audience) and has blog-subscriber tag
        try {
          const user = await getInfo(userMail)
          if (
            user.response.status === 'subscribed' &&
            user.response.tags.some(
              (/** @type {any} */ tag) =>
                tag.name === 'nft_storage_blog_subscriber'
            )
          )
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

  let content = (
    <form onSubmit={onSubmit} className="flex items-center tc flex-column">
      <label className="f5 db mb2 chicagoflf">
        <h1>Subscribe</h1>
      </label>
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'pending' || !!user?.email}
        value={user?.email || email}
        className="input-reset ba b--black pa2 mb3 w5 center db"
      />

      <Button
        disabled={disabled}
        type="submit"
        title="Subscribe to the Mailing List"
        tracking={{
          event: countly.events.BLOG_SUBSCRIBE_CLICK,
          ui: countly.ui.BLOG_SUBSCRIBE,
          action: 'Subscribe',
        }}
        className="w5"
      >
        Subscribe
      </Button>
      <br />
      {errorMsg && <p className="error">{errorMsg}</p>}
    </form>
  )

  if (status === 'success') {
    content = (
      <div className="flex items-center tc flex-column">
        <h1 className="chicagoflf">Success!</h1>
        <p>You are subscribed to the Mailing List.</p>
        <br />
        <Button
          onClick={() => {
            router.push('/blog')
          }}
        >
          Go Back to Reading
        </Button>
      </div>
    )
  }

  return (
    <main className="flex-auto bg-nsltblue w-100">
      <div className="mw9 center pv3 mtauto">{content}</div>
    </main>
  )
}
