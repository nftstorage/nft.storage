import Head from 'next/head'
import Navbar from '../components/navbar.js'
import Hero from '../components/hero.js'
import Footer from '../components/footer.js'

export default function Home () {
  return (
    <div className='sans-serif'>
      <Head>
        <title>nft.storage free storage for NFT data on IPFS, backed up to Filecoin.</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Unlimited storage of NFT data on IPFS, backed by Filecoin and provided free to NFTHack participants during the hackathon.'
        />
        <meta property='og:image' content='' />
        <meta name='og:title' content='nft.storage' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <Navbar />
      <Hero />

      <main>
        <article className='bg-pink pa5'>
          <h1 className='chicagoflf'>About</h1>
        </article>

        <article className='bg-yellow pa5'>
          <h1 className='chicagoflf'>Getting started</h1>
        </article>

        <article className='bg-blue pa5'>
          <h1 className='chicagoflf white'>API Documentation</h1>
        </article>
      </main>

      <Footer />

    </div>
  )
}
