import { useCallback } from 'react'
import fs from 'fs'
import countly from '../lib/countly.js'
import Hero from '../components/hero.js'
import HashLink from '../components/hashlink.js'
import Step from '../components/step.js'
import Link from 'next/link'
import Button from '../components/button'

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
        {logos.map((logo) => (
          <Logo key={`marketplace-logo-${logo}`} src={logo} />
        ))}
      </div>
      <p className="tc chicagoflf">and 20,000+ other users!</p>
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
  const onClickHandler = useCallback((event) => {
    countly.trackCustomLinkClick(
      countly.events.CTA_LINK_CLICK,
      event.currentTarget,
      {
        ui: countly.ui.HOME_GET_STARTED,
      }
    )
  }, [])

  return (
    <article className="bg-yellow">
      <div className="mw9 center pa4 pa5-ns">
        <h2 className="chicagoflf tc mb5">
          <HashLink id="getting-started">Getting started is easy</HashLink>
        </h2>
        <div className="getting-started-callout">
          <img src="/images/getting-started.png" alt="getting-started" />
          <ol className="list pl0 mb2">
            <li>
              <Step>1</Step>
              <p className="chicagoflf f4 f3-ns center mb4 lh-copy">
                <Link href="/login">
                  <a className="nsnavy" onClick={onClickHandler}>
                    Create an NFT.Storage account
                  </a>
                </Link>{' '}
                and start uploading your files to IPFS.
              </p>
            </li>
            <li>
              <Step>2</Step>
              <p className="chicagoflf f4 f3-ns center lh-copy">
                Mint your NFTs on any blockchain and share them with any
                gallery.
              </p>
            </li>
          </ol>
        </div>
        <div className="mv5 center tc">
          <h4 className="f3-ns f4 mv4 chicagoflf">
            Are you a developer? We have an API for that!
          </h4>
          <div className="flex justify-center">
            <Button
              className="mh3 mb3"
              href="/docs"
              // tracking={{ ui: countly.ui.HOME_HERO, action: 'Get Started' }}
            >
              View Docs
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
