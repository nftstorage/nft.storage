import { useState, useEffect } from 'react'
import Router from 'next/router'
import { useUserContext } from '../lib/user.js'
import { loginEmail, loginSocial } from '../lib/magic.js'
import Layout from '../components/layout.js'
import Button from '../components/button.js'

export default function Login() {
  const [errorMsg, setErrorMsg] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [user, setUser] = useUserContext()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    user && user.issuer && Router.push('/')
  }, [user])

  async function onSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')
    setDisabled(true)

    try {
      const data = await loginEmail(e.currentTarget.email.value)
      await setUser(data)
      Router.push('/manage')
    } catch (error) {
      setDisabled(false)
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }
  return (
    <Layout>
      <div>
        <form onSubmit={onSubmit}>
          <label>
            <span>Email</span>
            <input type="email" name="email" required />
          </label>

          <div className="submit">
            <Button type="submit" disabled={disabled}>
              Sign Up / Login
            </Button>
          </div>

          {errorMsg && <p className="error">{errorMsg}</p>}

          <br />
          <hr />
          <Button
            onClick={() => {
              setIsRedirecting(true)
              loginSocial('github')
            }}
          >
            Github
          </Button>
          {isRedirecting && <div className="redirecting">Redirecting...</div>}
          <br />
          <br />
        </form>
      </div>
    </Layout>
  )
}
