import { useCallback } from 'react'
import Link from './link'
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
    <footer className="bg-black block lg:flex items-center justify-between text-xs text-white py-4 px-6 sm:px-16">
      <div>
        <span className="my-4 pl-byline">
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
        <span className="block lg:inline-block my-4">
          <a
            href="https://status.nft.storage/"
            className="nspink no-underline underline-hover align-middle"
            target="_blank"
            rel="noreferrer"
            onClick={onLinkClick}
          >
            Status
          </a>
        </span>
        <Dot />
        <span className="block lg:inline-block my-4">
          <Link
            className="nspink no-underline underline-hover align-middle"
            onClick={onLinkClick}
            href="/terms"
          >
            Terms of Service
          </Link>
        </span>
        <Dot />
        <span className="block lg:inline-block my-4">
          <Link
            href="/faq"
            className="nspink no-underline underline-hover align-middle"
            onClick={onLinkClick}
          >
            FAQ
          </Link>
        </span>
        <Dot />
        <span className="block lg:inline-block my-4">
          <Link
            href="/stats"
            className="nspink no-underline underline-hover align-middle"
            onClick={onLinkClick}
          >
            Stats
          </Link>
        </span>
        <Dot />
        <span className="block lg:inline-block my-4">
          <span className="align-middle">Need Help? </span>
          <a
            href="https://github.com/nftstorage/nft.storage/issues/new"
            className="nspink underline-hover no-underline align-middle"
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
  return (
    <span className="mx-2 font-bold hidden lg:inline-block my-4 align-middle">
      •
    </span>
  )
}
