import { useEffect, useState } from 'react'
import { TrustedBy } from '../components/trustedByLogos'
import fs from 'fs'

/**
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  const logos = fs.readdirSync('public/images/marketplace-logos')
  // make opensea be the first logo
  logos.sort((a, b) =>
    a.includes('opensea') ? -1 : b.includes('opensea') ? 1 : 0
  )
  return {
    props: {
      title: 'Stats - NFT Storage',
      description: 'NFT.Storage usage stats',
      navBgColor: 'bg-nsgreen',
      needsUser: false,
      logos,
    },
  }
}

const uploadKeysToSum = [
  'uploads_blob_total',
  'uploads_car_total',
  'uploads_nft_total',
  'uploads_remote_total',
  'uploads_multipart_total',
]

/**
 * Stats Page
 * @param {Object} props
 * @param {string[]} props.logos
 *
 */
export default function Stats({ logos }) {
  const [stats, setStats] = useState({})

  useEffect(() => {
    fetchStats()
  }, [])

  function fetchStats() {
    const fakeStats = {
      deals_total: Math.floor(Math.random() * 1000000 + 1),
      deals_size_total: Math.floor(Math.random() * 1000000000000000 + 1),
      uploads_past_7_total: 15000,
      uploads_blob_total: 10000,
      uploads_car_total: 10000,
      uploads_nft_total: 10000,
      uploads_remote_total: 10000,
      uploads_multipart_total: 10000,
    }
    setStats(decorateAdditionalCalculatedValues(fakeStats))
  }

  function decorateAdditionalCalculatedValues(obj) {
    const total = Object.keys(obj).reduce((acc, key) => {
      if (uploadKeysToSum.includes(key)) {
        return acc + obj[key]
      }
      return acc
    }, 0)

    let totalBefore = total - obj.uploads_past_7_total
    const uploadsGrowthRate = parseFloat(
      ((total - totalBefore) / totalBefore) * 100
    ).toFixed(2)

    return { ...obj, totalUploads: total, growthRate: uploadsGrowthRate }
  }

  console.log('stats', stats)

  const Marquee = () => {
    return (
      <div className="marquee">
        <div className="marquee-track">
          <p className="marquee-text chicagoflf">
            Nft.Storage is storing... Nft.Storage is storing... Nft.Storage is
            storing... Nft.Storage is storing... Nft.Storage is storing...
          </p>
        </div>
      </div>
    )
  }

  /**
   * @param {Object} props
   * @param {string} [props.title]
   * @param {string} [props.image]
   * @param {string} [props.desc]
   * @param {string} [props.statValue]
   * @param {number} [props.percChange]
   */
  const StatCard = ({ title, image, desc, statValue, percChange = 0 }) => {
    return (
      <div className="stat-card">
        <h2 className="stat-card-header chicagoflf">{title}</h2>
        <div className="stat-card-inner">
          <div>
            <img src={image} alt={title} />
            <div className="pv3 ph3">
              <p className="chicagoflf">{desc}</p>
              <figure className="chicagoflf">{statValue}</figure>
              <p
                className={`chicagoflf ${
                  percChange > 0 ? 'stat-green' : 'stat-red'
                }`}
              >
                {percChange}%
              </p>
              <p>[week over week change]</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const StatCards = () => {
    return (
      <div className="stat-cards-wrapper">
        <div className="mw9 center pv3 ph3 ph5-ns">
          <div className="stat-cards">
            <StatCard
              title="Upload Count"
              image="/images/stats-upload-count.svg"
              desc="Total uploads to NFT.Storage"
              statValue={stats.totalUploads}
              percChange={stats.growthRate}
            />
            <StatCard
              title="Data Stored"
              image="/images/stats-data-stored.svg"
              desc="Total data stored on Filecoin from NFT.Storage"
              statValue="134.2 TiB"
              percChange={-100}
            />
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
        <div className="stats-trusted-wrapper mw9 center pv3 ph3 ph5-ns">
          <div>
            <TrustedBy logos={logos} />
          </div>
        </div>
      </div>
    </main>
  )
}
