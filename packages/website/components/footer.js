import { useCallback } from 'react'
import Link from 'next/link'
import Discord from '../icons/discord'
import Twitter from '../icons/twitter'
import Github from '../icons/github'
import PLLogo from '../icons/protocolLabs'
import countly from '../lib/countly'

export default function Footer() {
  const onLinkClick = useCallback((event) => {
    countly.trackCustomLinkClick(
      countly.events.LINK_CLICK_FOOTER,
      event.currentTarget
    )
  }, [])

  return (
    <footer className="bg-black db db-m flex-ns items-center justify-between f7 white pv3 ph5">
      <div>
        <span className="mv3 pl-byline">
          Made with ❤️ by{' '}
          <a
            href="https://protocol.ai/"
            className="nspink underline-hover no-underline pl-logo"
            onClick={onLinkClick}
          >
            <PLLogo />
            Protocol Labs
          </a>
        </span>
      </div>
      <div className="social-icons">
        <a
          href="https://discord.com/invite/KKucsCpZmY"
          title="IPFS Discord (#nft-storage)"
          target="_blank"
          rel="noreferrer"
        >
          <Discord />
        </a>
        <a
          href="https://twitter.com/nft_storage"
          title="@nft_storage Twitter"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter />
        </a>
        <a
          href="https://github.com/nftstorage"
          title="NFT.Storage Github"
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </a>
      </div>
      <div>
        <span className="db db-m dib-ns mv3">
          <a
            href="https://status.nft.storage/"
            className="nspink no-underline underline-hover v-mid"
            target="_blank"
            rel="noreferrer"
            onClick={onLinkClick}
          >
            Status
          </a>
        </span>
        <Dot />
        <span className="db db-m dib-ns mv3">
          <Link href="/terms">
            <a
              className="nspink no-underline underline-hover v-mid"
              onClick={onLinkClick}
            >
              Terms of Service
            </a>
          </Link>
        </span>
        <Dot />
        <span className="db db-m dib-ns mv3">
          <Link href="/faq">
            <a
              className="nspink no-underline underline-hover v-mid"
              onClick={onLinkClick}
            >
              FAQ
            </a>
          </Link>
        </span>
        <Dot />
        <span className="db db-m dib-ns mv3">
          <span className="v-mid">Need Help? </span>
          <a
            href="https://github.com/nftstorage/nft.storage/issues/new"
            className="nspink underline-hover no-underline v-mid"
            onClick={onLinkClick}
          >
            Open an Issue
          </a>
        </span>
      </div>
    </footer>
  )
}

function Dot() {
  return <span className="mh2 b dn dn-m dib-ns mv3 v-mid">•</span>
}
