/**
 * Social Link Component
 *
 * @param {Object} props
 * @param {URL} props.url
 * @param {any} [props.Icon]
 * @param {Record<string, any>} [props.params]
 * @returns {JSX.Element}
 */

const SocialLink = ({ url, Icon, params }) => {
  if (params) {
    Object.entries(params).map(([k, v]) => url.searchParams.append(k, v))
  }
  return (
    <a href={url.href} target="_blank" rel="noreferrer">
      <div className="social-link ba flex flex-column relative pointer bg-nsltblue mh2 h8 w8 grow">
        <div className="flex items-center justify-center ba absolute top-1 left-1 bg-white w-100 h-100">
          <Icon />
        </div>
      </div>
    </a>
  )
}

export default SocialLink
