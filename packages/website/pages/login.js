import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { loginEmail, loginSocial } from '../lib/magic.js'
import countly from '../lib/countly'
import Button from '../components/button.js'
import { useQueryClient } from 'react-query'

export function getStaticProps() {
  return {
    props: {
      title: 'Login - NFT Storage',
      description: 'Login to NFT.Storage',
      redirectTo: '/files',
      redirectIfFound: true,
    },
  }
}

export default function Login() {
  const queryClient = useQueryClient()
  const [errorMsg, setErrorMsg] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { query } = useRouter()
  const version = /** @type {string} */ (query.version)

  /**
   * @param {import('react').ChangeEvent<HTMLFormElement>} e
   */
  async function onSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')
    setDisabled(true)

    try {
      await loginEmail(e.currentTarget.email.value, version)
      await queryClient.invalidateQueries('magic-user')
      Router.push('/files')
    } catch (/** @type {any} */ error) {
      setDisabled(false)
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }
  return (
    <main className="flex-auto bg-nsorange w-100">
      <div className="mw9 center pv3 mtauto">
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center flex-column tc"
        >
          <label className="f5 db mb2 chicagoflf">
            <h1>Log in</h1>
          </label>
          <label id="email-entry-label" htmlFor="email" className="sr-only">
            Enter Your Email
          </label>
          <input
            aria-labelledby="email-entry-label"
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="input-reset ba b--black pa2 mb2 w5 center db"
          />

          <Button
            type="submit"
            disabled={disabled}
            className="w5 tc"
            tracking={{
              event: countly.events.LOGIN_CLICK,
              ui: countly.ui.LOGIN,
              action: 'Sign Up / Login',
            }}
          >
            Sign Up / Login
          </Button>

          {errorMsg && <p className="error">{errorMsg}</p>}

          <h4>Or with</h4>

          <Button
            className="w5"
            onClick={() => {
              setIsRedirecting(true)
              loginSocial('github', version)
            }}
            tracking={{
              event: countly.events.LOGIN_CLICK,
              ui: countly.ui.LOGIN,
              action: 'Github',
            }}
          >
            {isRedirecting ? 'Redirecting...' : 'Github'}
          </Button>
          <br />
          <br />
        </form>
      </div>
    </main>
  )
}
