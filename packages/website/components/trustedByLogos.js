import Img from '../components/cloudflareImage'

/**
 * Logo Component
 * @param {Object} logo
 * @param {string} logo.src
 * @param {string} logo.alt
 */
const Logo = ({ src, alt }) => (
  <Img
    className="marketplace-logo"
    src={`/images/marketplace-logos/${src}`}
    alt={alt}
    width="100%"
    height={80}
  />
)
/**
 * Logos Component
 * @param {Object} props
 * @param {any[]} props.logos
 *
 */
export const TrustedBy = ({ logos }) => {
  return (
    <div className="marketplace-logos-container mx-auto py-8 px-6 sm:px-16">
      <h2 className="text-center mt-0 chicagoflf">Trusted by</h2>
      <div className="marketplace-logo-grid">
        {logos.map((logo) => (
          <Logo
            key={`marketplace-logo-${logo}`}
            src={logo.src}
            alt={logo.alt}
          />
        ))}
      </div>
      <p className="text-center chicagoflf">
        and 30,000+ other users!
        <br />
        Request{' '}
        <a
          href="https://github.com/nftstorage/nft.storage/discussions/1474"
          target="_blank"
        >
          here
        </a>{' '}
        to add your logo
      </p>
    </div>
  )
}
