/**
 * Social Link Component
 *
 * @param {Object} props
 * @param {string} props.href
 * @param {any} [props.Icon]
 * @returns {JSX.Element}
 */

const SocialLink = ({ href, Icon }) => (
  <a href={href}>
    <div className="social-link ba flex flex-column relative pointer bg-nsltblue mh2 h8 w8">
      <div className="flex items-center justify-center ba absolute top-1 left-1 bg-white w-100 h-100">
        <Icon />
      </div>
    </div>
  </a>
)

export default SocialLink
