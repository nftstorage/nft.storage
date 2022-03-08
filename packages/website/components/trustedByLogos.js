/**
 * Logo Component
 * @param {Object} props
 * @param {string} props.src
 */
const Logo = ({ src }) => (
  <img
    className="marketplace-logo"
    src={`/images/marketplace-logos/${src}`}
    alt="Nft.Storage Users"
  />
)
/**
 * Logos Component
 * @param {Object} props
 * @param {string[]} props.logos
 *
 */
export const TrustedBy = ({ logos }) => {
  return (
    <div className="marketplace-logos-container center pv4 ph3 ph5-ns">
      <h2 className="tc mt0 chicagoflf">Trusted by</h2>
      <div className="marketplace-logo-grid">
        {logos.map((logo, i) => (
          <Logo key={`marketplace-logo-${i}`} src={logo} />
        ))}
      </div>
      <p className="tc chicagoflf">and 20,000+ other users!</p>
    </div>
  )
}
