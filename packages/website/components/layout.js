import Footer from './footer.js'
import Head from 'next/head'
import Loading from './loading'
import Navbar from './navbar.js'
import { getStatusPageSummary } from '../lib/statuspage-api'
import { getVersion } from '../lib/api'
import { useQuery } from 'react-query'
import { useUser } from '../lib/user'

const MaintenanceBanner = () => {
  let bannerMessage = ''

  const { data: statusPageData, error: statusPageError } = useQuery(
    'get-statuspage-summary',
    () => getStatusPageSummary()
  )

  const incidents = (statusPageData?.incidents || []).filter(
    (/** @type {{ resolved_at: string; }} */ incident) => !incident.resolved_at
  )

  const scheduledMaintenances =
    statusPageData?.scheduled_maintenances.filter(
      (/** @type {{ status: string; }} */ maintenance) =>
        maintenance.status !== 'completed'
    ) || []

  const { data: apiVersionData, error: apiVersionError } = useQuery(
    'get-version',
    () => getVersion(),
    {
      enabled:
        (statusPageData && scheduledMaintenances.length === 0) ||
        statusPageError !== null,
    }
  )

  if (scheduledMaintenances.length > 0) {
    bannerMessage = scheduledMaintenances[0].incident_updates[0].body
  }

  if (apiVersionData && apiVersionData.mode !== 'rw' && !bannerMessage) {
    bannerMessage = 'The NFT.Storage API is currently undergoing maintenance...'
  }

  if (incidents.length > 0) {
    bannerMessage = incidents[0].incident_updates?.[0]?.body
  }

  if (statusPageError) {
    console.log(statusPageError)
  }

  if (apiVersionError) {
    console.log(apiVersionError)
  }

  if (bannerMessage) {
    return (
      <div className="bg-yellow border border-solid border-black z-50">
        <div className="leading-normal max-w-7xl text-center mx-auto py-4 px-4">
          <span className="text-xl">⚠</span> {bannerMessage}
        </div>
      </div>
    )
  } else {
    return null
  }
}

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
  children,
  title = 'NFT.Storage - Free decentralized storage and bandwidth for NFTs on IPFS & Filecoin.',
  description = 'NFT Storage is a brand new service, built specifically for storing off-chain NFT data on IPFS and Filecoin.',
  navBgColor = 'bg-nsorange',
  altLogo = false,
  image = 'https://nft.storage/images/social.png',
}) {
  // @ts-ignore
  const { user } = useUser()

  const logo = {
    src: altLogo
      ? '/images/logo-nft-storage-inline-dark.svg'
      : '/images/logo-nft-storage-inline.svg',
    isDark: altLogo,
  }

  const jsonLD = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NFT.Storage',
    slogan:
      'Free decentralized storage and bandwidth for NFTs on IPFS & Filecoin.',
    url: 'https://nft.storage',
    logo: 'https://nft.storage/images/social-1200x800.png',
  })

  return (
    <div className="nft-storage font-sans flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nft.storage" />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@protocollabs" />
        <meta name="twitter:creator" content="@protocollabs" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLD }}
        ></script>
      </Head>
      {callback ? (
        <>
          <Loading />
          {children({ user })}
        </>
      ) : (
        <>
          <MaintenanceBanner />
          <Navbar bgColor={navBgColor} logo={logo} user={user} />
          <div className="flex flex-col flex-auto">{children({ user })}</div>
          <Footer />
        </>
      )}
    </div>
  )
}
