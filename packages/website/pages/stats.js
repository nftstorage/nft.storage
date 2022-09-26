import { useEffect, useState } from 'react'
import { NftUpCta } from '../components/nftUpCta'
import fs from 'fs'
import { calculateStats, calculateMarketStats } from '../lib/statsUtils'
import Img from '../components/cloudflareImage'
import { API } from '../lib/api'
import Loading from '../components/loading'
import bytes from 'bytes'
import NetlifyPartial from '../components/netlifyPartial'
import { TrustedBy } from 'components/trustedByLogos'
import { NFT_PORT_ENDPOINT, NFT_PORT_API_KEY } from '../lib/constants'
import Link from 'components/link'

/**
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */

export function getStaticProps() {
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
      title: 'Stats - NFT Storage',
      description: 'NFT.Storage usage stats',
      needsUser: false,
      logos: logosWithDir,
    },
  }
}

/**
 * Stats Page
 * @param {Object} props
 * @param {string[]} props.logos
 *
 */
export default function Stats({ logos }) {
  /** @type [any, any] */
  const [stats, setStats] = useState({})
  /** @type [any, any] */
  const [marketStats, setMarketStats] = useState({})
  const [statsLoading, setStatsLoading] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    setStatsLoading(true)
    try {
      const nftPortStats = await fetch(NFT_PORT_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: NFT_PORT_API_KEY,
        },
        redirect: 'follow',
      })
      const data = await nftPortStats.json()
      setMarketStats(await calculateMarketStats(data.report))
    } catch (e) {
      const fakeData = {
        totalNfts: 91100000,
        totalMarketValueUSD: 26800000000,
        totalMarketValue: 0,
        totalMissing: 1150000,
        missingPercentage: 22.3,
        missingMarketValueUSD: 874700000,
        missingMarketValue: 0,
      }
      setMarketStats(fakeData)
    }
    try {
      const stats = await fetch(`${API}/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
      setStats(calculateStats(stats.data))
    } catch (e) {
      const fakeData = {
        ok: true,
        data: {
          deals_size_total: 249523372029443,
          deals_size_total_prev: 249523372020000,
          uploads_past_7_total: 2011366,
          uploads_nft_total: 685866,
          uploads_remote_total: 11077834,
          uploads_car_total: 17711308,
          uploads_multipart_total: 1456388,
          uploads_blob_total: 12420729,
        },
      }
      setStats(calculateStats(fakeData.data))
    }
    setStatsLoading(false)
  }

  const DescriptionSection = () => {
    const pClass = 'my-8 text-xl leading-8'
    return (
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-16 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 pr-2 leading">
          <h1 className="text-4xl md:text-5xl chicagoflf">
            The Case for{' '}
            <span className="sm:whitespace-nowrap">Decentralized Storage</span>
          </h1>
          <div>
            <p className={pClass}>
              NFTs represent a new era in verifiable and trustless ownership,
              but what if that awesome 1/1 art piece you bought wasn’t using a
              decentralized persistent storage solution?
            </p>
            <p className={pClass}>
              Well...the proof of your purchase doesn’t mean as much now does it
              if the art can simply be changed or moved somewhere else?
            </p>
            <p className={pClass}>
              Of course NFTs can be more than just art, but NFTs without
              trustless storage fall into the same traps that web3 is aiming to
              solve.
            </p>
          </div>
        </div>
        <div className="flex lg:w-1/2 items-center justify-center pl-2">
          <Img
            src="/images/decentralized.png"
            alt="decentralized storage"
            height={300}
            width={300}
          />
        </div>
      </div>
    )
  }

  /* TODO: uncomment this when we have copy */
  // const WhyItMattersSection = () => {
  //   return (
  //     <div className="max-w-7xl mx-auto py-16 px-6 sm:px-16">
  //       <h2 className="text-3xl md:text-[2.375rem] chicagoflf mb-7">
  //         Why it matters...
  //       </h2>
  //       <div className="why-it-matters-card p-5 md:p-16 lg:p-20 md:flex flex-col lg:flex-row">
  //         <div className="lg:w-1/2">
  //           <h3 className="chicagoflf text-2xl md:text-[1.875rem]">
  //             For Creators/Artists
  //           </h3>
  //           <ul className="checked pr-14 mt-7">
  //             <li>strengthening argument number 1</li>
  //             <li>
  //               strengthening argument number 2 with a lot more text that maybe
  //               goes on for a few lines or a whole paragraph
  //             </li>
  //             <li>strengthening argument number 3</li>
  //             <li>
  //               strengthening argument number 4 with a lot more text that maybe
  //               goes on for a few lines or a whole paragraph maybe goes on for a
  //               few lines or a whole paragraph
  //             </li>
  //           </ul>
  //         </div>
  //         <div className="lg:w-1/2">
  //           <h3 className="chicagoflf text-2xl md:text-[1.875rem]">
  //             For Collectors
  //           </h3>
  //           <ul className="checked mt-7">
  //             <li>strengthening argument number 1</li>
  //             <li>
  //               strengthening argument number 2 with a lot more text that maybe
  //               goes on for a few lines or a whole paragraph
  //             </li>
  //             <li>strengthening argument number 3</li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  /**
   * @param {Object} props
   * @param {string} [props.title]
   * @param {any} [props.children]
   */
  const StatCard = ({ children }) => {
    return (
      <div className="stats-card relative text-center flex flex-1 z-10 p-0">
        {children}
      </div>
    )
  }

  /**
   * @param {Object} props
   * @param {string} [props.title]
   * @param {any} [props.children]
   */
  const MarketStatCard = ({ title, children }) => {
    return (
      <div className="market-stats-card bg-white text-center border border-black h-full box-content flex flex-col justify-center p-4">
        <div>{children}</div>
        <div className="text-lg">{title}</div>
      </div>
    )
  }

  const StatCards = () => {
    const figureClass = `chicagoflf text-[clamp(22px,_4.2rem,_6vw)] my-5`
    const statImageClass = `w-full border-b border-black object-cover aspect-[5/2]`
    const statInnerClass = `bg-white border border-black w-full h-full flex flex-col justify-between`
    return (
      <div className="stat-cards-wrapper">
        <div className="max-w-7xl mx-auto py-4 px-6 sm:px-16">
          <div className="stat-cards -mt-24 mb-16 md:pl-8 grid gap-x-16 gap-y-[8vw] md:grid-cols-2">
            <StatCard>
              <div className={statInnerClass}>
                <Img
                  src={'/images/stats-upload-count.svg'}
                  alt="Upload Count"
                  width="500px"
                  height="200px"
                  layout="responsive"
                  className={statImageClass}
                />
                <div className="p-4">
                  <p className="chicagoflf">Total uploads to NFT.Storage</p>
                  <figure className={figureClass}>
                    {statsLoading && <Loading />}
                    {new Intl.NumberFormat('en-GB', {
                      notation: 'compact',
                      compactDisplay: 'short',
                      maximumFractionDigits: 1,
                    }).format(stats.totalUploads || 0)}
                  </figure>
                </div>
              </div>
            </StatCard>

            <StatCard title="Data Stored">
              <div className={statInnerClass}>
                <Img
                  src={'/images/stats-data-stored.svg'}
                  alt="Data Stored"
                  width="500px"
                  height="200px"
                  layout="responsive"
                  className={statImageClass}
                />
                <div className="p-4">
                  <p className="chicagoflf">
                    Total data stored on Filecoin from NFT.Storage
                  </p>
                  <figure className={figureClass}>
                    {statsLoading && <Loading />}
                    {bytes(stats.deals_size_total || 0, { decimalPlaces: 2 })}
                  </figure>
                </div>
              </div>
            </StatCard>
          </div>
        </div>
      </div>
    )
  }

  const MarketStatCards = () => {
    return (
      <div className="max-w-7xl mx-auto py-4 px-6 sm:px-16">
        <div className="mb-16 md:pl-8 grid gap-x-4 gap-y-[8vw] md:grid-cols-2 xl:grid-cols-4">
          <MarketStatCard title="Total Count of NFTS">
            <figure className="chicagoflf text-[clamp(2rem,2.6rem,3.3rem)] text-navy">
              {statsLoading && <Loading />}
              {new Intl.NumberFormat('en-GB', {
                notation: 'compact',
                compactDisplay: 'short',
                maximumFractionDigits: 1,
              }).format(marketStats.totalNfts || 0)}
            </figure>
          </MarketStatCard>
          <MarketStatCard title="Total market value of NFTs">
            <figure className="chicagoflf text-[clamp(2rem,2.6rem,3.3rem)] text-forest">
              {statsLoading && <Loading />}
              {marketStats.totalMarketValueUSD > 0 ? '$' : 'Ξ'}
              {new Intl.NumberFormat('en-GB', {
                notation: 'compact',
                compactDisplay: 'short',
                maximumFractionDigits: 1,
              }).format(
                marketStats.missingMarketValueUSD > 0
                  ? marketStats.totalMarketValueUSD
                  : marketStats.totalMarketValue || 0
              )}
            </figure>
          </MarketStatCard>
          <MarketStatCard title="Market value of missing NFTs">
            <figure className="chicagoflf text-[clamp(2rem,2.6rem,3.3rem)] text-red">
              {statsLoading && <Loading />}
              {marketStats.missingMarketValueUSD > 0 ? '$' : 'Ξ'}
              {new Intl.NumberFormat('en-GB', {
                notation: 'compact',
                compactDisplay: 'short',
                maximumFractionDigits: 1,
              }).format(
                marketStats.missingMarketValueUSD > 0
                  ? marketStats.missingMarketValueUSD
                  : marketStats.missingMarketValue || 0
              )}
            </figure>
          </MarketStatCard>
          <MarketStatCard title="Percentage of NFTs deemed missing">
            <figure className="chicagoflf text-[clamp(2rem,2.6rem,3.3rem)] text-yellow">
              {statsLoading && <Loading />}
              {marketStats.missingPercentage ?? 0}%
            </figure>
          </MarketStatCard>
        </div>
      </div>
    )
  }

  const NftUpSection = () => (
    <div className="bg-white py-16 relative">
      <div className="absolute left-0 h-[13px] right-0 top-0 bg-[url('/images/sawtooth-border.png')]" />
      <div className="absolute left-0 h-[13px] right-0 bottom-0 bg-[url('/images/sawtooth-border.png')]" />
      <div className="max-w-7xl mx-auto py-4 px-6 sm:px-16">
        <NftUpCta />
      </div>
    </div>
  )

  return (
    <main className="bg-peach">
      <DescriptionSection />
      {/* TODO: Uncomment this when we have copy, and probably move it to the CMS */}
      {/* <WhyItMattersSection /> */}
      <div className="bg-nspeach">
        <div className="relative w-screen flex items-center justify-center">
          <div className="text-center">
            <p className="chicagoflf p-4 m-0 mt-5 text-[2.375rem]">
              NFT Market By the Numbers
            </p>
            <p className="chicagoflf p-4 m-0 mt-5 text-[1.75rem]">
              The Price of Missing NFTS (
              <Link
                className="underline text-navy"
                href="https://blog.nft.storage/posts/2022-04-04-missing-nfts"
              >
                reference
              </Link>
              )
            </p>
          </div>
        </div>
        <MarketStatCards />
      </div>

      <div className="max-w-7xl mx-auto text-center mt-12">
        <h2 className="chicagoflf text-[2.375rem]">
          NFT.Storage by the numbers
        </h2>
        <StatCards />
      </div>
      <NftUpSection />

      <div>
        <div className="stats-trusted-wrapper max-w-7xl mx-auto py-20 px-6 sm:px-16">
          <div className="stats-card bg-white border-2 border-black">
            <NetlifyPartial
              route="trusted-by-stats-page"
              className="netlify-partial-trusted-by-stats-page max-w-4xl mx-auto py-8 px-6 sm:px-16 text-center chicagoflf"
              fallback={<TrustedBy logos={logos} />}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
