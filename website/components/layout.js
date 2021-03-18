import Head from 'next/head'
import Footer from './footer.js'
import Navbar from './navbar.js'

export default function Layout({
  children,
  title = 'NFT Storage free decentralized storage for NFT data on IPFS and Filecoin.',
  description = '5GB storage of NFT data on IPFS and Filecoin and provided free to NFTHack participants during the hackathon.',
  user,
  loginUrl,
  navBgColor = 'nsorange'
}) {
  return (
    <div className="sans-serif">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Navbar user={user} loginUrl={loginUrl} bgColor={navBgColor}/>
      {children}
      <Footer />
    </div>
  )
}
