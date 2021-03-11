import Head from 'next/head'
import Navbar from '../components/navbar.js'
import Hero from '../components/hero.js'
import Footer from '../components/footer.js'
import HashLink from '../components/hashlink.js'
import Step from '../components/step.js'
import Box from '../components/box.js'

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
        <About />
        <GettingStarted />
        <APIDocs />
      </main>
      <Footer />
    </div>
  )
}

function About () {
  return (
    <article className='bg-pink'>
      <div className='mw9 center pa5'>
        <h1 className='chicagoflf'>
          <HashLink id='about'>About</HashLink>
        </h1>
        <p className='lh-copy mw-6'>
          <strong>nft.storage</strong> is a brand new service in private BETA, built specifically for storing <strong>off-chain</strong> NFT data. Data is stored <em>decentralized</em> on <a href='https://ipfs.io' className='black'>IPFS</a> and <em>backed up</em> in cold storage by <a href='https://filecoin.io' className='black'>Filecoin</a>.
        </p>
        <div className='tc chicagoflf pv6'>
          Diagram here
        </div>
      </div>
    </article>
  )
}

function GettingStarted () {
  return (
    <article className='bg-yellow'>
      <div className='mw9 center pa5'>
        <h1 className='chicagoflf tc mb5'>
          <HashLink id='getting-started'>Getting started</HashLink>
        </h1>
        <ol className='list tc pl0 mb5'>
          <li>
            <Step>1</Step>
            <p className='chicagoflf f3 mw6 center'><a href='#' className='no-underline underline-hover nsnavy'>Register an nft.storage account</a> so that you can create API access keys.</p>
            <img src='images/icon-arrow-down.svg' alt='arrow down' className='mb3' />
          </li>
          <li>
            <Step>2</Step>
            <p className='chicagoflf f3 mw6 center'><a href='manage-keys' className='no-underline underline-hover nsnavy'>Create an API access key</a> and note it down.</p>
            <img src='images/icon-arrow-down.svg' alt='arrow down' className='mb3' />
          </li>
          <li>
            <Step>3</Step>
            <p className='chicagoflf f3 mw6 center'>Choose a method to get your NFT data stored:</p>
          </li>
        </ol>
        <Box />
      </div>
    </article>
  )
}

function APIDocs () {
  return (
    <article className='bg-blue'>
      <div className='mw9 center pa5'>
        <h1 className='chicagoflf white'>
          <HashLink id='api-docs'>API Documentation</HashLink>
        </h1>
      </div>
    </article>
  )
}
