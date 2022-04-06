import { useState } from 'react'
import Router from 'next/router'
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

  /**
   * @param {import('react').ChangeEvent<HTMLFormElement>} e
   */
  async function onSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')
    setDisabled(true)

    try {
      await loginEmail(e.currentTarget.email.value)
      await queryClient.invalidateQueries('magic-user')
      Router.push('/files')
    } catch (/** @type {any} */ error) {
      setDisabled(false)
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }
  return (
    <main className="flex-auto bg-nsorange w-full">
      <div className="max-w-7xl mx-auto py-4 mt-16">
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center flex-col text-center"
        >
          <label className="text-base block mb-4 chicagoflf">
            <h1>Log in with</h1>
          </label>
          <Button
            className="w-64"
            onClick={() => {
              setIsRedirecting(true)
              loginSocial('github')
            }}
            tracking={{
              event: countly.events.LOGIN_CLICK,
              ui: countly.ui.LOGIN,
              action: 'Github',
            }}
          >
            {isRedirecting ? 'Redirecting...' : 'GitHub'}
          </Button>

          <h4 className="my-4 text-2xl">Or</h4>

          <label id="email-entry-label" htmlFor="email" className="sr-only">
            Enter Your Email
          </label>
          <input
            aria-labelledby="email-entry-label"
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="appearance-none border border-solid border-black placeholder:text-gray-500 p-2 mb-2 w-64 mx-auto block"
          />

          <Button
            type="submit"
            disabled={disabled}
            className="w-64 text-center"
            tracking={{
              event: countly.events.LOGIN_CLICK,
              ui: countly.ui.LOGIN,
              action: 'Sign Up / Login',
            }}
          >
            Sign Up / Login
          </Button>

          {errorMsg && <p className="error">{errorMsg}</p>}

          <br />
          <br />
        </form>
      </div>
    </main>
  )
}
