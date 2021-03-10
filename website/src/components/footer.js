import Link from 'next/link'

export default function Footer () {
  return (
    <footer className='bg-black flex justify-between f7 white pv3 ph3 ph5-ns'>
      <div>
        <span className='v-mid'>Made with ❤️ by Protocol Labs</span>
        <span className='mh2 v-mid b'>•</span>
        <span className='v-mid'>Made for</span> <a href='https://nfthack.ethglobal.co/' className='nspink no-underline v-mid'>NFTHack</a>
        <span className='mh2 v-mid b'>•</span>
        <span className='v-mid'>Powered by Pinata</span> <img src='/images/logo-pinata.svg' width={20} alt='Pinata logo' className='v-mid' />
      </div>
      <div>
        <Link href='/terms'><a className='nspink no-underline underline-hover v-mid'>Terms &amp; Conditions</a></Link>
        <span className='mh2 v-mid b'>•</span>
        <span className='v-mid'>
          Need Help? <a href='https://github.com/ipfs-shipyard/nft.storage/issues/new' className='nspink  underline-hover no-underline'>Open an Issue</a>
        </span>
      </div>
    </footer>
  )
}
