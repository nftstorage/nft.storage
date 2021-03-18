import Head from 'next/head'
import Footer from '../components/footer.js'
import Navbar from '../components/navbar.js'

export default function Layout({
  children,
  title = 'NFT Storage free decentralized storage for NFT data on IPFS and Filecoin.',
  description = '5GB storage of NFT data on IPFS and Filecoin and provided free to NFTHack participants during the hackathon.',
  user,
  loginUrl,
}) {
  return (
    <div className="sans-serif">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="manifest" href="/manifest.webmanifest"></link>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <Navbar user={user} loginUrl={loginUrl} />
      {children}
      <Footer />
    </div>
  )
}
