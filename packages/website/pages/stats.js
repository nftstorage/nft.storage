import { useEffect, useState } from 'react'
import { TrustedBy } from '../components/trustedByLogos'
import { NftUpCta } from '../components/nftUpCta'
import fs from 'fs'
import { calculateStats } from '../lib/statsUtils'
import Img from '../components/cloudflareImage'
import { API } from '../lib/api'
import Loading from '../components/loading'
import bytes from 'bytes'

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
      navBgColor: 'bg-nsgreen',
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
  const [statsLoading, setStatsLoading] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    setStatsLoading(true)
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

  const Marquee = () => {
    return (
      <div className="relative w-screen max-w-100 h-[100px] border-y border-black flex items-center justify-center">
        <p className="chicagoflf p-4 m-0 text-[clamp(16px,_2.6rem,_6vw)]">
          NFT.Storage is storing...
        </p>
      </div>
    )
  }

  /**
   * @param {Object} props
   * @param {string} [props.title]
   * @param {any} [props.children]
   */
  const StatCard = ({ title, children }) => {
    return (
      <div className="bg-yellow text-center border border-black h-full box-content flex flex-col justify-between">
        <h2 className="text-2xl sm:text-4xl text-white mb-4 mt-8 flex-initial chicagoflf">
          {title}
        </h2>
        <div className="stat-card-inner relative flex flex-1 z-10 -translate-x-8 translate-y-8">
          {children}
        </div>
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
          <div className="stat-cards -mt-24 mb-16 pl-8 grid gap-x-16 gap-y-[8vw] md:grid-cols-2">
            <StatCard title="Upload Count">
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
                  <p
                    className={`chicagoflf ${
                      stats.growthRate > 0
                        ? `text-forest before:content-['+']`
                        : 'text-red'
                    }`}
                  >
                    {stats.growthRate || 0}%
                  </p>
                  <p>[Week over week change]</p>
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
                  <p
                    className={`chicagoflf ${
                      stats.deals_total > 0
                        ? `text-forest before:content-['+']`
                        : 'text-red'
                    }`}
                  >
                    {stats.dealsSizeGrowthRate || 0}%
                  </p>
                  <p>[Week over week change]</p>
                </div>
              </div>
            </StatCard>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-nsgreen">
      <Marquee />
      <StatCards />
      <div className="bg-nsblue">
        <div className="stats-trusted-wrapper max-w-7xl mx-auto py-4 px-6 sm:px-16">
          <div>
            <TrustedBy logos={logos} />
          </div>
        </div>
      </div>
      <div className="bg-nsyellow">
        <div className="stats-trusted-wrapper max-w-7xl mx-auto py-4 px-6 sm:px-16">
          <div>
            <NftUpCta />
          </div>
        </div>
      </div>
    </main>
  )
}
