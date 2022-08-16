import { MDXRemote } from 'next-mdx-remote'
import { useState, useEffect } from 'react'
import Loading from './loading'

/**
 * @typedef {Object} NetlifyPartialProps
 * @prop {string} [route]
 * @prop {string} [className]
 * @prop {JSX.Element} [fallback]
 */

/**
 *
 * @param {NetlifyPartialProps} props
 * @returns {JSX.Element}
 */
export default function NetlifyPartial({ route, className, fallback }) {
  /** @type [any, null | any] */
  const [content, setContent] = useState()
  const [error, setError] = useState(false)
  useEffect(() => {
    // TODO: Update fallback when we have the blog in production.
    const host =
      process.env.NEXT_PUBLIC_NETLIFY_CMS_ENDPOINT ||
      'https://ubiquitous-frangipane-4e7c91.netlify.app'
    fetch(`${host}/api/partials/${route}`)
      .then(async (response) => {
        return await response.text()
      })
      .then((text) => {
        const obj = JSON.parse(text)
        setContent(obj.props.partial.content)
      })
      .catch((e) => {
        setError(e)
      })
  }, [route])

  if (error) {
    if (fallback) {
      return <div className={className}>{fallback}</div>
    }
    return (
      <div className={className}>
        <p>An unexpected error occured.</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className={className}>
        <Loading />
      </div>
    )
  }

  return (
    content && (
      <div className={className}>
        <MDXRemote {...content} />
      </div>
    )
  )
}
