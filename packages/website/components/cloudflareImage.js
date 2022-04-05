import Image from 'next/image'

/**
 * Logo Component
 * @param  {Object} logo
 * @param  {string} logo.src
 * @param  {number} logo.width
 * @param  {number} [logo.quality]
 */
const cloudflareImageLoader = ({ src, width, quality = 75 }) =>
  `https://nft.storage/cdn-cgi/image/format=auto,width=${width},quality=${quality}${src}`

/**
 * @param {{
 *  src: string
 *  width?: number | string
 *  height?: number | string
 *  alt?: string
 *  className?: string
 *  layout?: import('next/image').ImageProps['layout']
 * }} props
 * @returns
 */
export default function Img({ src, alt, width, height, className, layout }) {
  if (src.includes('.svg') || src.includes('https://')) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    )
  }
  if (process.env.NODE_ENV === 'development') {
    return (
      <Image
        unoptimized
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        layout={layout}
      />
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      layout={layout}
      loader={cloudflareImageLoader}
    />
  )
}
