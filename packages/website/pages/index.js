import { useCallback, useEffect } from 'react'
import fs from 'fs'
import countly from '../lib/countly.js'
import Hero from '../components/hero.js'
import HashLink from '../components/hashlink.js'
import Step from '../components/step.js'
import Link from '../components/link'
import Button from '../components/button'
import { TrustedBy } from '../components/trustedByLogos'

export async function getStaticProps() {
  const logos = fs.readdirSync('public/images/marketplace-logos/home')
  // make opensea be the first logo
  const logosWithDir = logos
    .sort((a, b) =>
      a.includes('opensea') ? -1 : b.includes('opensea') ? 1 : 0
    )
    .map((logo) => {
      const cleanedFileName = logo.replace(/\.[^/.]+$/, '')
      return {
        src: `home/${logo}`,
        alt: cleanedFileName + ' logo',
      }
    })

  return {
    props: {
      logos: logosWithDir,
      description: 'NFT.Storage homepage',
    },
  }
}

/**
 * Home Component
 * @param {Object} props
 * @param {string[]} props.logos
 *
 */
export default function Home({ logos }) {
  useEffect(() => {
    if (window.location.hash) {
      location.hash = window.location.hash
    }
  }, [])
  return (
    <>
      <Hero />
      <main className="bg-nsltblue">
        <TrustedBy logos={logos} />
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
      <p className="leading-normal mb-4">
        Just upload your data and you&#39;ll receive an IPFS hash of the content
        (a &quot;CID,&quot; or content address) that you can use to make an IPFS
        URL (<code>ipfs://&lt;cid&gt;</code>). Use this IPFS URL in your NFT
        data to refer to <strong>off-chain</strong> data (e.g., the metadata
        field in your NFT, the image field in your metadata) as a pointer to the
        content itself, so no one can dispute what your NFT is.
      </p>
      <p className="leading-normal mb-4">
        Filecoin provides long-term storage for the data ensuring that even if
        NFT.Storage is attacked or taken down the NFT data persists! This
        storage is trustlessly verifiable (with on-chain, cryptographic proofs
        that data is stored as promised). And NFT.Storage will continue to{' '}
        <a
          className="black"
          href="https://nft.storage/blog/post/2022-01-20-decentralizing-nft-storage/"
          target="_blank"
          rel="noreferrer"
        >
          decentralize itself
        </a>{' '}
        out of the picture moving forward (e.g., making perpetual storage
        completely smart contract-based utilizing future tools like the{' '}
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
      <p className="leading-normal mb-4">
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
      <p className="leading-normal mb-4">
        NFT data stored by <strong>NFT.Storage</strong> can be accessed from the
        decentralized IPFS network from <em>any</em> peer that has the content.
        CIDs reference <strong>immutable</strong> content so you can be sure the
        content you access is the content referenced in the NFT.
      </p>
      <p className="leading-normal mb-4">
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
          href="https://github.com/ipfs/ipfs-desktop"
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
      <p className="leading-normal mb-4">
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
      <div className="max-w-7xl mx-auto p-8 px-6 sm:px-16">
        <div className="max-w-none text-left p-0">
          <h2 className="chicagoflf">
            <HashLink id="about">About</HashLink>
          </h2>
          <div className="flex flex-col flex-1 py-4 xl:flex-row">
            <div className="w-full xl:w-1/2 xl:pr-4 mb-4">
              <p className="leading-normal">
                <strong>NFT.Storage</strong> is a long-term storage service
                designed for <strong>off-chain</strong> NFT data (like metadata,
                images, and other assets) for up to 31GiB in size per individual
                upload. Data is{' '}
                <a
                  href="https://nftschool.dev/concepts/content-addressing"
                  className="black"
                  target="_blank"
                  rel="noreferrer"
                >
                  content addressed
                </a>{' '}
                using IPFS, meaning the URI pointing to a piece of data
                (“ipfs://…”) is completely unique to that data (using a{' '}
                <a
                  href="https://docs.ipfs.io/concepts/content-addressing/"
                  className="black"
                  target="_blank"
                  rel="noreferrer"
                >
                  content identifier
                </a>
                , or CID). IPFS URLs and CIDs can be used in NFTs and metadata
                to ensure the NFT forever actually refers to the intended data
                (eliminating things like rug pulls, and making it trustlessly
                verifiable what content an NFT is associated with).
              </p>
            </div>
            <div className="w-full xl:w-1/2 xl:pr-4 mb-4">
              <p className="leading-normal">
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
                , to other storage networks like Arweave or Storj. And as time
                goes on, NFT.Storage will increasingly{' '}
                <a
                  href="https://nft.storage/blog/post/2022-01-20-decentralizing-nft-storage/"
                  className="black"
                  target="_blank"
                  rel="noreferrer"
                >
                  decentralize itself
                </a>{' '}
                as a public good!
              </p>
            </div>
          </div>
        </div>
        <div className="block xl:hidden">
          <div>
            {storeText}
            <div className="text-center my-8">
              <img
                src="images/diagram-store.png"
                alt="diagram of storage with NFT.Storage"
                width="1152"
                height="1650"
                className="block mx-auto w-full max-w-[575px]"
              />
            </div>
          </div>
          <div>
            {retrieveText}
            <div className="text-center my-8">
              <img
                src="images/diagram-retrieve.png"
                alt="diagram of retrieval with NFT.Storage"
                width="1262"
                height="1260"
                className="block mx-auto w-full max-w-[630px]"
              />
            </div>
          </div>
        </div>
        <div className="relative hidden xl:block">
          <div className="text-right">
            <img
              src="images/diagram-store-and-retrieve.png"
              srcSet="images/diagram-store-and-retrieve@2x.png 2x"
              alt="diagram of storage and retrieval with NFT.Storage"
              width="1177"
              className="inline-block h-auto max-w-[84%]"
            />
          </div>
          <div className="absolute top-0 w-full h-full flex justify-between">
            <div className="flex-auto max-w-[35%]">
              <div className="pt-32">{storeText}</div>
            </div>
            <div className="flex-auto flex items-center w-1/2 max-w-[35%] pb-16">
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
      <div className="max-w-7xl mx-auto p-8 sm:p-16">
        <h2 className="chicagoflf text-center mb-16 text-black">
          <HashLink id="getting-started">Getting started is easy</HashLink>
        </h2>
        <div className="grid gap-[clamp(2rem,_6vw,_6rem)] md:grid-cols-2 items-center">
          <img
            src="/images/getting-started.png"
            alt="getting-started"
            className="border-solid border-black border-2 w-full"
          />
          <ol className="list-none pl-0 mb-2">
            <li>
              <Step>1</Step>
              <p className="chicagoflf text-base sm:text-xl mx-auto mb-8 leading-normal">
                <Link href="/login" className="nsnavy" onClick={onClickHandler}>
                  Create an NFT.Storage account
                </Link>{' '}
                and start uploading your files to IPFS. Or download and use our{' '}
                <Link href="/docs/how-to/nftup" className="nsnavy">
                  NFTUp application
                </Link>
                {'. '}
                Your data will be accessible on the IPFS network where it is
                perpetually and verifiably stored by multiple Filecoin storage
                providers!
              </p>
            </li>
            <li>
              <Step>2</Step>
              <p className="chicagoflf text-base sm:text-xl mx-auto leading-normal">
                Use IPFS links when minting your NFT and metadata. As long as
                your NFT uses IPFS content identifiers (a hash of the data), no
                one can dispute what content your NFT is referring to!
              </p>
            </li>
          </ol>
        </div>
        <div className="my-16 mx-auto text-center">
          <h4 className="sm:text-2xl text-xl my-8 chicagoflf">
            Are you a developer? We have an API for that!
          </h4>
          <div className="flex justify-center">
            <Button
              className="mx-4 mb-4"
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
