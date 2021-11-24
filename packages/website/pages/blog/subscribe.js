import Button from '../../components/button.js'
import countly from '../../lib/countly.js'

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

export default function Login() {
  // const [errorMsg, setErrorMsg] = useState('')
  // const [disabled, setDisabled] = useState(false)
  // const version = /** @type {string} */ (query.version)

  // /**
  //  * @param {import('react').ChangeEvent<HTMLFormElement>} e
  //  */
  // async function onSubmit(e) {
  //   e.preventDefault()

  //   if (errorMsg) setErrorMsg('')
  //   setDisabled(true)

  //   try {
  //     await loginEmail(e.currentTarget.email.value, version)
  //     await queryClient.invalidateQueries('magic-user')
  //     Router.push('/files')
  //   } catch (/** @type {any} */ error) {
  //     setDisabled(false)
  //     console.error('An unexpected error happened occurred:', error)
  //     setErrorMsg(error.message)
  //   }
  // }
  return (
    <main className="bg-nsltblue w-100 flex-auto">
      <div className="mw9 center pv3 mtauto">
        {/* <form onSubmit={onSubmit} className="tc"> */}
        <form className="tc">
          <label className="f5 db mb2 chicagoflf">
            <h1>Subscribe</h1>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="input-reset ba b--black pa2 mb2 w5 center db"
          />

          {/* {errorMsg && <p className="error">{errorMsg}</p>} */}

          <Button
            wrapperClassName="w5"
            // onClick={() => {}}
            tracking={{
              event: countly.events.BLOG_SUBSCRIBE_CLICK,
              ui: countly.ui.BLOG_SUBSCRIBE,
              action: 'Subscribe',
            }}
          >
            Subscribe
          </Button>
          <br />
          <br />
        </form>
      </div>
    </main>
  )
}
