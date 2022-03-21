import Image from 'next/image'

/**
 * Logo Component
 * @param {Object} logo
 * @param {string} logo.src
 * @param {string} logo.alt
 */
const Logo = ({ src, alt }) => (
  <Image
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
    <div className="marketplace-logos-container center pv4 ph3 ph5-ns">
      <h2 className="tc mt0 chicagoflf">Trusted by</h2>
      <div className="marketplace-logo-grid">
        {logos.map((logo) => (
          <Logo
            key={`marketplace-logo-${logo}`}
            src={logo.src}
            alt={logo.alt}
          />
        ))}
      </div>
      <p className="tc chicagoflf">and 20,000+ other users!</p>
    </div>
  )
}
