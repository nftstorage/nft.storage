import { useEffect, useState } from 'react'
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

  const [showMaintenanceBanner, setShowMaintenanceBanner] = useState(false)
  const [maintenanceMessage, setMaintenanceMessage] = useState('')

  useEffect(() => {
    fetch('https://status.nft.storage/api/v2/summary.json')
      .then((response) => response.json())
      .then((data) => {
        const scheduledMaintenances = data.scheduled_maintenances.filter(
          (/** @type {{ status: string; }} */ m) => m.status !== 'completed'
        )
        if (scheduledMaintenances.length > 0) {
          setShowMaintenanceBanner(true)
          setMaintenanceMessage(
            data.scheduled_maintenances[0].incident_updates[0].body
          )
        } else {
          fetch('https://api.nft.storage/version')
            .then((response) => response.json())
            .then((data) => {
              setShowMaintenanceBanner(data.mode !== 'rw')
              setMaintenanceMessage(
                data.mode !== 'rw'
                  ? 'The NFT.Storage API is currently undergoing maintenance...'
                  : ''
              )
            })
        }
      })
  }, [children])

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
          {showMaintenanceBanner && (
            <div className="bg-yellow bb b--black" style={{ zIndex: 50 }}>
              <div className="lh-copy mw9 tc center pv3 ph3-ns">
                <span className="f4">⚠️</span> {maintenanceMessage}
              </div>
            </div>
          )}
          <Navbar bgColor={navBgColor} user={user} />
          {children({ user })}
          <Footer />
        </>
      )}
    </div>
  )
}
