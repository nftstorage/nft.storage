import { useCallback } from 'react'
import fs from 'fs'
import countly from '../lib/countly.js'
import Hero from '../components/hero.js'
import HashLink from '../components/hashlink.js'
import Step from '../components/step.js'
import Box from '../components/box.js'
import Link from 'next/link'
import { FAQ } from './faq'

export async function getStaticProps() {
  const logos = fs.readdirSync('public/images/marketplace-logos')
  // make opensea be the first logo
  logos.sort((a, b) =>
    a.includes('opensea') ? -1 : b.includes('opensea') ? 1 : 0
  )

  return {
    props: {
      needsUser: true,
      logos,
      description: 'NFT.Storage homepage',
    },
  }
}

/**
 * Logo Component
 * @param {Object} props
 * @param {string} props.src
 */
const Logo = ({ src }) => (
  <img
    className="marketplace-logo"
    src={`images/marketplace-logos/${src}`}
    alt="Nft.Storage Users"
  />
)

/**
 * Logos Component
 * @param {Object} props
 * @param {string[]} props.logos
 *
 */
const Logos = ({ logos }) => {
  return (
    <div className="marketplace-logos-container center pv4 ph3 ph5-ns">
      <h2 className="tc mt0 chicagoflf">Trusted by</h2>
      <div className="marketplace-logo-grid">
        {logos.map(logo => (
          <Logo key={`marketplace-logo-${logo}`} src={logo} />
        ))}
      </div>
      <p className="tc chicagoflf">and 10,000+ other users!</p>
    </div>
  )
}

/**
 * Home Component
 * @param {Object} props
 * @param {string[]} props.logos
 *
 */
export default function Home({ logos }) {
  return (
    <>
      <Hero />
      <main className="bg-nsltblue">
        <Logos logos={logos} />
        <About />
        <GettingStarted />
        <article className="bg-nsforest">
          <div className="mw9 center pa4 pa5-ns">
            <h2 className="chicagoflf white">
              <HashLink id="faq">FAQ</HashLink>
            </h2>
            <FAQ limit={5} />
            <h3 className="chicagoflf white">
              More FAQs{' '}
              <Link href="/faq">
                <a className="white underline">here</a>
              </Link>
            </h3>
          </div>
        </article>
      </main>
    </>
  )
}

