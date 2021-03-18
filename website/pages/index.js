import useSWR from 'swr'
import Hero from '../components/hero.js'
import HashLink from '../components/hashlink.js'
import Step from '../components/step.js'
import Box from '../components/box.js'
import Layout from '../components/layout.js'
import { getEdgeState } from '../lib/state.js'

export default function Home () {
  const { data } = useSWR('edge_state', getEdgeState)
  const { user, loginUrl = '#' } = data ?? {}
  return (
    <Layout user={user} loginUrl={loginUrl}>
      <Hero user={user} loginUrl={loginUrl} />
      <main>
        <About />
        <GettingStarted loginUrl={loginUrl} />
        <APIDocs />
        <FAQ />
      </main>
    </Layout>
  )
}

function About () {
  const storeText = (
    <>
      <h2 className='chicagoflf'><HashLink id='store'>Store</HashLink></h2>
      <p className="lh-copy">Just upload your data and you'll recieve an IPFS hash of the content (a CID) that can be used in <strong>on-chain</strong> NFT data as a pointer to the content.</p>
      <p className="lh-copy">Filecoin provides long term storage for the data ensuring that even if <strong>nft.storage</strong> is attacked or taken down the NFT data persists!</p>
    </>
  )
  const retrieveText = (
    <>
      <h2 className='chicagoflf'><HashLink id='retrieve'>Retrieve</HashLink></h2>
      <p className="lh-copy">NFT data stored by <strong>nft.storage</strong> can be accessed from the decentralized IPFS network from <em>any</em> peer that has the content. CIDs reference <strong>immutable</strong> content so you can be sure the content you access is the content referenced in the NFT.</p>
      <p className="lh-copy">The data can be fetched directly in the browser using <a href="https://brave.com/ipfs-support/" className='black' target='_blank' rel='noopener noreferrer'>Brave</a>, or via a <a href="https://docs.ipfs.io/concepts/ipfs-gateway/#public-gateways" className='black' target='_blank' rel='noopener noreferrer'>public IPFS gateway</a>, or by using <a href="https://github.com/ipfs-shipyard/ipfs-desktop" className='black' target='_blank' rel='noopener noreferrer'>IPFS Desktop</a> or the <a href="https://docs.ipfs.io/how-to/command-line-quick-start/" className='black' target='_blank' rel='noopener noreferrer'>IPFS command line</a>.</p>
    </>
  )
  return (
    <article className='bg-nsgreen'>
      <div className='mw9 center pa4 pa5-ns'>
        <h1 className='chicagoflf'>
          <HashLink id='about'>About</HashLink>
        </h1>
        <p className='lh-copy mw-none mw-none-m mw6-ns'>
          <strong>nft.storage</strong> is a brand new service in private BETA, built specifically for storing <strong>off-chain</strong> NFT data. Data is stored <em>decentralized</em> on <a href='https://ipfs.io' className='black'>IPFS</a> and <a href='https://filecoin.io' className='black'>Filecoin</a>.
        </p>
        <div className='db db-m dn-ns'>
          <div>
            {storeText}
            <div className='tc mv4'>
              <img src='images/diagram-store.png' alt='diagram of storage with nft.storage' width='1152' height='1650' style={{ maxWidth:"576px", height:"auto", width: "100%"}}/>
            </div>
          </div>
          <div>
            {retrieveText}
            <div className='tc mv4'>
              <img src='images/diagram-retrieve.png' alt='diagram of retrieval with nft.storage' width='1262' height='1260' style={{ maxWidth:"631px", height:"auto", width: "100%"}}/>
            </div>
          </div>
        </div>
        <div className='relative dn dn-m db-ns'>
          <div className='tr pl5'>
            <img src='images/diagram-store-and-retrieve.png' alt='diagram of storage and retrieval with nft.storage' width='2354' height='2312' style={{ width:"1177px", height:"auto", width: "100%"}}/>
          </div>
          <div className='absolute top-0 w-100 h-100 flex'>
            <div className='flex-auto w-50'>
              <div className='pt6 pr4'>{storeText}</div>
            </div>
            <div className='flex-none' style={{ width: 400 }} />
            <div className='flex-auto flex items-center w-50'>
              <div>{retrieveText}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function GettingStarted ({ loginUrl }) {
  const jsEx = `import { NFTStorage } from 'nft.storage'

const apiKey = 'YOUR_API_KEY'
const client = new NFTStorage({ token: apiKey })

const content = new Blob(['hello world'])
const cid = await client.storeBlob(content)`

  const jsDirEx = `const cid = client.storeDirectory([
  new File(['hello world'], 'content.txt'),
  new File([JSON.stringify({ owner: '@lucky' })], 'metadata.json')
])`

  const curlEx = `curl -X POST --data-binary @art.jpg -H 'Authorization: Bearer YOUR_API_KEY' https://nft.storage/api/upload`

  const uploadResp = `{
  "ok": true,
  "value": { "cid": "bafy..." }
}`

  return (
    <article className='bg-yellow'>
      <div className='mw9 center pa4 pa5-ns'>
        <h1 className='chicagoflf tc mb5'>
          <HashLink id='getting-started'>Getting started</HashLink>
        </h1>
        <ol className='list tc pl0 mb5'>
          <li>
            <Step>1</Step>
            <p className='chicagoflf f3 mw6 center'><a href={loginUrl} className='no-underline underline-hover nsnavy'>Register an nft.storage account</a> so that you can create API access keys.</p>
            <img width="29px" height="66px" src='images/icon-arrow-down.svg' alt='arrow down' className='mb3' />
          </li>
          <li>
            <Step>2</Step>
            <p className='chicagoflf f3 mw6 center'><a href='/manage' className='no-underline underline-hover nsnavy'>Create an API access key</a> and note it down.</p>
            <img width="29px" height="66px" src='images/icon-arrow-down.svg' alt='arrow down' className='mb3' />
          </li>
          <li>
            <Step>3</Step>
            <p className='chicagoflf f3 mw6 center'>Choose a method to get your NFT data stored:</p>
          </li>
        </ol>
        <div className='db-m flex-ns justify-center center mw9 mw-none-m mw-none-ns mh-3'>
          <Box bgColor='nspeach' borderColor='nsnavy' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 className='chicagoflf f5 fw4'><HashLink id='js-client-library'>JS Client Library</HashLink></h2>
            <p className='lh-copy'>Install the <a href='https://npmjs.org/package/nft.storage' target='_blank' rel='noopener noreferrer' className='black'>JS library</a>:</p>
            <pre className='f6 lh-copy white bg-nsnavy pa3 br1 ba b--black code overflow-x-scroll'>npm install nft.storage</pre>
            <p className='lh-copy'>Use the client in Node.js or the browser:</p>
            <pre className='f6 lh-copy white bg-nsnavy pa3 br1 ba b--black code overflow-x-scroll'>{jsEx}</pre>
            <p className='lh-copy'>The client can also store directories:</p>
            <pre className='f6 lh-copy white bg-nsnavy pa3 br1 ba b--black code overflow-x-scroll'>{jsDirEx}</pre>
            <p className='lh-copy'>View the <a href='https://ipfs-shipyard.github.io/nft.storage/client/classes/lib.nftstorage.html' target='_blank' rel='noopener noreferrer' className='black'>full library reference docs</a>.</p>
          </Box>
          <Box bgColor='nspeach' borderColor='nspink' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 className='chicagoflf f5 fw4'><HashLink id='raw-http-request'>Raw HTTP Request</HashLink></h2>
            <p className='lh-copy'>Configure your HTTP client and set the <code className='f6 bg-nspink ph2 pv1 br1 ba b--black code'>Authorization</code> header:</p>
            <pre className='f6 lh-copy bg-nspink pa3 br1 ba b--black code overflow-x-scroll'>"Authorization": "Bearer YOUR_API_KEY"</pre>
            <p className='lh-copy'>Submit a HTTP <code className='f6 bg-nspink ph2 pv1 br1 ba b--black code'>POST</code> request to <a href='https://nft.storage/api/upload' className='black'>nft.storage/api/upload</a>, passing the file data in the request body. e.g.</p>
            <pre className='f6 lh-copy bg-nspink pa3 br1 ba b--black code overflow-x-scroll'>{curlEx}</pre>
            <p className='lh-copy'>Successful requests will receive a HTTP <code className='f6 bg-nspink ph2 pv1 br1 ba b--black code'>200</code> status and <code className='f6 bg-nspink ph2 pv1 br1 ba b--black code'>application/json</code> response like:</p>
            <pre className='f6 lh-copy bg-nspink pa3 br1 ba b--black code overflow-x-scroll'>{uploadResp}</pre>
            <p className='lh-copy'>Check the <a href='#api-docs' className='black'>API Docs</a> for information on uploading multiple files and the other available endpoints.</p>
          </Box>
          <Box bgColor='nspeach' borderColor='nsred' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 className='chicagoflf f5 fw4'><HashLink id='configure-as-a-remote-pinning-service'>Configure as a Remote Pinning Service</HashLink></h2>
            <p className='lh-copy'>You can use <strong>nft.storage</strong> as a <a href='https://ipfs.github.io/pinning-services-api-spec' className='black'>remote pinning service</a> in IPFS.</p>
            <pre className='f6 lh-copy white bg-nsred pa3 br1 ba b--black code overflow-x-scroll'>ipfs pin remote service add nftstorage https://nft.storage/api/pins YOUR_API_KEY</pre>
            <p className='lh-copy'>Use the <code className='f6 white bg-nsred ph2 pv1 br1 ba b--black code'>--help</code> option for information on other remote pinning service commands:</p>
            <pre className='f6 lh-copy white bg-nsred pa3 br1 ba b--black code overflow-x-scroll'>ipfs pin remote --help</pre>
          </Box>
        </div>
      </div>
    </article>
  )
}

function APIDocs () {
  const curlUploadEx = `curl -X POST --data-binary @art.jpg -H 'Authorization: Bearer YOUR_API_KEY' https://nft.storage/api/upload`
  const curlUploadDirEx = `curl -X POST -F 'file=@art.jpg' -F 'file=@metadata.json' -H 'Authorization: Bearer YOUR_API_KEY' https://nft.storage/api/upload`
  const curlGetEx = `curl -H 'Authorization: Bearer YOUR_API_KEY' https://nft.storage/api/CID`
  const curlDelEx = `curl -X DELETE -H 'Authorization: Bearer YOUR_API_KEY' https://nft.storage/api/CID`
  const postResp = `{
  "ok": true,
  "value": { "cid": "bafy..." }
}`
  const getResp = `{
  "ok": true,
  "value": {
    "cid": "bafy...",
    "deals": {
      "status": "ongoing",
      "deals": []
    },
    "pin": {
      "status": "pinned"
    },
    "created": "2021-03-04T14:56:00Z"
  }
}`

  return (
    <article className='bg-nsblue'>
      <div className='mw9 center pa4 pa5-ns'>
        <h1 className='chicagoflf white'>
          <HashLink id='api-docs'>API Documentation</HashLink>
        </h1>
        <p className='lh-copy white'>The root API URL is <code className='f6 black bg-white ph2 pv1 br1 ba b--black code'>https://nft.storage/api</code>.</p>
        <p className='lh-copy white'>All requests to the HTTP API must be authenticated with a JWT access token, generated by the website and passed in the HTTP <code className='f6 black bg-white ph2 pv1 br1 ba b--black code'>Authorization</code> header like:</p>
        <pre className='db dib-ns mt0 f6 bg-white pa3 br1 ba b--black code overflow-x-scroll'>"Authorization": "Bearer YOUR_API_KEY"</pre>
        <div className='db-m flex-ns justify-center center mw9 mw-none-m mw-none-ns mh-3 mv4'>
          <Box bgColor='nsgray' borderColor='nspink' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 className='f5 fw4'><HashLink id='post-upload'><code className='bg-white ph2 pv1 br1 ba b--black'>POST /upload</code></HashLink></h2>
            <p className='lh-copy'>Store a file with <strong>nft.storage</strong>.</p>
            <p className='lh-copy'>Submit a HTTP <code className='f6 bg-white ph2 pv1 br1 ba b--black code'>POST</code> request passing the file data in the request body. e.g.</p>
            <pre className='f6 lh-copy bg-white pa3 br1 ba b--black code overflow-x-scroll'>{curlUploadEx}</pre>
            <p className='lh-copy'>Successful requests will receive a HTTP <code className='f6 bg-white ph2 pv1 br1 ba b--black'>200</code> status and <code className='f6 bg-white ph2 pv1 br1 ba b--black'>application/json</code> response like:</p>
            <pre className='f6 lh-copy bg-white pa3 br1 ba b--black code overflow-x-scroll'>{postResp}</pre>
            <p className='lh-copy'>To store multiple files in a directory, submit a <code className='f6 bg-white ph2 pv1 br1 ba b--black'>multipart/form-data</code> HTTP <code className='f6 bg-white ph2 pv1 br1 ba b--black'>POST</code> request. e.g.</p>
            <pre className='f6 lh-copy bg-white pa3 br1 ba b--black code overflow-x-scroll'>{curlUploadDirEx}</pre>
            <p className='lh-copy'>Use the <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition' className='black no-underline underline-hover' target='_blank' rel='noopener noreferrer'><code className='f6 bg-white ph2 pv1 br1 ba b--black'>Content-Disposition</code></a> header for each part to specify a filename.</p>
          </Box>
          <Box bgColor='nsgray' borderColor='nspink' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 className='f5 fw4'><HashLink id='get-cid'><code className='bg-white ph2 pv1 br1 ba b--black'>{'GET /{cid}'}</code></HashLink></h2>
            <p className='lh-copy'>Get information for the stored file CID.</p>
            <p className='lh-copy'>Includes the IPFS pinning state and the Filecoin deal state. e.g.</p>
            <pre className='f6 lh-copy bg-white pa3 br1 ba b--black code overflow-x-scroll'>{curlGetEx}</pre>
            <p className='lh-copy'>Successful requests will receive a a HTTP <code className='f6 bg-white ph2 pv1 br1 ba b--black'>200</code> status and an <code className='f6 bg-white ph2 pv1 br1 ba b--black'>application/json</code> response like:</p>
            <pre className='f6 lh-copy bg-white pa3 br1 ba b--black code overflow-x-scroll'>{getResp}</pre>
          </Box>
          <Box bgColor='nsgray' borderColor='nspink' wrapperClassName='w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4'>
            <h2 className='f5 fw4'><HashLink id='delete-cid'><code className='bg-white ph2 pv1 br1 ba b--black'>{'DELETE /{cid}'}</code></HashLink></h2>
            <p className='lh-copy'>Stop storing the content with the passed CID on <strong>nft.storage</strong>.</p>
            <ul>
              <li>Unpin the item from the underlying IPFS pinning service.</li>
              <li>Cease renewals for expired Filecoin deals involving the CID.</li>
            </ul>
            <p className='lh-copy'>⚠️ This does not remove the content from the network.</p>
            <ul>
              <li>Does not terminate any established Filecoin deal.</li>
              <li>Does not remove the content from other IPFS nodes in the network that already cached or pinned the CID.</li>
              <li>Note: the content will remain available if another user has stored the CID with <strong>nft.storage</strong>.</li>
            </ul>
            <p className='lh-copy'>E.g.</p>
            <pre className='f6 lh-copy bg-white pa3 br1 ba b--black code overflow-x-scroll'>{curlDelEx}</pre>
            <p className='lh-copy'>Successful requests will receive a HTTP <code className='f6 bg-white ph2 pv1 br1 ba b--black'>200</code> status and an <code className='f6 bg-white ph2 pv1 br1 ba b--black'>application/json</code> response like:</p>
            <pre className='f6 lh-copy bg-white pa3 br1 ba b--black code overflow-x-scroll'>{'{ "ok": true }'}</pre>
          </Box>
        </div>
        <h2 className='chicagoflf white'>
          <HashLink id='pinning-service-api-endpoints'>Pinning Service API Endpoints</HashLink>
        </h2>
        <p className='lh-copy white'>These are also available. See the <a href='https://ipfs.github.io/pinning-services-api-spec/#tag/pins' className='white'>pinning service API documentation</a> for details.</p>
      </div>
    </article>
  )
}

function FAQ () {
  return (
    <article className='bg-nsforest'>
      <div className='mw9 center pa4 pa5-ns'>
        <h1 className='chicagoflf white'>
          <HashLink id='faq'>FAQ</HashLink>
        </h1>
        <h2 className='chicagoflf white'>
          <HashLink id='how-long-will-data-be-stored-on-nftstorage'>How long will data be stored on nft.storage?</HashLink>
        </h2>
        <p className='lh-copy white'>Up to 5GB of data can be stored for FREE on IPFS for as long as this service continues. nft.storage will also use other storage mediums, like Filecoin, to ensure data is persisted longer. If this service is discontinued, 90 days notice will allow users to transition their data to other storage methods. See the <a href='/terms' className='white'>Terms of Service</a> for details.</p>
      </div>
    </article>
  )
}
