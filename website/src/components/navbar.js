import Link from 'next/link'

export default function Navbar () {
  return (
    <nav className='nsgray bg-nsgreen flex justify-between ph5 pv4'>
      <div>
        <Link href='/#getting-started'><a className='f4 nsgray no-underline underline-hover'>Getting Started</a></Link>
        <span className='mh2 b'>|</span>
        <Link href='/#api-docs'><a className='f4 nsgray no-underline underline-hover'>API Docs</a></Link>
      </div>
      <div>
        <a href='#' className='f4 nsgray no-underline underline-hover'>Login</a>
        <span className='mh2 b'>|</span>
        <a href='#' className='f4 nsgray no-underline underline-hover'>Register</a>
      </div>
    </nav>
  )
}
