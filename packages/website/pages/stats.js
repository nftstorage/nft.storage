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

/**
 * Stats Page
 * @param {Object} props
 * @param {string[]} props.logos
 *
 */
export default function Stats({ logos }) {
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
              statValue="34.5 mil"
              percChange={100}
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
