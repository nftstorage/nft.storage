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
        <p className='lh-copy mw6'>
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
  const jsUsage = `import {NFTStore} from 'nft.storage'

const apiKey = 'YOUR_API_KEY'
const client = new NFTStore(apiKey)

const data = new File()
const cid = await client.storeBlob(data)`

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
            <p className='chicagoflf f3 mw6 center'><a href='manage-keys.html' className='no-underline underline-hover nsnavy'>Create an API access key</a> and note it down.</p>
            <img src='images/icon-arrow-down.svg' alt='arrow down' className='mb3' />
          </li>
          <li>
            <Step>3</Step>
            <p className='chicagoflf f3 mw6 center'>Choose a method to get your NFT data stored:</p>
          </li>
        </ol>
        <div className='db-m flex-ns justify-center center mw9 mw-none-m mw-none-ns mh-3'>
          <Box bgColor='nspeach' borderColor='nsnavy' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 class='chicagoflf f5 fw4'><HashLink id='js-client-library'>JS Client Library</HashLink></h2>
            <p class='lh-copy'>Install the <a href='https://npmjs.org/package/nft.storage' target='_blank' rel='noopener noreferrer' className='black'>JS library</a>:</p>
            <pre class='f6 white bg-nsnavy pa3 br1 ba b--black code overflow-x-scroll'>npm install nft.storage</pre>
            <p class='lh-copy'>Use the client in the browser or from Node.js:</p>
            <pre class='f6 white bg-nsnavy pa3 br1 ba b--black code overflow-x-scroll'>{jsUsage}</pre>
            <p class='lh-copy'>View the <a href='#' target='_blank' rel='noopener noreferrer' className='black'>full library reference docs</a>.</p>
          </Box>
          <Box bgColor='nspeach' borderColor='nspink' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 class='chicagoflf f5 fw4'><HashLink id='raw-http-request'>Raw HTTP Request</HashLink></h2>
            <p class='lh-copy'>Configure your HTTP client and set the <code class='f6 bg-nspink ph2 pv1 br1 ba b--black code'>Authorization</code> header:</p>
            <pre class='f6 bg-nspink pa3 br1 ba b--black code overflow-x-scroll'>"Authorization": "Bearer YOUR_API_KEY"</pre>
            <p class='lh-copy'>Submit a <code class='f6 bg-nspink ph2 pv1 br1 ba b--black code'>multipart/form-data</code> HTTP <code class='f6 bg-nspink ph2 pv1 br1 ba b--black code'>POST</code> request to <a href='https://api.nft.storage' className='black'>https://api.nft.storage</a>.</p>
            <p class='lh-copy'>The request should contain a <code class='f6 bg-nspink ph2 pv1 br1 ba b--black code'>file</code> property, the data for the file you want to add.</p>
            <p class='lh-copy'>The response is a JSON object. Check the <a href='#api-docs' className='black'>API Docs</a> for information about the response and to find out how to query the request to see IPFS pinning status and Filecoin deal state.</p>
          </Box>
          <Box bgColor='nspeach' borderColor='nsred' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 class='chicagoflf f5 fw4'><HashLink id='configure-as-a-remote-pinning-service'>Configure as a Remote Pinning Service</HashLink></h2>
            <p class='lh-copy'>You can use <strong>nft.storage</strong> as a <a href='https://ipfs.github.io/pinning-services-api-spec' className='black'>remote pinning service</a> in IPFS.</p>
            <pre class='f6 white bg-nsred pa3 br1 ba b--black code overflow-x-scroll'>ipfs pin remote service add nftstorage https://api.nft.storage/pins YOUR_API_KEY</pre>
            <p class='lh-copy'>Use the <code class='f6 white bg-nsred ph2 pv1 br1 ba b--black code'>--help</code> option for information on other remote pinning service commands:</p>
            <pre class='f6 white bg-nsred pa3 br1 ba b--black code overflow-x-scroll'>ipfs pin remote --help</pre>
          </Box>
        </div>
      </div>
    </article>
  )
}

