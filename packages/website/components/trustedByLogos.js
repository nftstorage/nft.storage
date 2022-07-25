import Img from '../components/cloudflareImage'

/**
 * Logo Component
 * @param {Object} logo
 * @param {string} logo.src
 * @param {string} logo.alt
 */
const Logo = ({ src, alt }) => (
  <Img
    className="w-full h-[80px] object-contain object-center !border !border-solid !border-gray-200 rounded !py-4 !px-6 select-none mx-auto"
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
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-16">
      <h2 className="text-center mt-0 chicagoflf">Trusted by</h2>
      <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 p-5 justify-center mx-auto">
        {logos.map((logo) => (
          <Logo
            key={`marketplace-logo-${logo.src}`}
            src={logo.src}
            alt={logo.alt}
          />
        ))}
      </div>
      <p className="text-center chicagoflf">
        and 30,000+ other users!
        <br />
        Request to add your logo{' '}
        <a
          className="nsnavy"
          title="Request to add your logo!"
          href="https://github.com/nftstorage/nft.storage/discussions/1474"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
    </div>
  )
}
