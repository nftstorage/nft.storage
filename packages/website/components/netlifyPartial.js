import { MDXRemote } from 'next-mdx-remote'
import React, { useState, useEffect } from 'react'
import Loading from './loading'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/*
 * There are two ways we can load content from the CMS as a partial
 *
 * Compiled Content
 * This takes compiled JSX from the CMS and plugs it into the <MDXRemote/> component as is.
 *
 * Templates with Metadata and Compiled Content
 * For more complex content that needs more control and styling, we can use a template while passing in
 * metadata from the frontmatter section of the CMS markdown into a custom React component.
 *
 * Template Naming Convention
 * The template name corresponds to the content type from the CMS. For the image-grids content
 * found at the api URI of https://blog.nft.storage/api/partials/image-grids/my-md-content,
 * the template name would be 'image-grids' and should be added to the templates object
 * as templates['image-grids']. Other content type examples could be
 * templates['faq'], templates['my-new-type']
 *
 * All data from the frontmatter can be found in the meta property as well as the
 * main body content that can be found in meta.body. The body content can be
 * rendered like <MDXRemote {...meta.body} />
 */

/**
 * Templates
 * @template {Object<string,any>} T
 * @param {T} obj
 */

/** @type {any} */
const templates = {}
/**
 * Image Grid Template
 * @param {Object} meta
 */
templates['image-grids'] = function (
  /** @type {{
  description: String | undefined;
  images: [];
  footer: String | undefined
}} */ meta
) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-16">
      {meta.description && (
        <ReactMarkdown
          children={meta.description}
          remarkPlugins={[remarkGfm]}
          className="text-center mt-0 chicagoflf"
        />
      )}
      <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 p-5 justify-center mx-auto">
        {meta.images.map(
          (/** @type {{ src: string; alt: string | undefined; }} */ image) => (
            <img
              className="w-full h-[80px] object-contain object-center !border !border-solid !border-gray-200 rounded !py-4 !px-6 select-none mx-auto"
              src={`${image.src}`}
              alt={image.alt}
              width="100%"
              height={80}
            />
          )
        )}
      </div>
      {meta.footer && (
        <ReactMarkdown
          children={meta.footer}
          remarkPlugins={[remarkGfm]}
          className="text-center chicagoflf"
        />
      )}
      {/* For future reference, you can render main body content like so */}
      {/*
      {meta.body &&
        <MDXRemote {...meta.body} />
      }
      */}
    </div>
  )
}

/**
 * @typedef {Object} NetlifyPartialProps
 * @prop {string} [route]
 * @prop {string} [template]
 * @prop {string} [className]
 * @prop {JSX.Element} [fallback]
 *
 * @param {NetlifyPartialProps} props
 * @returns {JSX.Element}
 */
export default function NetlifyPartial({
  route,
  template,
  className,
  fallback,
}) {
  /** @type [any, null | any] */
  const [content, setContent] = useState()
  /** @type [any, null | any] */
  const [meta, setMeta] = useState()
  const [error, setError] = useState(false)
  useEffect(() => {
    const host = process.env.NEXT_PUBLIC_NETLIFY_CMS_ENDPOINT
    fetch(`${host}/api/partials/${route}`)
      .then(async (response) => {
        return await response.text()
      })
      .then((text) => {
        const obj = JSON.parse(text)
        setMeta(obj.props.partial.meta)
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
        <p>An unexpected error occurred.</p>
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

  {
    if (meta && template && templates[template]) {
      let TemplateComponent = templates[template]
      return (
        <div className={className}>
          <TemplateComponent {...meta} body={content} />
        </div>
      )
    }
  }

  return (
    content && (
      <div className={className}>
        <MDXRemote {...content} />
      </div>
    )
  )
}
