import Head from 'next/head'
import Footer from './footer.js'
import Navbar from './navbar.js'
import Loading from './loading'
import { useUser } from '../lib/user'

/**
 * @typedef {import('react').ReactChildren} Children
 * @typedef {(props: import('./types.js').LayoutChildrenProps) => Children} ChildrenFn
 */
/**
 *
 * @param {import('./types.js').LayoutProps & {children: ChildrenFn}} props
 * @returns
 */
export default function Layout({
  callback,
  needsUser = false,
  children,
  redirectTo,
  redirectIfFound = false,
  title = 'NFT Storage - Free decentralized storage and bandwidth for NFTs on IPFS and Filecoin.',
  description = 'NFT Storage is a brand new service, built specifically for storing off-chain NFT data on IPFS and Filecoin.',
  navBgColor = 'bg-nsorange',
}) {
  const { user, status } = useUser({
    redirectTo,
    redirectIfFound,
    enabled: needsUser,
  })
  const shouldWaitForUser = needsUser && status === 'loading'

  return (
    <div className="sans-serif flex flex-column min-vh-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nft.storage" />
        <meta
          property="og:image"
          content="https://nft.storage/images/social.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@protocollabs" />
        <meta name="twitter:creator" content="@protocollabs" />
      </Head>
      {shouldWaitForUser ? (
        <Loading />
      ) : callback ? (
        <>
          <Loading />
          {children({ user })}
        </>
      ) : (
        <>
          <Navbar bgColor={navBgColor} user={user} />
          {children({ user })}
          <Footer />
        </>
      )}
    </div>
  )
}