function About() {
  const storeText = (
    <>
      <h3 className="chicagoflf">
        <HashLink id="store">Store</HashLink>
      </h3>
      <p className="lh-copy">
        Just upload your data and you&#39;ll receive an IPFS hash of the content
        (a &quot;CID,&quot; or content address) that you can use to make an IPFS
        URL (<code>ipfs://&lt;cid&gt;</code>). Use this IPFS URL in your NFT
        data to refer to <strong>off-chain</strong> data (e.g., the metadata
        field in your NFT, the image field in your metadata) as a pointer to the
        content.
      </p>
      <p className="lh-copy">
        Filecoin provides long-term storage for the data ensuring that even if
        NFT.Storage is attacked or taken down the NFT data persists! And
        NFT.Storage will continue to decentralize itself out of the picture
        moving forward (e.g., making perpetual storage completely smart
        contract-based utilizing future tools like the{' '}
        <a
          className="black"
          href="https://filecoin.io/blog/posts/introducing-the-filecoin-virtual-machine/"
          target="_blank"
          rel="noreferrer"
        >
          Filecoin Virtual Machine
        </a>
        ).
      </p>
      <p className="lh-copy">
        Have additional preferences on where to store your data? Pin your data
        to any storage solution running a{' '}
        <a
          href="https://docs.ipfs.io/how-to/work-with-pinning-services/"
          className="black"
          target="_blank"
          rel="noreferrer"
        >
          pinning service
        </a>
        .
      </p>
    </>
  )
  const retrieveText = (
    <>
      <h3 className="chicagoflf">
        <HashLink id="retrieve">Retrieve</HashLink>
      </h3>
      <p className="lh-copy">
        NFT data stored by <strong>NFT.Storage</strong> can be accessed from the
        decentralized IPFS network from <em>any</em> peer that has the content.
        CIDs reference <strong>immutable</strong> content so you can be sure the
        content you access is the content referenced in the NFT.
      </p>
      <p className="lh-copy">
        The data can be fetched directly in the browser using{' '}
        <a
          href="https://brave.com/ipfs-support/"
          className="black"
          target="_blank"
          rel="noopener noreferrer"
        >
          Brave
        </a>
        , or via a{' '}
        <a
          href="https://docs.ipfs.io/concepts/ipfs-gateway/#public-gateways"
          className="black"
          target="_blank"
          rel="noopener noreferrer"
        >
          public IPFS gateway
        </a>
        , or by using{' '}
        <a
          href="https://github.com/nftstorage/ipfs-desktop"
          className="black"
          target="_blank"
          rel="noopener noreferrer"
        >
          IPFS Desktop
        </a>{' '}
        or the{' '}
        <a
          href="https://docs.ipfs.io/how-to/command-line-quick-start/"
          className="black"
          target="_blank"
          rel="noopener noreferrer"
        >
          IPFS command line
        </a>
        .
      </p>
      <p className="lh-copy">
        If fetching content using a public IPFS gateway (e.g., directly using an
        HTTP URL or via Brave), note that the availability and speed of
        retrieving the content depends on the gateway. In cases where the
        gateway is unable to retrieve a given CID (e.g., returns a 429 error),
        you can try a different gateway or running and using your own IPFS node
        instead.
      </p>
    </>
  )
  return (
    <article className="about-section bg-nsgreen">
      <div className="mw9 center pa4">
        <div className="about-text mw9">
          <h2 className="chicagoflf">
            <HashLink id="about">About</HashLink>
          </h2>
          <div className="two-column-collapsible pv2">
            <div>
              <p className="lh-copy">
                <strong>NFT.Storage</strong> is a long-term storage service
                designed for <strong>off-chain</strong> NFT data (like metadata,
                images, and other assets) for up to 31GiB in size. Data is{' '}
                <a
                  href="https://nftschool.dev/concepts/content-addressing"
                  className="black"
                  target="_blank"
                  rel="noreferrer"
                >
                  content addressed
                </a>{' '}
                using IPFS, meaning the URL pointing to a piece of data
                (“ipfs://…”) is completely unique to that data. IPFS URLs can be
                used in NFTs and metadata to ensure the NFT forever actually
                refers to the intended data (eliminating things like rug pulls).
              </p>
            </div>
            <div>
              <p className="lh-copy">
                NFT.Storage stores many copies of uploaded data on the public
                IPFS network in two primary ways: in dedicated IPFS servers
                managed by NFT.Storage, and decentralized on{' '}
                <a
                  href="https://filecoin.io"
                  className="black"
                  target="_blank"
                  rel="noreferrer"
                >
                  Filecoin
                </a>
                . Since IPFS is a standard used by many different storage
                services, it&apos;s easy to redundantly store data uploaded to
                NFT.Storage on any other IPFS-compatible storage solution from{' '}
                <a
                  href="https://docs.ipfs.io/how-to/work-with-pinning-services/"
                  className="black"
                  target="_blank"
                  rel="noreferrer"
                >
                  pinning services
                </a>
                , to your{' '}
                <a
                  href="https://docs.ipfs.io/install/ipfs-desktop/#windows"
                  className="black"
                  target="_blank"
                  rel="noreferrer"
                >
                  local IPFS node
                </a>
                , to other decentralized networks like Arweave or Storj.
              </p>
            </div>
          </div>
        </div>
        <div className="store-and-retrieve-mobile">
          <div>
            {storeText}
            <div className="tc mv4">
              <img
                src="images/diagram-store.png"
                alt="diagram of storage with NFT.Storage"
                width="1152"
                height="1650"
                style={{ maxWidth: '576px', height: 'auto', width: '100%' }}
              />
            </div>
          </div>
          <div>
            {retrieveText}
            <div className="tc mv4">
              <img
                src="images/diagram-retrieve.png"
                alt="diagram of retrieval with NFT.Storage"
                width="1262"
                height="1260"
                style={{ maxWidth: '631px', height: 'auto', width: '100%' }}
              />
            </div>
          </div>
        </div>
        <div className="relative store-and-retrieve-desktop">
          <div className="tr">
            <img
              src="images/diagram-store-and-retrieve.png"
              srcSet="images/diagram-store-and-retrieve@2x.png 2x"
              alt="diagram of storage and retrieval with NFT.Storage"
              width="1177"
              style={{ width: '1177px', height: 'auto', maxWidth: '90%' }}
            />
          </div>
          <div className="absolute top-0 w-100 h-100 flex justify-between">
            <div className="flex-auto" style={{ maxWidth: '35%' }}>
              <div className="pt6">{storeText}</div>
            </div>
            <div
              className="flex-auto flex items-center w-50"
              style={{ maxWidth: '35%', paddingBottom: '4rem' }}
            >
              <div>{retrieveText}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function GettingStarted() {
  const onClickHandler = useCallback(event => {
    countly.trackCustomLinkClick(
      countly.events.CTA_LINK_CLICK,
      event.currentTarget,
      {
        ui: countly.ui.HOME_GET_STARTED,
      }
    )
  }, [])

  const jsEx = `import { NFTStorage, File } from 'nft.storage'
import { pack } from 'ipfs-car/pack';

const apiKey = 'YOUR_API_KEY'
const client = new NFTStorage({ token: apiKey })

const metadata = await client.store({
  name: 'Pinpie',
  description: 'Pin is not delicious beef!',
  image: new File([/* data */], 'pinpie.jpg', { type: 'image/jpg' })
})
console.log(metadata.url)
// ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json`

  const curlEx = `curl -X POST --data-binary @art.jpg -H 'Authorization: Bearer YOUR_API_KEY' https://api.nft.storage/upload`

  const uploadResp = `{
  "ok": true,
  "value": { "cid": "bafy..." }
}`

  return (
    <article className="bg-yellow">
      <div className="mw9 center pa4 pa5-ns">
        <h2 className="chicagoflf tc mb5">
          <HashLink id="getting-started">Getting started</HashLink>
        </h2>
        <ol className="list tc pl0 mb5">
          <li>
            <Step>1</Step>
            <p className="chicagoflf f3 mw6 center">
              <Link href="/login">
                <a
                  className="no-underline underline-hover nsnavy"
                  onClick={onClickHandler}
                >
                  Register an NFT.Storage account
                </a>
              </Link>{' '}
              so that you can create API access keys.
            </p>
            <img
              width="29px"
              height="66px"
              src="images/icon-arrow-down.svg"
              alt="arrow down"
              className="mb3"
            />
          </li>
          <li>
            <Step>2</Step>
            <p className="chicagoflf f3 mw6 center">
              <Link href="/manage">
                <a
                  className="no-underline underline-hover nsnavy"
                  onClick={onClickHandler}
                >
                  Create an API access key
                </a>
              </Link>{' '}
              and note it down.
            </p>
            <img
              width="29px"
              height="66px"
              src="images/icon-arrow-down.svg"
              alt="arrow down"
              className="mb3"
            />
          </li>
          <li>
            <Step>3</Step>
            <p className="chicagoflf f3 mw6 center">
              Choose a method to get your NFT data stored:
            </p>
          </li>
        </ol>
        <div
          id="docs"
          className="db-m flex-ns justify-center center mw9 mw-none-m mw-none-ns mh-3"
        >
          <Box
            bgColor="nspeach"
            borderColor="nsnavy"
            wrapperClassName="w-100 w-100-m w-50-ns mh0 mh0-m mh3-ns mb4"
          >
            <h3 className="chicagoflf f5 fw4">
              <HashLink id="js-client-library">JS Client Library</HashLink>
            </h3>
            <p className="lh-copy">
              Install the{' '}
              <a
                href="https://npmjs.org/package/nft.storage"
                target="_blank"
                rel="noopener noreferrer"
                className="black"
              >
                JS library
              </a>
              :
            </p>
            <pre className="f6 lh-copy white bg-nsnavy pa3 br1 ba b--black code overflow-x-scroll">
              npm install nft.storage
            </pre>
            <p className="lh-copy">Use the client in Node.js or the browser:</p>
            <pre className="f6 lh-copy white bg-nsnavy pa3 br1 ba b--black code overflow-x-scroll">
              {jsEx}
            </pre>
            <p className="lh-copy">
              View the{' '}
              <a
                href="https://nftstorage.github.io/nft.storage/client/"
                target="_blank"
                rel="noopener noreferrer"
                className="black"
              >
                full library reference docs
              </a>
              .
            </p>
            <p className="lh-copy">
              For additional example code, check out our{' '}
              <a
                className="black"
                href="https://github.com/nftstorage/nft.storage/tree/main/packages/client/examples/node.js"
                target="_blank"
                rel="noreferrer"
              >
                GitHub repo
              </a>{' '}
              and{' '}
              <a
                className="black"
                href="https://nftschool.dev/tutorial/end-to-end-experience/"
                target="_blank"
                rel="noreferrer"
              >
                NFT School.
              </a>
            </p>
          </Box>
          <Box
            bgColor="nspeach"
            borderColor="nspink"
            wrapperClassName="w-100 w-100-m w-50-ns mh0 mh0-m mh3-ns mb4"
          >
            <h3 className="chicagoflf f5 fw4">
              <HashLink id="raw-http-request">Raw HTTP Request</HashLink>
            </h3>
            <p className="lh-copy">
              Configure your HTTP client and set the{' '}
              <code className="f6 bg-nspink ph2 pv1 br1 ba b--black code">
                Authorization
              </code>{' '}
              header:
            </p>
            <pre className="f6 lh-copy bg-nspink pa3 br1 ba b--black code overflow-x-scroll">
              &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;
            </pre>
            <p className="lh-copy">
              Submit a HTTP{' '}
              <code className="f6 bg-nspink ph2 pv1 br1 ba b--black code">
                POST
              </code>{' '}
              request to{' '}
              <span className="black underline">api.nft.storage/upload</span>{' '}
              passing the file data in the request body. e.g.
            </p>
            <pre className="f6 lh-copy bg-nspink pa3 br1 ba b--black code overflow-x-scroll">
              {curlEx}
            </pre>
            <p className="lh-copy">
              Successful requests will receive a HTTP{' '}
              <code className="f6 bg-nspink ph2 pv1 br1 ba b--black code">
                200
              </code>{' '}
              status and{' '}
              <code className="f6 bg-nspink ph2 pv1 br1 ba b--black code">
                application/json
              </code>{' '}
              response like:
            </p>
            <pre className="f6 lh-copy bg-nspink pa3 br1 ba b--black code overflow-x-scroll">
              {uploadResp}
            </pre>
            <p className="lh-copy">
              Check the{' '}
              <Link href="/api-docs">
                <a className="black">API Docs</a>
              </Link>{' '}
              for information on uploading multiple files and the other
              available endpoints.
            </p>
            <p className="lh-copy">
              For additional example code, check out our{' '}
              <a
                className="black"
                href="https://github.com/nftstorage/nft.storage/tree/main/packages/client/examples/browser"
                target="_blank"
                rel="noreferrer"
              >
                GitHub repo
              </a>
              .
            </p>
          </Box>
          {/* <Box
            bgColor="nspeach"
            borderColor="nsred"
            wrapperClassName="w-100 w-100-m w-33-ns mh0 mh0-m mh3-ns mb4"
          >
            <h2 className="chicagoflf f5 fw4">
              <HashLink id="configure-as-a-remote-pinning-service">
                Configure as a Remote Pinning Service
              </HashLink>
            </h2>
            <p className="lh-copy">
              You can use <strong>nft.storage</strong> as a{' '}
              <a
                href="https://ipfs.github.io/pinning-services-api-spec"
                className="black"
              >
                remote pinning service
              </a>{' '}
              in IPFS.
            </p>
            <pre className="f6 lh-copy white bg-nsred pa3 br1 ba b--black code overflow-x-scroll">
              ipfs pin remote service add nft-storage https://api.nft.storage
              YOUR_API_KEY
            </pre>
            <p className="lh-copy">
              Use the{' '}
              <code className="f6 white bg-nsred ph2 pv1 br1 ba b--black code">
                --help
              </code>{' '}
              option for information on other remote pinning service commands:
            </p>
            <pre className="f6 lh-copy white bg-nsred pa3 br1 ba b--black code overflow-x-scroll">
              ipfs pin remote --help
            </pre>
          </Box> */}
        </div>
      </div>
    </article>
  )
}
