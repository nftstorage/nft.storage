import Link from 'next/link'
import Button from './button.js'

export default function Navbar () {
  return (
    <nav className='dn dn-m bg-nsorange flex-ns items-center justify-between ph5 pv3'>
      <div>
        <Link href='/#getting-started'><a className='f4 black no-underline underline-hover v-mid'>Getting Started</a></Link>
        <span className='mh2 v-mid b black'>•</span>
        <Link href='/#api-docs'><a className='f4 black no-underline underline-hover v-mid'>API Docs</a></Link>
      </div>
      <div>
        <Button wrapperClassName='mr3' href='#'>Register</Button>
        <Button href='#'>Login</Button>
      </div>
    </nav>
  )
}
