import Image from 'next/image'

/**
 * Logo Component
 * @param  {Object} logo
 * @param  {string} logo.src
 * @param  {string} logo.alt
 * @param  {string} logo.width
 * @param  {string} logo.quality
 */
const cloudflareImageLoader = ({ src, width, quality = '75' }) =>
  `https://nft.storage/cdn-cgi/image/format=auto,width=${width},quality=${quality}${src}`

/**
 * @param {import('next/image').ImageProps} props
 */
export default function Img(props) {
  if (props.src.includes('.svg') || props.src.includes('https://')) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  }
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image unoptimized={true} {...props} />
  }
  // @ts-ignore
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} loader={cloudflareImageLoader} />
}
