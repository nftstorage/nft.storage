import Link from 'next/link'
import Button from './button.js'
import { LOGIN_URL } from '../constants.js'

export default function Navbar ({ authenticated, bgColor = 'nsorange' }) {
  const btns = authenticated
    ? <Button href='/logout'>Logout</Button>
    : (
      <>
        <Button wrapperClassName='mr3' href={LOGIN_URL}>Register</Button>
        <Button href={LOGIN_URL}>Login</Button>
      </>
    )
  return (
    <nav className={`dn dn-m db-ns bg-${bgColor}`}>
      <div className='flex items-center justify-between ph5 pv3 center mw9'>
        <div>
          <Link href='/'>
            <a className='no-underline v-mid'>
              <img src='/images/logo-nft.storage-sm.png' width='80' className='mr4 v-mid' />
            </a>
          </Link>
          <Link href='/#getting-started'><a className='f4 black no-underline underline-hover v-mid'>Getting Started</a></Link>
          <span className='mh2 v-mid b black'>•</span>
          <Link href='/#api-docs'><a className='f4 black no-underline underline-hover v-mid'>API Docs</a></Link>
          {authenticated ? (
            <>
              <span className='mh2 v-mid b black'>•</span>
              <Link href='/manage-keys.html'><a className='f4 black no-underline underline-hover v-mid'>Manage API Keys</a></Link>
            </>
          ) : null}
        </div>
        <div>{btns}</div>
      </div>
    </nav>
  )
}