function APIDocs () {
  const postResp = `{
  "cid": "bafy..."
}`
  const getResp = `{
  "cid": "bafy...",
  "deal": {
    "TODO": "???"
  },
  "pin": {
    "name": "art.jpg",
    "status": "pinned",
    "name": "PreciousData.pdf",
    "origins":  [
      "/ip4/203.0.113.142/tcp/4001/p2p/QmSourcePeerId",
      "/ip4/203.0.113.114/udp/4001/quic/p2p/QmSourcePeerId"
    ]
  },
  "created": "2021-03-04T14:56:00Z"
}`

  return (
    <article className='bg-blue'>
      <div className='mw9 center pa5'>
        <h1 className='chicagoflf white'>
          <HashLink id='api-docs'>API Documentation</HashLink>
        </h1>
        <p class='lh-copy white'>The root API URL is <code class='f6 black bg-white ph2 pv1 br1 ba b--black code'>https://api.nft.storage</code>.</p>
        <p class='lh-copy white'>All requests to the HTTP API must be authenticated with a JWT access token, generated by the website and passed in the HTTP <code class='f6 black bg-white ph2 pv1 br1 ba b--black code'>Authorization</code> header like:</p>
        <pre class='dib f6 bg-white pa3 br1 ba b--black code'>"Authorization": "Bearer YOUR_API_KEY"</pre>
        <div className='db-m flex-ns justify-center center mw9 mw-none-m mw-none-ns mh-3 mv4'>
          <Box bgColor='nsgray' borderColor='nspink' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 class='f5 fw4'><HashLink id='post-'><code class='bg-white ph2 pv1 br1 ba b--black'>POST /</code></HashLink></h2>
            <p class='lh-copy'>Store a file with <strong>nft.storage</strong>.</p>
            <p class='lh-copy'>This should be a <code class='f6 bg-white ph2 pv1 br1 ba b--black'>multipart/form-data</code> HTTP <code class='f6 bg-white ph2 pv1 br1 ba b--black'>POST</code> request and MUST contain a <code class='f6 bg-white ph2 pv1 br1 ba b--black'>file</code> property - the file to store.</p>
            <p class='lh-copy'>Successful requests will receive a HTTP <code class='f6 bg-white ph2 pv1 br1 ba b--black'>201</code> status and <code class='f6 bg-white ph2 pv1 br1 ba b--black'>application/json</code> response like:</p>
            <pre class='f6 bg-white pa3 br1 ba b--black code overflow-x-scroll'>{postResp}</pre>
          </Box>
          <Box bgColor='nsgray' borderColor='nspink' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 class='f5 fw4'><HashLink id='get-cid'><code class='bg-white ph2 pv1 br1 ba b--black'>{'GET /{cid}'}</code></HashLink></h2>
            <p class='lh-copy'>Get information for the stored file CID.</p>
            <p class='lh-copy'>Includes the IPFS pinning state and the Filecoin deal state.</p>
            <p class='lh-copy'>Successful requests will receive a a HTTP <code class='f6 bg-white ph2 pv1 br1 ba b--black'>200</code> status and an <code class='f6 bg-white ph2 pv1 br1 ba b--black'>application/json</code> response like:</p>
            <pre class='f6 bg-white pa3 br1 ba b--black code overflow-x-scroll'>{getResp}</pre>
          </Box>
          <Box bgColor='nsgray' borderColor='nspink' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 class='f5 fw4'><HashLink id='delete-cid'><code class='bg-white ph2 pv1 br1 ba b--black'>{'DELETE /{cid}'}</code></HashLink></h2>
            <p class='lh-copy'>Stop storing the content with the passed CID on <strong>nft.storage</strong>.</p>
            <ul>
              <li>Unpin the item from the underlying IPFS pinning service.</li>
              <li>Cease renewals for expired Filecoin deals involving the CID.</li>
            </ul>
            <p class='lh-copy'>⚠️ This does not remove the content from the network.</p>
            <ul>
              <li>Does not terminate any established Filecoin deal.</li>
              <li>Does not remove the content from other IPFS nodes in the network that already cached or pinned the CID.</li>
              <li>Note: the content will remain available if another user has stored the CID with <strong>nft.storage</strong>.</li>
            </ul>
            <p class='lh-copy'>Successful requests will receive a HTTP <code class='f6 bg-white ph2 pv1 br1 ba b--black'>204</code> status and no response data.</p>
          </Box>
        </div>
        <h2 className='chicagoflf white'>
          <HashLink id='pinning-service-api-endpoints'>Pinning Service API Endpoints</HashLink>
        </h2>
        <p class='lh-copy white'>These are also available. See the <a href='https://ipfs.github.io/pinning-services-api-spec/#tag/pins' className='white'>pinning service API documentation</a> for details.</p>
      </div>
    </article>
  )
}
