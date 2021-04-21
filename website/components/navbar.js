import Router from 'next/router'
import Link from 'next/link'
import { getMagic } from '../lib/magic.js'
import Button from './button.js'
import { useUserContext } from '../lib/user.js'

export default function Navbar({ bgColor = 'nsorange' }) {
  const [user, setUser] = useUserContext()
  function logout() {
    getMagic().user.logout()
    setUser(undefined)
    Router.push('/')
  }

  return (
    <nav className={` bg-${bgColor}`}>
      <div className="flex items-center justify-between ph5 pv3 center mw9">
        <div>
          <Link href="/">
            <a className="no-underline v-mid">
              <img
                src="/images/logo-nft.storage-sm.png"
                width="160"
                height="79"
                className="mr4 v-mid"
                style={{ maxWidth: '80px', height: 'auto' }}
                alt="NFT Storage Logo"
              />
            </a>
          </Link>
          {user ? (
            <>
              <Link href="/files">
                <a className="f4 black no-underline underline-hover v-mid">
                  Files
                </a>
              </Link>
              <span className="mh2 v-mid b black">•</span>
              <Link href="/manage">
                <a className="f4 black no-underline underline-hover v-mid">
                  API Keys
                </a>
              </Link>
              <span className="mh2 v-mid b black">•</span>
            </>
          ) : null}
          <Link href="/#docs">
            <a className="f4 black no-underline underline-hover v-mid">Docs</a>
          </Link>
        </div>
        <div>
          {user ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button href="/login">Login</Button>
          )}
        </div>
      </div>
    </nav>
  )
}
