import Head from 'next/head'
import Footer from './footer.js'
import Navbar from './navbar.js'

export default function Layout({
  children,
  title = 'NFT Storage - Decentralized storage on IPFS and Filecoin.',
  description = 'NFT Storage is a brand new service in private BETA, built specifically for storing off-chain NFT data.',
  user,
  loginUrl,
  navBgColor = 'nsorange',
}) {
  return (
    <div className="sans-serif">
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
      <Navbar user={user} loginUrl={loginUrl} bgColor={navBgColor} />
      {children}
      <Footer />
    </div>
  )
}
